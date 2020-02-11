import {
	SIGNUP_CONFIRMATION_REQUEST,
	SIGNUP_CONFIRMATION_SUCCESS,
	SIGNUP_CONFIRMATION_FAILURE
} from '../../constants/redux-actions';
import { Dispatch } from 'redux';
import { Auth } from 'aws-amplify';
import HttpAPI from '../../api/http';
import toastr from '../../helpers/toastr';
import { ConfirmationResult } from '../../types/http-responses';
import { AppActions } from '../../types/redux-action-types';

const signUpConfirmationRequest = (): AppActions => ({ type: SIGNUP_CONFIRMATION_REQUEST });

const signUpConfirmationSuccess = (): AppActions => ({ type: SIGNUP_CONFIRMATION_SUCCESS });

const signUpConfirmationFailure = (): AppActions => ({ type: SIGNUP_CONFIRMATION_FAILURE });

export const confirmAccount = (userId: string, code: string, isSignUp: boolean, username?: string): (dispatch: Dispatch) => Promise<boolean> => {
	return async (dispatch: Dispatch): Promise<boolean> => {
		dispatch(signUpConfirmationRequest());

		try {
			if (isSignUp && username) await Auth.confirmSignUp(username, code);
			else await Auth.verifyCurrentUserAttributeSubmit('email', code);

			// const apiRes: ConfirmationResult = await HttpAPI.confirmAccount({ userId });

			// if (apiRes.success) {
			// 	dispatch(signUpConfirmationSuccess());
			// 	return true;
			// }

			// if (apiRes.error) throw Error(apiRes.error.description);

			return true;
		} catch (err) {
			dispatch(signUpConfirmationFailure());
			toastr.error(err.message || err.description);
			return false;
		}
	};
};
