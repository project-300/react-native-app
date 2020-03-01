import { Dispatch } from 'redux';
import toastr from '../../../helpers/toastr';
import { AppActions } from '../../../types/redux-action-types';
import {
	GET_CHAT_MESSAGES_REQUEST,
	GET_CHAT_MESSAGES_SUCCESS,
	GET_CHAT_MESSAGES_FAILURE,
	NEW_CHAT_SUB_MESSAGES,
	SEND_MESSAGE_REQUEST,
	SEND_MESSAGE_SUCCESS,
	SEND_MESSAGE_FAILURE,
} from '../../../constants/redux-actions';
import { LastEvaluatedKey, Message, SubscriptionPayload } from '@project-300/common-types';
import { MessageService } from '../../../services/message';
import { GetChatMessagesResult } from '../../../types/http-responses';
import { Auth } from 'aws-amplify';

const getChatMessagesRequest = (): AppActions => ({ type: GET_CHAT_MESSAGES_REQUEST });

const getChatMessagesSuccess = (messages: Message[], userId: string, lastEvaluatedKey?: LastEvaluatedKey): AppActions =>
	({ type: GET_CHAT_MESSAGES_SUCCESS, messages, userId, lastEvaluatedKey });

const getChatMessagesFailure = (): AppActions => ({ type: GET_CHAT_MESSAGES_FAILURE });

const sendMessageRequest = (localMessage: Partial<Message>): AppActions => ({ type: SEND_MESSAGE_REQUEST, localMessage });

const sendMessageSuccess = (): AppActions => ({ type: SEND_MESSAGE_SUCCESS });

const sendMessageFailure = (): AppActions => ({ type: SEND_MESSAGE_FAILURE });

export const newChatMessages = (payload: SubscriptionPayload, userId: string): AppActions =>
	({ type: NEW_CHAT_SUB_MESSAGES, payload, userId });

export const getChatMessages = (chatId: string, createdAt?: string): (dispatch: Dispatch) => Promise<boolean> => {
	return async (dispatch: Dispatch): Promise<boolean> => {
		dispatch(getChatMessagesRequest());

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

export const sendMessage = (chatId: string, text: string, otherUserId: string): (dispatch: Dispatch) => Promise<void> => {
	return async (dispatch: Dispatch): Promise<void> => {
		dispatch(sendMessageRequest({ text, chatId }));

		try {
			const result = await MessageService.sendMessage({ text, chatId }, otherUserId);
			console.log(result);

			if (result.success) {
				dispatch(sendMessageSuccess());
				return;
			}

			throw Error('Unable to send message');
		} catch (err) {
			console.log(err);
			dispatch(sendMessageFailure());
			toastr.error(`Unable to send message`);
		}
	};
};
