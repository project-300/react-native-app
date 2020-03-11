import {
	FORGOT_PASSWORD_REQUEST,
	FORGOT_PASSWORD_SUCCESS,
	FORGOT_PASSWORD_FAILURE,
	FORGOT_PASSWORD_SUBMIT_REQUEST,
	FORGOT_PASSWORD_SUBMIT_SUCCESS,
	FORGOT_PASSWORD_SUBMIT_FAILURE
} from '../../constants/redux-actions';
import { ForgotPasswordState } from '../../types/redux-reducer-state-types';
import { ForgotPasswordActionTypes } from '../../types/redux-action-types';

const initialState: ForgotPasswordState = {
	isConfirming: false,
	isSendingCode: false,
	confirmed: false,
	codeSent: false
};

const forgotPasswordReducer = (state: ForgotPasswordState = initialState, action: ForgotPasswordActionTypes): ForgotPasswordState => {
	switch (action.type) {
		case FORGOT_PASSWORD_REQUEST:
			return { ...state, isSendingCode: true };
		case FORGOT_PASSWORD_SUCCESS:
			return { ...state, codeSent: true, isSendingCode: false };
		case FORGOT_PASSWORD_FAILURE:
			return { ...state, isSendingCode: false };
		case FORGOT_PASSWORD_SUBMIT_REQUEST:
			return { ...state, isConfirming: true };
		case FORGOT_PASSWORD_SUBMIT_SUCCESS:
			return { ...state, confirmed: true, isConfirming: false };
		case FORGOT_PASSWORD_SUBMIT_FAILURE:
			return { ...state, isConfirming: false };
		default:
			return state;
	}
};

export default forgotPasswordReducer;
