import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../constants/redux-actions';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { Auth } from 'aws-amplify';
import { storeLogin } from '../auth';
import { LoginResult } from '../screens/login/interfaces';
import HttpAPI from '../api/http';
import toastr from '../helpers/toastr';

const loginRequest = () => ({ type: LOGIN_REQUEST });

const loginSuccess = () => ({ type: LOGIN_SUCCESS });

const loginFailure = () => ({ type: LOGIN_FAILURE });

export const login = (username: string, password: string) => {
	return async (dispatch: ThunkDispatch<{ }, { }, AnyAction>) => {
		dispatch(loginRequest());

		try {
			const auth = await Auth.signIn(username, password);
			const apiRes: LoginResult = await HttpAPI.login(auth);

			if (apiRes.success) {
				await storeLogin();
				dispatch(loginSuccess());
				return true;
			}
		} catch (err) {
			dispatch(loginFailure());
			toastr.error(err.message);
			return false;
		}
	};
};
