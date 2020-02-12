import {
	SIGNUP_REQUEST,
	SIGNUP_SUCCESS,
	SIGNUP_FAILURE,
} from '../../constants/redux-actions';
import { Dispatch } from 'redux';
import { Auth } from 'aws-amplify';
import toastr from '../../helpers/toastr';
import { AppActions } from '../../types/redux-action-types';
import { SignUpActionResponse } from '../../screens/signup/interfaces';
import { MobileNumberWithExtension } from '@project-300/common-types';

const signUpRequest = (): AppActions => ({ type: SIGNUP_REQUEST });

const signUpSuccess = (): AppActions => ({ type: SIGNUP_SUCCESS });

const signUpFailure = (): AppActions => ({ type: SIGNUP_FAILURE });

export const signUp = (email: string, phoneNumber: string, password: string):
	(dispatch: Dispatch<AppActions>) => Promise<SignUpActionResponse | { ok: boolean }> => {
	return async (dispatch: Dispatch<AppActions>): Promise<SignUpActionResponse | { ok: boolean }> => {
		dispatch(signUpRequest());

		try {
			const authRes = await Auth.signUp({
				username: email,
				password,
				attributes: {
					email,
					phone_number: MobileNumberWithExtension(phoneNumber)
				}
			});

			dispatch(signUpSuccess());

			return {
				ok: true,
				confirmationRequired: true,
				email,
				codeDeliveryDetails: authRes.codeDeliveryDetails,
				userId: authRes.userSub,
				isSignUp: true
			};
		} catch (err) {
			console.log(err);
			dispatch(signUpFailure());
			toastr.error(err.message);
			return { ok: false };
		}
	};
};
