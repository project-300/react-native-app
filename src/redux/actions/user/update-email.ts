import {
	UPDATE_EMAIL_REQUEST,
	UPDATE_EMAIL_SUCCESS,
	UPDATE_EMAIL_FAILURE
} from '../../../constants/redux-actions';
import { AppActions } from '../../../types/redux-action-types';
import { Dispatch } from 'redux';
import { LoginResult } from '../../../types/http-responses';
import HttpAPI from '../../../api/http';
import toastr from '../../../helpers/toastr';
import { userId } from '../../../auth';
import { Auth } from 'aws-amplify';

export const updateEmailRequest = (): AppActions => ({ type: UPDATE_EMAIL_REQUEST });

export const updateEmailSuccess = (): AppActions => ({ type: UPDATE_EMAIL_SUCCESS });

export const updateEmailFailure = (): AppActions => ({ type: UPDATE_EMAIL_FAILURE });

export const updateEmail = (email: string): (dispatch: Dispatch) => Promise<boolean> => {
	return async (dispatch: Dispatch): Promise<boolean > => {
		dispatch(updateEmailRequest());

		try {
			const user = await Auth.currentAuthenticatedUser();
			await Auth.updateUserAttributes(user, { email }); // This will throw an error if validation fails

			const apiRes: LoginResult = await HttpAPI.updateEmail({ email, userId: await userId() });

			if (apiRes.success) {
				dispatch(updateEmailSuccess());
				toastr.success('Your email has been updated');

				return true;
			}

			return false;
		} catch (err) {
			dispatch(updateEmailFailure());
			toastr.error(err.message);
			return false;
		}
	};
};
