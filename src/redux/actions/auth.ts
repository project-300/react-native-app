import { UserService } from './../../services/user';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../../constants/redux-actions';
import { Dispatch } from 'redux';
import { Auth } from 'aws-amplify';
import { storeLogin } from '../../auth';
import toastr from '../../helpers/toastr';
import { AppActions } from '../../types/redux-action-types';

const loginRequest = (): AppActions => ({ type: LOGIN_REQUEST });

const loginSuccess = (): AppActions => ({ type: LOGIN_SUCCESS });

const loginFailure = (): AppActions => ({ type: LOGIN_FAILURE });

export const login = (email: string, password: string): (dispatch: Dispatch) => Promise<boolean> => {
	return async (dispatch: Dispatch): Promise<boolean > => {
		dispatch(loginRequest());

		try {
			const auth = await Auth.signIn(email, password);
			// const { success, user } = await UserService.getUser(auth.attributes.sub);
			const user = await UserService.getUser(auth.attributes.sub);
			console.log(user);

			if (user) {
				await storeLogin(user.userId, user.userType);

				dispatch(loginSuccess());
				return true;
			}
			console.log('here');

			dispatch(loginFailure());
			return false;
		} catch (err) {
			console.log(err);
			dispatch(loginFailure());
			toastr.error(err.message);
			return false;
		}
	};
};
