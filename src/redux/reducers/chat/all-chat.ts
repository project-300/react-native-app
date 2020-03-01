import {
	GET_ALL_CHATS_REQUEST,
	GET_ALL_CHATS_SUCCESS,
	GET_ALL_CHATS_FAILURE, UPDATED_CHAT_SUB
} from '../../../constants/redux-actions';
import { AllChatState } from '../../../types/redux-reducer-state-types';
import { ChatActionTypes, ChatListSubscriptionReceived, GetAllChatSuccess } from '../../../types/redux-action-types';
import { Chat, ChatUser } from '@project-300/common-types';
import _ from 'lodash';

const initialState: AllChatState = {
	fetchingChats: false,
	chats: []
};

const allChatsReducer = (state: AllChatState = initialState, action: ChatActionTypes): AllChatState => {
	let chats: Chat[];

	switch (action.type) {
		case GET_ALL_CHATS_REQUEST:
			return { ...state, fetchingChats: true };
		case GET_ALL_CHATS_SUCCESS:
			const reqData: GetAllChatSuccess = action as GetAllChatSuccess;
			chats = markOwnUserChats(reqData.userId, reqData.chats);
			chats = sortChats(chats);
			return { ...state, fetchingChats: false, chats };
		case GET_ALL_CHATS_FAILURE:
			return { ...state, fetchingChats: false };
		case UPDATED_CHAT_SUB:
			const subData: ChatListSubscriptionReceived = action as ChatListSubscriptionReceived;
			chats = replaceChat([ ...state.chats ], subData.payload.data.chat);
			chats = markOwnUserChats(subData.userId, chats);
			chats = sortChats(chats);
			return { ...state, chats };
		default:
			return state;
	}
};

export default allChatsReducer;

const replaceChat = (chats: Chat[], updatedChat: Chat): Chat[] =>
	chats.map((c: Chat) => c.chatId === updatedChat.chatId ? { ...c, ...updatedChat } : c);

const markOwnUserChats = (userId: string, chats: Chat[]): Chat[] =>
	chats.map(
		(c: Chat) => {
			const otherUser: ChatUser = c.users.find((u: ChatUser) => u.userId !== userId);
			const currentUser: ChatUser = c.users.find((u: ChatUser) => u.userId === userId);
			c.otherUser = otherUser;
			c.unreadCount = currentUser.unreadCount || 0;
			return c;
		}
	);

const sortChats = (chats: Chat[]): Chat[] => // Sort by most recently updated
	_.sortBy(chats, (c: Chat) => c.times.updatedAt).reverse();
