import {
	SIGNUP_REQUEST,
	SIGNUP_SUCCESS,
	SIGNUP_FAILURE,
	SIGNUP_CONFIRMATION_REQUIRED,
	SIGNUP_CONFIRMATION_REQUEST,
	SIGNUP_CONFIRMATION_SUCCESS,
	SIGNUP_CONFIRMATION_FAILURE
} from '../constants/redux-actions';
import { Dispatch } from 'redux';
import { Auth } from 'aws-amplify';
import HttpAPI from '../api/http';
import toastr from '../helpers/toastr';
import { SignupResult, ConfirmationResult } from '../types/http-responses';
import { AppActions } from '../types/redux-action-types';

const signUpRequest = (): AppActions => ({ type: SIGNUP_REQUEST });

const signUpSuccess = (): AppActions => ({ type: SIGNUP_SUCCESS });

const signUpFailure = (): AppActions => ({ type: SIGNUP_FAILURE });

const signUpRequireConfirmation = (payload: object): AppActions => ({ type: SIGNUP_CONFIRMATION_REQUIRED, payload });

const signUpConfirmationRequest = (): AppActions => ({ type: SIGNUP_CONFIRMATION_REQUEST });

const signUpConfirmationSuccess = (): AppActions => ({ type: SIGNUP_CONFIRMATION_SUCCESS });

const signUpConfirmationFailure = (): AppActions => ({ type: SIGNUP_CONFIRMATION_FAILURE });

interface SignUpResponse {
	ok: boolean;
	confirmationRequired?: boolean;
}

export const signUp = (email: string, username: string, password: string): (dispatch: Dispatch<AppActions>) => Promise<SignUpResponse> => {
	return async (dispatch: Dispatch<AppActions>): Promise<SignUpResponse> => {
		dispatch(signUpRequest());

		try {
			const authRes = await Auth.signUp({
				username,
				password,
				attributes: {
					email
				}
			});

			const apiRes: SignupResult = await HttpAPI.signUp(authRes);

			dispatch(signUpSuccess());

			if (authRes.userConfirmed && apiRes.success) return { ok: true, confirmationRequired: false };

			dispatch(signUpRequireConfirmation({
				username,
				email,
				codeDeliveryDetails: authRes.codeDeliveryDetails,
				userId: authRes.userSub
			}));

			return { ok: true, confirmationRequired: true };
		} catch (err) {
			dispatch(signUpFailure());
			toastr.error(err.message);
			return { ok: false };
		}
	};
};

export const confirmAccount = (userId: string, username: string, code: string): (dispatch: Dispatch) => Promise<boolean> => {
	return async (dispatch: Dispatch): Promise<boolean> => {
		dispatch(signUpConfirmationRequest());

		try {
			await Auth.confirmSignUp(
				username,
				code
			);

			const apiRes: ConfirmationResult = await HttpAPI.confirmAccount({ userId });

			if (apiRes.success) {
				dispatch(signUpConfirmationSuccess());
				return true;
			}

			return false;
		} catch (err) {
			dispatch(signUpConfirmationFailure());
			toastr.error(err.message);
			return false;
		}
	};
};
