import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../constants/redux-actions';
import { LoginState } from '../types/redux-reducer-state-types';
import { LoginActionTypes } from '../types/redux-action-types';

const initialState: LoginState = {
	isLoggingIn: false,
	isLoggedIn: false
};

const loginReducer = (state: LoginState = initialState, action: LoginActionTypes): LoginState => {
	switch (action.type) {
		case LOGIN_REQUEST:
			return { ...state, isLoggingIn: true };
		case LOGIN_FAILURE:
			return { ...state, isLoggingIn: false };
		case LOGIN_SUCCESS:
			return { ...state, isLoggingIn: false, isLoggedIn: true };
		default:
			return state;
	}
};

export default loginReducer;
