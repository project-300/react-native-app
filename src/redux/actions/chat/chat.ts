import { Dispatch } from 'redux';
import toastr from '../../../helpers/toastr';
import { AppActions } from '../../../types/redux-action-types';
import { GET_CHAT_REQUEST, GET_CHAT_SUCCESS, GET_CHAT_FAILURE } from '../../../constants/redux-actions';
import { Chat } from '@project-300/common-types';
import { ChatService } from '../../../services/chat';

const getChatRequest = (): AppActions => ({ type: GET_CHAT_REQUEST });

const getChatSuccess = (chat: Chat): AppActions => ({ type: GET_CHAT_SUCCESS, chat });

const getChatFailure = (): AppActions => ({ type: GET_CHAT_FAILURE });

export const getChat = (userId: string): (dispatch: Dispatch) => Promise<boolean> => {
	return async (dispatch: Dispatch): Promise<boolean > => {
		dispatch(getChatRequest());

		try {
			const result: { success: boolean; chat: Chat } = await ChatService.getChatWithUser(userId);
			console.log(result);

			if (result.success) {
				dispatch(getChatSuccess(result.chat));
				return true;
			}

			throw Error('Unable to retrieve chat');
		} catch (err) {
			dispatch(getChatFailure());
			toastr.error(`Unable to retrieve chat`);
			return false;
		}
	};
};
