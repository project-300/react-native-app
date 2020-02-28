import { Dispatch } from 'redux';
import toastr from '../../../helpers/toastr';
import { AppActions } from '../../../types/redux-action-types';
import {
	GET_CHAT_MESSAGES_REQUEST,
	GET_CHAT_MESSAGES_SUCCESS,
	GET_CHAT_MESSAGES_FAILURE,
	NEW_CHAT_SUB_MESSAGES,
	// CHAT_MESSAGES_CACHE
} from '../../../constants/redux-actions';
import { LastEvaluatedKey, Message, SubscriptionPayload } from '@project-300/common-types';
import { MessageService } from '../../../services/message';
import { GetChatMessagesResult } from '../../../types/http-responses';
import { MessageCache } from '../../../cache/messages';
import { Auth } from 'aws-amplify';

const getChatMessagesRequest = (): AppActions => ({ type: GET_CHAT_MESSAGES_REQUEST });

const getChatMessagesSuccess = (messages: Message[], userId: string, lastEvaluatedKey?: LastEvaluatedKey): AppActions =>
	({ type: GET_CHAT_MESSAGES_SUCCESS, messages, userId, lastEvaluatedKey });

const getChatMessagesFailure = (): AppActions => ({ type: GET_CHAT_MESSAGES_FAILURE });

export const newChatMessages = (payload: SubscriptionPayload, userId: string): AppActions =>
	({ type: NEW_CHAT_SUB_MESSAGES, payload, userId });

// export const newChatMessages = (messages: Message[], userId: string): AppActions =>
// 	({ type: CHAT_MESSAGES_CACHE, messages });

export const getChatMessages = (chatId: string, createdAt?: string): (dispatch: Dispatch) => Promise<boolean> => {
	return async (dispatch: Dispatch): Promise<boolean > => {
		dispatch(getChatMessagesRequest());

		console.log('Getting more messages');

		try {
			const userId: string = (await Auth.currentUserInfo()).attributes.sub;
			const result: GetChatMessagesResult = await MessageService.getChatMessages(chatId, createdAt);

			console.log(result);

			if (result.success) {
				dispatch(getChatMessagesSuccess(result.messages, userId, result.lastEvaluatedKey));
				return true;
			}

			throw Error('Unable to retrieve chat messages');
		} catch (err) {
			console.log(err);
			dispatch(getChatMessagesFailure());
			toastr.error(`Unable to retrieve chat messages`);
			return false;
		}
	};
};

export const getMessageCache = (): (dispatch: Dispatch) => Promise<void> => {
	return async (dispatch: Dispatch): Promise<void > => {
		try {
			const messages: Message[] | null = await MessageCache.RetrieveMessages();
			console.log(messages);

			if (messages && messages.length) dispatch(getChatMessagesSuccess(messages));
		} catch (err) {
			console.log(err);
		}
	};
};
