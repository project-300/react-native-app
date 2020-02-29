import {
	GET_ALL_CHATS_REQUEST,
	GET_ALL_CHATS_SUCCESS,
	GET_ALL_CHATS_FAILURE
} from '../../../constants/redux-actions';
import { AllChatState } from '../../../types/redux-reducer-state-types';
import { ChatActionTypes } from '../../../types/redux-action-types';

const initialState: AllChatState = {
	fetchingChats: false,
	chats: []
};

const allChatsReducer = (state: AllChatState = initialState, action: ChatActionTypes): AllChatState => {
	switch (action.type) {
		case GET_ALL_CHATS_REQUEST:
			return { ...state, fetchingChats: true };
		case GET_ALL_CHATS_SUCCESS:
			return { ...state, fetchingChats: false, chats: action.chats };
		case GET_ALL_CHATS_FAILURE:
			return { ...state, fetchingChats: false };
		default:
			return state;
	}
};

export default allChatsReducer;
