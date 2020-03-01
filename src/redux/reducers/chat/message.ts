import {
	GET_CHAT_FAILURE,
	GET_CHAT_MESSAGES_FAILURE,
	GET_CHAT_MESSAGES_REQUEST,
	GET_CHAT_MESSAGES_SUCCESS,
	GET_CHAT_REQUEST,
	GET_CHAT_SUCCESS,
	NEW_CHAT_SUB_MESSAGES,
	SEND_MESSAGE_FAILURE,
	SEND_MESSAGE_REQUEST,
	SEND_MESSAGE_SUCCESS
} from '../../../constants/redux-actions';
import { ChatMessagesState } from '../../../types/redux-reducer-state-types';
import {
	MessageActionTypes,
	ChatSubscriptionMessagesReceived,
	GetChatMessagesSuccess,
	SendMessageRequest
} from '../../../types/redux-action-types';
import { Message, PublishType } from '@project-300/common-types';

const initialState: ChatMessagesState = {
	fetchingChat: false,
	chat: undefined,
	requestedChatId: '', // Used to check that batch of messages coming in belong to the same chat from previous batch
	messages: [],
	lastEvaluatedKey: undefined,
	requestingOldMessages: false,
	lastContentType: 'NONE',
	isLastMessageByOwnUser: false,
	sendingMessage: false,
	currentUserAvatar: undefined,
	localMessageCount: 0
};

const chatMessagesReducer = (state: ChatMessagesState = initialState, action: MessageActionTypes): ChatMessagesState => {
	let messages: Message[] = [];
	let newState: Partial<ChatMessagesState>;
	let localMessageCount: number = 0;

	switch (action.type) {
		case GET_CHAT_REQUEST:
			newState = {
				fetchingChat: true,
				requestedChatId: action.chatId
			};

			if (newState.requestedChatId !== state.requestedChatId) newState.messages = [];

			return { ...state, ...newState };
		case GET_CHAT_SUCCESS:
			return { ...state, fetchingChat: false, chat: action.chat };
		case GET_CHAT_FAILURE:
			return { ...state, fetchingChat: false };
		case SEND_MESSAGE_REQUEST:
			messages = [ ...state.messages ];

			const messageData: SendMessageRequest = action as SendMessageRequest;

			const localMessage: Message = { // This is very temporary - Will be replaced by full data message when received by websocket
				...messageData.localMessage,
				userOwnMessage: true,
				times: {
					createdAt: new Date().toISOString()
				},
				createdBy: {
					avatar: state.currentUserAvatar
				},
				localMessage: true
			} as Message;

			messages.push(localMessage);

			localMessageCount = state.localMessageCount + 1;

			return { ...state, sendingMessage: true, isLastMessageByOwnUser: true, lastContentType: 'NEW', localMessageCount, messages };
		case SEND_MESSAGE_SUCCESS:

			return { ...state, sendingMessage: false };
		case SEND_MESSAGE_FAILURE:
			return { ...state, sendingMessage: false };
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
			let isLastMessageByOwnUser: boolean = false;
			const subData: ChatSubscriptionMessagesReceived = action as ChatSubscriptionMessagesReceived;

			messages = [ ...state.messages ];

			// Messages do not belong to current chat
			// It's possible the user is subscribed to more than 1 chat - Reject messages and return previous state
			console.log(subData.payload.data.chatId, state.chat.chatId);
			if (subData.payload.data.chatId !== state.chat.chatId) return { ...state };
			console.log('ok');

			if (subData.payload.type === PublishType.QUERY) messages = subData.payload.data.messages.reverse();
			if (subData.payload.type === PublishType.INSERT) {
				const message: Message = subData.payload.data.message;
				messages.push(subData.payload.data.message);
				isLastMessageByOwnUser = message.createdBy.userId === subData.userId;

				messages = removeExistingLocalMessage(messages, message);
			}

			console.log('ok2');

			let currentUserAvatar: string | undefined;

			messages.map((m: Message) => {
				if (m.createdBy.userId === subData.userId) {
					m.userOwnMessage = true;
					currentUserAvatar = m.createdBy.avatar;
				}
				localMessageCount = m.localMessage ? localMessageCount + 1 : localMessageCount;
				return m;
			});

			newState = {
				lastContentType: subData.payload.type === PublishType.QUERY ? 'INITIAL' : 'NEW',
				messages,
				isLastMessageByOwnUser,
				currentUserAvatar,
				localMessageCount
			};

			console.log('ok3');

			if (subData.payload.type === PublishType.QUERY) newState.lastEvaluatedKey = subData.payload.data.lastEvaluatedKey;

			return { ...state, ...newState };
		default:
			return state;
	}
};

export default chatMessagesReducer;

const removeExistingLocalMessage = (messages: Message[], newMessage: Message): Message[] => {
	const index: number = messages.findIndex((m: Message) => m.localMessage && m.userOwnMessage && m.text === newMessage.text);
	if (index > -1) messages.splice(index, 1);
	return messages;
}
