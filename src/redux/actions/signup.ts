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

export const signUp = (email: string, firstname: string, surname: string, phoneNumber: string, password: string):
	(dispatch: Dispatch<AppActions>) => Promise<SignUpActionResponse | { ok: boolean }> => {
	return async (dispatch: Dispatch<AppActions>): Promise<SignUpActionResponse | { ok: boolean }> => {
		dispatch(signUpRequest());

		try {
			const authRes = await Auth.signUp({
				username: email,
				password,
				attributes: {
					email,
					phone_number: MobileNumberWithExtension(phoneNumber),
					given_name: firstname,
					family_name: surname
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
			dispatch(signUpFailure());
			console.log(err);
			if (err.code === 'InvalidLambdaResponseException') toastr.error('Email does not match one of the listed email domains');
			if (err.code === 'UsernameExistsException') toastr.error('An account with the given email already exists');

			return { ok: false };
		}
	};
};
