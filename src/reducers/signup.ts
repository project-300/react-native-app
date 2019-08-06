import {
	SIGNUP_REQUEST,
	SIGNUP_SUCCESS,
	SIGNUP_FAILURE,
	SIGNUP_CONFIRMATION_REQUIRED,
	SIGNUP_CONFIRMATION_REQUEST,
	SIGNUP_CONFIRMATION_SUCCESS,
	SIGNUP_CONFIRMATION_FAILURE
} from '../constants/redux-actions';

const initialState = {
	isCreatingAccount: false,
	isConfirmingAccount: false
};

const signUpReducer = (state = initialState, action: { type: string, payload: object }) => {
	switch (action.type) {
		case SIGNUP_REQUEST:
			return { ...state, isCreatingAccount: true };
		case SIGNUP_FAILURE:
			return { ...state, isCreatingAccount: false };
		case SIGNUP_SUCCESS:
			return { ...state, isCreatingAccount: false };
		case SIGNUP_CONFIRMATION_REQUIRED:
			return { ...state, isCreatingAccount: false, isConfirmingAccount: false, ...action.payload };
		case SIGNUP_CONFIRMATION_REQUEST:
			return { ...state, isConfirmingAccount: true };
		case SIGNUP_CONFIRMATION_FAILURE:
			return { ...state, isConfirmingAccount: false };
		case SIGNUP_CONFIRMATION_SUCCESS:
			return { ...state, isConfirmingAccount: false };
		default:
			return state;
	}
};

export default signUpReducer;
