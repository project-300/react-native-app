import {
	UPDATE_USER_REQUEST,
	UPDATE_USER_SUCCESS,
	UPDATE_USER_FAILURE
} from '../../../constants/redux-actions';
import { UpdateUserFieldState } from '../../../types/redux-reducer-state-types';
import { UserProfileActionTypes } from '../../../types/redux-action-types';

const initialState: UpdateUserFieldState = {
	isUpdating: false
};

const updateUserFieldReducer = (state: UpdateUserFieldState = initialState, action: UserProfileActionTypes): UpdateUserFieldState => {
	switch (action.type) {
		case UPDATE_USER_REQUEST:
			return { ...state, isUpdating: true };
		case UPDATE_USER_SUCCESS:
			return { ...state, isUpdating: false };
		case UPDATE_USER_FAILURE:
			return { ...state, isUpdating: false };
		default:
			return state;
	}
};

export default updateUserFieldReducer;
