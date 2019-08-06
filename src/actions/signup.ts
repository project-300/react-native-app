import {
	SIGNUP_REQUEST,
	SIGNUP_SUCCESS,
	SIGNUP_FAILURE,
	SIGNUP_CONFIRMATION_REQUIRED,
	SIGNUP_CONFIRMATION_REQUEST,
	SIGNUP_CONFIRMATION_SUCCESS,
	SIGNUP_CONFIRMATION_FAILURE
} from '../constants/redux-actions';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { Auth } from 'aws-amplify';
import HttpAPI from '../api/http';
import toastr from '../helpers/toastr';
import { SignupResult } from '../screens/signup/interfaces';
import { ConfirmationResult } from '../screens/signup/confirmation/interfaces';

const signUpRequest = () => ({ type: SIGNUP_REQUEST });

const signUpSuccess = () => ({ type: SIGNUP_SUCCESS });

const signUpFailure = () => ({ type: SIGNUP_FAILURE });

const signUpRequireConfirmation = (payload: object) => ({ type: SIGNUP_CONFIRMATION_REQUIRED, payload });

const signUpConfirmationRequest = () => ({ type: SIGNUP_CONFIRMATION_REQUEST });

const signUpConfirmationSuccess = () => ({ type: SIGNUP_CONFIRMATION_SUCCESS });

const signUpConfirmationFailure = () => ({ type: SIGNUP_CONFIRMATION_FAILURE });

export const signUp = (email: string, username: string, password: string) => {
	return async (dispatch: ThunkDispatch<{ }, { }, AnyAction>) => {
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

			if (authRes.userConfirmed && apiRes.success) return { confirmationRequired: false };
			else {
				dispatch(signUpRequireConfirmation({
					username,
					email,
					codeDeliveryDetails: authRes.codeDeliveryDetails,
					userId: authRes.userSub
				}));

				return { confirmationRequired: true };
			}
		} catch (err) {
			dispatch(signUpFailure());
			toastr.error(err.message);
			return false;
		}
	};
};

export const confirmAccount = (userId: string, username: string, code: string) => {
	return async (dispatch: ThunkDispatch<{ }, { }, AnyAction>) => {
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
		} catch (err) {
			dispatch(signUpConfirmationFailure());
			toastr.error(err.message);
			return false;
		}
	};
};
