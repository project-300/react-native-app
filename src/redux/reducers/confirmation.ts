import {
	SIGNUP_CONFIRMATION_REQUEST,
	SIGNUP_CONFIRMATION_SUCCESS,
	SIGNUP_CONFIRMATION_FAILURE
} from '../../constants/redux-actions';
import { ConfirmState } from '../../types/redux-reducer-state-types';
import { SignUpActionTypes } from '../../types/redux-action-types';

const initialState: ConfirmState = {
	isConfirmingAccount: false
};

const confirmReducer = (state: ConfirmState = initialState, action: SignUpActionTypes): ConfirmState => {
	switch (action.type) {
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

export default confirmReducer;
