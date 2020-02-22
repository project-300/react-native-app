import {
	CONTENT_RELOAD_ON,
	CONTENT_RELOAD_OFF
} from '../../constants/redux-actions';
import { ContentReloadingState } from '../../types/redux-reducer-state-types';
import { ContentReloadActionTypes } from '../../types/redux-action-types';

const initialState: ContentReloadingState = {
	contentReloading: false
};

const contentReloadReducer = (state: ContentReloadingState = initialState, action: ContentReloadActionTypes): ContentReloadingState => {
	switch (action.type) {
		case CONTENT_RELOAD_ON:
			return { ...state, contentReloading: true };
		case CONTENT_RELOAD_OFF:
			return { ...state, contentReloading: false };
		default:
			return state;
	}
};

export default contentReloadReducer;
