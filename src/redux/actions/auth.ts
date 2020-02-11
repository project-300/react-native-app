import { UserService } from './../../services/user';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../../constants/redux-actions';
import { Dispatch } from 'redux';
import { Auth } from 'aws-amplify';
import { storeLogin } from '../../auth';
import { LoginResult } from '../../types/http-responses';
import HttpAPI from '../../api/http';
import toastr from '../../helpers/toastr';
import { AppActions } from '../../types/redux-action-types';

const loginRequest = (): AppActions => ({ type: LOGIN_REQUEST });

const loginSuccess = (): AppActions => ({ type: LOGIN_SUCCESS });

const loginFailure = (): AppActions => ({ type: LOGIN_FAILURE });

export const login = (username: string, password: string): (dispatch: Dispatch) => Promise<boolean> => {
	return async (dispatch: Dispatch): Promise<boolean > => {
		dispatch(loginRequest());

		try {
			const auth = await Auth.signIn(username, password);
			const { userId, userType } = await UserService.getUser(auth.username);
			await storeLogin(userId, userType);

			dispatch(loginSuccess());
			return true;
		} catch (err) {
			dispatch(loginFailure());
			toastr.error(err.message);
			return false;
		}
	};
};
