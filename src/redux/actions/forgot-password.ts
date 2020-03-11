import {
	FORGOT_PASSWORD_REQUEST,
	FORGOT_PASSWORD_FAILURE,
	FORGOT_PASSWORD_SUCCESS,
	FORGOT_PASSWORD_SUBMIT_REQUEST,
	FORGOT_PASSWORD_SUBMIT_SUCCESS,
	FORGOT_PASSWORD_SUBMIT_FAILURE
} from '../../constants/redux-actions';
import { Dispatch } from 'redux';
import { Auth } from 'aws-amplify';
import toastr from '../../helpers/toastr';
import { ConfirmationResult } from '../../types/http-responses';
import { AppActions } from '../../types/redux-action-types';

const forgotPasswordRequest = (): AppActions => ({ type: FORGOT_PASSWORD_REQUEST });

const forgotPasswordSuccess = (): AppActions => ({ type: FORGOT_PASSWORD_SUCCESS });

const forgotPasswordFailure = (): AppActions => ({ type: FORGOT_PASSWORD_FAILURE });

const forgotPasswordSubmitRequest = (): AppActions => ({ type: FORGOT_PASSWORD_SUBMIT_REQUEST });

const forgotPasswordSubmitSuccess = (): AppActions => ({ type: FORGOT_PASSWORD_SUBMIT_SUCCESS });

const forgotPasswordSubmitFailure = (): AppActions => ({ type: FORGOT_PASSWORD_SUBMIT_FAILURE });

export const forgotPassword = (email: string): (dispatch: Dispatch) => Promise<boolean> => {
	return async (dispatch: Dispatch): Promise<boolean> => {
		dispatch(forgotPasswordRequest());

		try {
			if (email) {
				await Auth.forgotPassword(email);
				dispatch(forgotPasswordSuccess());
				return true;
			}

			dispatch(forgotPasswordFailure());
			return true;
		} catch (err) {
			dispatch(forgotPasswordFailure());
			toastr.error(err.message || err.description);
			return false;
		}
	};
};

export const forgotPasswordSubmit = (email: string, code: string, password: string): (dispatch: Dispatch) => Promise<boolean> => {
	return async (dispatch: Dispatch): Promise<boolean> => {
		dispatch(forgotPasswordSubmitRequest());

		try {
			if (email && code && password) {
				await Auth.forgotPasswordSubmit(email, code, password);
				dispatch(forgotPasswordSubmitSuccess());
				return true;
			}

			dispatch(forgotPasswordSubmitFailure());
			return false;
		} catch (err) {
			dispatch(forgotPasswordSubmitFailure());
			toastr.error(err.message || err.description);
			return false;
		}
	};
};
