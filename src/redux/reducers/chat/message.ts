import {
	GET_CHAT_MESSAGES_FAILURE,
	GET_CHAT_MESSAGES_REQUEST,
	GET_CHAT_MESSAGES_SUCCESS,
	NEW_CHAT_SUB_MESSAGES,
	// CHAT_MESSAGES_CACHE
} from '../../../constants/redux-actions';
import { ChatMessagesState } from '../../../types/redux-reducer-state-types';
import { MessageActionTypes, ChatSubscriptionMessagesReceived, GetChatMessagesSuccess } from '../../../types/redux-action-types';
import { Message, PublishType } from '@project-300/common-types';
// import { MessageCache } from '../../../cache/messages';

const initialState: ChatMessagesState = {
	messages: [],
	lastEvaluatedKey: undefined,
	requestingOldMessages: false,
	lastContentType: 'NONE',
	isLastMessageByOwnUser: false
};

const chatMessagesReducer = (state: ChatMessagesState = initialState, action: MessageActionTypes): ChatMessagesState => {
	let messages: Message[] = [];
	let newState: Partial<ChatMessagesState>;

	switch (action.type) {
		case GET_CHAT_MESSAGES_REQUEST:
			return { ...state, requestingOldMessages: true };
		case GET_CHAT_MESSAGES_SUCCESS:
			const oldMessagesData: GetChatMessagesSuccess = action as GetChatMessagesSuccess;

			messages = [ ...oldMessagesData.messages, ...state.messages ];

			messages.map((m: Message) => {
				if (m.createdBy.userId ===
					oldMessagesData.userId) m.userOwnMessage = true;
				return m;
			});

			newState = {
				requestingOldMessages: false,
				lastContentType: 'OLD',
				messages
			};

			newState.lastEvaluatedKey = oldMessagesData.lastEvaluatedKey;

			return { ...state, ...newState };
		case GET_CHAT_MESSAGES_FAILURE:
			return { ...state, requestingOldMessages: false };
		case NEW_CHAT_SUB_MESSAGES:
			messages = [ ...state.messages ];

			let isLastMessageByOwnUser: boolean = false;
			const subData: ChatSubscriptionMessagesReceived = action as ChatSubscriptionMessagesReceived;

			if (subData.payload.type === PublishType.QUERY) messages = subData.payload.data.messages.reverse();
			if (subData.payload.type === PublishType.INSERT) {
				const message: Message = subData.payload.data.message;
				messages.push(subData.payload.data.message);
				isLastMessageByOwnUser = message.createdBy.userId === subData.userId;
			}

			messages.map((m: Message) => {
				if (m.createdBy.userId === subData.userId) m.userOwnMessage = true;
				return m;
			});

			newState = {
				lastContentType: subData.payload.type === PublishType.QUERY ? 'INITIAL' : 'NEW',
				messages,
				isLastMessageByOwnUser
			};

			newState.lastEvaluatedKey = subData.payload.data.lastEvaluatedKey;

			return { ...state, ...newState };
		default:
			return state;
	}
};

export default chatMessagesReducer;
