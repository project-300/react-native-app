import { Dispatch } from 'redux';
import toastr from '../../../helpers/toastr';
import { AppActions } from '../../../types/redux-action-types';
import { GET_ALL_CHATS_REQUEST, GET_ALL_CHATS_SUCCESS, GET_ALL_CHATS_FAILURE } from '../../../constants/redux-actions';
import { Chat } from '@project-300/common-types';
import { ChatService } from '../../../services/chat';

const getAllChatRequest = (): AppActions => ({ type: GET_ALL_CHATS_REQUEST });

const getAllChatSuccess = (chats: Chat[]): AppActions => ({ type: GET_ALL_CHATS_SUCCESS, chats });

const getAllChatFailure = (): AppActions => ({ type: GET_ALL_CHATS_FAILURE });

export const getChats = (): (dispatch: Dispatch) => Promise<void> => {
	return async (dispatch: Dispatch): Promise<void > => {
		dispatch(getAllChatRequest());

		try {
			const result: { success: boolean; chats: Chat[] } = await ChatService.getAllChats();
			console.log(result);

			if (result.success) {
				dispatch(getAllChatSuccess(result.chats));
				return;
			}

			throw Error('Unable to retrieve chats');
		} catch (err) {
			console.log(err);
			dispatch(getAllChatFailure());
			toastr.error(err.message || err.description || `Unable to retrieve chats`);
		}
	};
};
