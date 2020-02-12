import { UPDATE_USER_FAILURE, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS } from '../../../constants/redux-actions';
import { AppActions } from '../../../types/redux-action-types';
import { Dispatch } from 'redux';
import { LoginResult } from '../../../types/http-responses';
import toastr from '../../../helpers/toastr';
import { EditTypes } from '../../../types/common';
import { UserService } from '../../../services/user';

export const updateRequest = (): AppActions => ({ type: UPDATE_USER_REQUEST });

export const updateSuccess = (field: EditTypes, value: string): AppActions => ({ type: UPDATE_USER_SUCCESS, field, value });

export const updateFailure = (): AppActions => ({ type: UPDATE_USER_FAILURE });

export const updateUserField = (field: EditTypes, type: string, value: string): (dispatch: Dispatch) => Promise<boolean> => {
	return async (dispatch: Dispatch): Promise<boolean > => {
		dispatch(updateRequest());

		try {
			const apiRes: LoginResult = await UserService.updateUser({ [field]: value });

			if (apiRes.success) {
				dispatch(updateSuccess(field, value));
				toastr.success(`Your ${type} has been updated`);

				return true;
			}

			return false;
		} catch (err) {
			dispatch(updateFailure());
			toastr.error(err.message);
			return false;
		}
	};
};
