import {
	GET_CHAT_SUCCESS,
	GET_CHAT_REQUEST,
	GET_CHAT_FAILURE
} from '../../../constants/redux-actions';
import { ChatState } from '../../../types/redux-reducer-state-types';
import { ChatActionTypes } from '../../../types/redux-action-types';

const initialState: ChatState = {
	fetchingChat: false,
	chat: undefined
};

const chatReducer = (state: ChatState = initialState, action: ChatActionTypes): ChatState => {
	switch (action.type) {
		case GET_CHAT_REQUEST:
			return { ...state, fetchingChat: true };
		case GET_CHAT_SUCCESS:
			return { ...state, fetchingChat: false, chat: action.chat };
		case GET_CHAT_FAILURE:
			return { ...state, fetchingChat: false };
		default:
			return state;
	}
};

export default chatReducer;
