import {
	SIGNUP_REQUEST,
	SIGNUP_SUCCESS,
	SIGNUP_FAILURE,
	SIGNUP_CONFIRMATION_REQUIRED
} from '../../constants/redux-actions';
import { SignUpState } from '../../types/redux-reducer-state-types';
import { SignUpActionTypes } from '../../types/redux-action-types';

const initialState: SignUpState = {
	isCreatingAccount: false,
	passwordError: false
};

const signUpReducer = (state: SignUpState = initialState, action: SignUpActionTypes): SignUpState => {
	switch (action.type) {
		case SIGNUP_REQUEST:
			return { ...state, isCreatingAccount: true };
		case SIGNUP_FAILURE:
			return { ...state, isCreatingAccount: false, passwordError: !!action.code };
		case SIGNUP_SUCCESS:
			return { ...state, isCreatingAccount: false };
		case SIGNUP_CONFIRMATION_REQUIRED:
			return { ...state, isCreatingAccount: false, isConfirmingAccount: false, ...action.payload };
		default:
			return state;
	}
};

export default signUpReducer;
