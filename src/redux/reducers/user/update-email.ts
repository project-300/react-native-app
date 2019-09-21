import {
	UPDATE_EMAIL_REQUEST,
	UPDATE_EMAIL_SUCCESS,
	UPDATE_EMAIL_FAILURE
} from '../../../constants/redux-actions';
import { UpdateEmailState } from '../../../types/redux-reducer-state-types';
import { UserProfileActionTypes } from '../../../types/redux-action-types';

const initialState: UpdateEmailState = {
	isUpdating: false
};

const updateEmailReducer = (state: UpdateEmailState = initialState, action: UserProfileActionTypes): UpdateEmailState => {
	switch (action.type) {
		case UPDATE_EMAIL_REQUEST:
			return { ...state, isUpdating: true };
		case UPDATE_EMAIL_SUCCESS:
			return { ...state, isUpdating: false };
		case UPDATE_EMAIL_FAILURE:
			return { ...state, isUpdating: false };
		default:
			return state;
	}
};

export default updateEmailReducer;
