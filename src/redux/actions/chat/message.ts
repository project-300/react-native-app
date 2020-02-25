import { Dispatch } from 'redux';
import toastr from '../../../helpers/toastr';
import { AppActions } from '../../../types/redux-action-types';
import {
	GET_CHAT_MESSAGES_REQUEST,
	GET_CHAT_MESSAGES_SUCCESS,
	GET_CHAT_MESSAGES_FAILURE,
	NEW_CHAT_SUB_MESSAGES
} from '../../../constants/redux-actions';
import { LastEvaluatedKey, Message, SubscriptionPayload } from '@project-300/common-types';
import { MessageService } from '../../../services/message';
import { GetChatMessagesResult } from '../../../types/http-responses';

const getChatMessagesRequest = (): AppActions => ({ type: GET_CHAT_MESSAGES_REQUEST });

const getChatMessagesSuccess = (messages: Message[], lastEvaluatedKey?: LastEvaluatedKey): AppActions =>
	({ type: GET_CHAT_MESSAGES_SUCCESS, messages, lastEvaluatedKey });

const getChatMessagesFailure = (): AppActions => ({ type: GET_CHAT_MESSAGES_FAILURE });

export const getChatMessages = (chatId: string): (dispatch: Dispatch) => Promise<boolean> => {
	return async (dispatch: Dispatch): Promise<boolean > => {
		dispatch(getChatMessagesRequest());

		try {
			const result: GetChatMessagesResult = await MessageService.getChatMessages(chatId);

			if (result.success) {
				dispatch(getChatMessagesSuccess(result.messages, result.lastEvaluatedKey));
				return true;
			}

			throw Error('Unable to retrieve chat messages');
		} catch (err) {
			dispatch(getChatMessagesFailure());
			toastr.error(`Unable to retrieve chat messages`);
			return false;
		}
	};
};

export const newChatMessages = (payload: SubscriptionPayload, userId: string): AppActions =>
	({ type: NEW_CHAT_SUB_MESSAGES, payload, userId });
