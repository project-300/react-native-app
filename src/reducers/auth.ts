import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../constants/redux-actions';

const initialState = {
	isLoggingIn: false,
	isLoggedIn: false
};

const loginReducer = (state = initialState, action: { type: string }) => {
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
