import { Dispatch } from 'redux';
import toastr from '../../../helpers/toastr';
import { AppActions } from '../../../types/redux-action-types';
import { GET_CHAT_REQUEST, GET_CHAT_SUCCESS, GET_CHAT_FAILURE } from '../../../constants/redux-actions';
import { Chat } from '@project-300/common-types';
import { ChatService } from '../../../services/chat';

const getChatRequest = (chatId?: string): AppActions => ({ type: GET_CHAT_REQUEST, chatId });

const getChatSuccess = (chat: Chat): AppActions => ({ type: GET_CHAT_SUCCESS, chat });

const getChatFailure = (): AppActions => ({ type: GET_CHAT_FAILURE });

export const chatSubscribe = (userId: string, chatId?: string): (dispatch: Dispatch) => Promise<boolean> => {
	return async (dispatch: Dispatch): Promise<boolean > => {
		dispatch(getChatRequest(chatId));

		try {
			const result: { success: boolean; chat: Chat } = await ChatService.chatSubscribe(userId, chatId);
			console.log(result);

			if (result.success) {
				dispatch(getChatSuccess(result.chat));
				return true;
			}

			throw Error('Unable to retrieve chat');
		} catch (err) {
			console.log(err);
			dispatch(getChatFailure());
			toastr.error(err.message || err.description || `Unable to retrieve chat`);
			return false;
		}
	};
};

export const chatUnsubscribe = (userId: string): (dispatch: Dispatch) => Promise<boolean> => {
	return async (dispatch: Dispatch): Promise<boolean > => {
		// dispatch(getChatRequest());

		try {
			const result: { success: boolean } = await ChatService.chatUnsubscribe(userId);
			console.log(result);

			if (result.success) {
				// dispatch(getChatSuccess(result.chat));
				return true;
			}

			throw Error('Unable to unsubscribe from Chat');
		} catch (err) {
			console.log(err);
			// dispatch(getChatFailure());
			return false;
		}
	};
};

export const markMessagesRead = (chatId: string, otherUserId: string): (dispatch: Dispatch) => Promise<void> => {
	return async (dispatch: Dispatch): Promise<void> => {
		try {
			const result = await ChatService.markMessagesRead(chatId, otherUserId);
			console.log(result);

			if (result.success) return;

			throw Error('Unable to read messages');
		} catch (err) {
			console.log(err);
		}
	};
};