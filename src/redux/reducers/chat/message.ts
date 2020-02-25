import {
	GET_CHAT_MESSAGES_FAILURE,
	GET_CHAT_MESSAGES_REQUEST,
	GET_CHAT_MESSAGES_SUCCESS,
	NEW_CHAT_SUB_MESSAGES
} from '../../../constants/redux-actions';
import { ChatMessagesState } from '../../../types/redux-reducer-state-types';
import { MessageActionTypes, ChatSubscriptionMessagesReceived } from '../../../types/redux-action-types';
import { Message, PublishType } from '@project-300/common-types';

const initialState: ChatMessagesState = {
	isGatheringMessages: false,
	messages: []
};

const chatMessagesReducer = (state: ChatMessagesState = initialState, action: MessageActionTypes): ChatMessagesState => {
	switch (action.type) {
		case GET_CHAT_MESSAGES_REQUEST:
			return { ...state, isGatheringMessages: true };
		case GET_CHAT_MESSAGES_SUCCESS:
			return { ...state, isGatheringMessages: false };
		case GET_CHAT_MESSAGES_FAILURE:
			return { ...state, isGatheringMessages: false };
		case NEW_CHAT_SUB_MESSAGES:
			let messages: Message[] = [ ...state.messages ];
			const subData: ChatSubscriptionMessagesReceived = action as ChatSubscriptionMessagesReceived;
			if (subData.payload.type === PublishType.QUERY) messages = subData.payload.data.messages.reverse();
			if (subData.payload.type === PublishType.INSERT) messages.push(subData.payload.data.message);

			messages.map((m: Message) => {
				if (m.createdBy.userId === subData.userId) m.userOwnMessage = true;
				return m;
			});

			return { ...state, isGatheringMessages: false, messages };
		default:
			return state;
	}
};

export default chatMessagesReducer;
