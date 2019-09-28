import { UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAILURE } from '../../../constants/redux-actions';
import { AppActions } from '../../../types/redux-action-types';
import { Dispatch } from 'redux';
import toastr from '../../../helpers/toastr';
import { Auth } from 'aws-amplify';

export const updatePasswordRequest = (): AppActions => ({ type: UPDATE_PASSWORD_REQUEST });

export const updatePasswordSuccess = (): AppActions => ({ type: UPDATE_PASSWORD_SUCCESS });

export const updatePasswordFailure = (): AppActions => ({ type: UPDATE_PASSWORD_FAILURE });

export const updatePassword = (currentPassword: string, newPassword: string): (dispatch: Dispatch) => Promise<boolean> => {
	return async (dispatch: Dispatch): Promise<boolean > => {
		dispatch(updatePasswordRequest());

		try {
			const user = await Auth.currentAuthenticatedUser();
			const res = await Auth.changePassword(user, currentPassword, newPassword);

			if (res) {
				dispatch(updatePasswordSuccess());
				toastr.success(`Your password has been updated`);
				return true;
			}

			return false;
		} catch (err) {
			dispatch(updatePasswordFailure());
			toastr.error(err.message);
			return false;
		}
	};
};
