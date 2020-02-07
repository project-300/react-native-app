import {
	SIGNUP_REQUEST,
	SIGNUP_SUCCESS,
	SIGNUP_FAILURE, SIGNUP_CONFIRMATION_REQUIRED,
} from '../../constants/redux-actions';
import { Dispatch } from 'redux';
import { Auth } from 'aws-amplify';
import HttpAPI from '../../api/http';
import toastr from '../../helpers/toastr';
import { SignupResult } from '../../types/http-responses';
import { AppActions } from '../../types/redux-action-types';
import { SignUpActionResponse } from '../../screens/signup/interfaces';

const signUpRequest = (): AppActions => ({ type: SIGNUP_REQUEST });

const signUpSuccess = (): AppActions => ({ type: SIGNUP_SUCCESS });

const signUpFailure = (): AppActions => ({ type: SIGNUP_FAILURE });

export const signUp = (email: string, username: string, password: string):
	(dispatch: Dispatch<AppActions>) => Promise<SignUpActionResponse | { ok: boolean }> => {
	return async (dispatch: Dispatch<AppActions>): Promise<SignUpActionResponse | { ok: boolean }> => {
		dispatch(signUpRequest());

		try {
			const authRes = await Auth.signUp({
				username,
				password,
				attributes: {
					email
				}
			});

			const apiRes: SignupResult = await HttpAPI.signUp({ auth: authRes, email, username });

			dispatch(signUpSuccess());

			if (authRes.userConfirmed && apiRes.success) return {
				ok: true,
				confirmationRequired: false
			};

			return {
				ok: true,
				confirmationRequired: true,
				username,
				email,
				codeDeliveryDetails: authRes.codeDeliveryDetails,
				userId: authRes.userSub,
				isSignUp: true
			};
		} catch (err) {
			dispatch(signUpFailure());
			toastr.error(err.message);
			return { ok: false };
		}
	};
};
