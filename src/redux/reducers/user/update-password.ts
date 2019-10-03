import {
	UPDATE_PASSWORD_REQUEST,
	UPDATE_PASSWORD_SUCCESS,
	UPDATE_PASSWORD_FAILURE
} from '../../../constants/redux-actions';
import { UpdatePasswordState } from '../../../types/redux-reducer-state-types';
import { UserProfileActionTypes } from '../../../types/redux-action-types';

const initialState: UpdatePasswordState = {
	isUpdating: false
};

const updatePasswordReducer = (state: UpdatePasswordState = initialState, action: UserProfileActionTypes): UpdatePasswordState => {
	switch (action.type) {
		case UPDATE_PASSWORD_REQUEST:
			return { ...state, isUpdating: true };
		case UPDATE_PASSWORD_SUCCESS:
			return { ...state, isUpdating: false };
		case UPDATE_PASSWORD_FAILURE:
			return { ...state, isUpdating: false };
		default:
			return state;
	}
};

export default updatePasswordReducer;
