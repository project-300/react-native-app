import { Dispatch } from 'redux';
import toastr from '../../../helpers/toastr';
import { AppActions } from '../../../types/redux-action-types';
import {
	GET_ALL_CHATS_REQUEST,
	GET_ALL_CHATS_SUCCESS,
	GET_ALL_CHATS_FAILURE,
	UPDATED_CHAT_SUB
} from '../../../constants/redux-actions';
import { Chat, SubscriptionPayload } from '@project-300/common-types';
import { ChatService } from '../../../services/chat';
import { Auth } from 'aws-amplify';

const getAllChatRequest = (): AppActions => ({ type: GET_ALL_CHATS_REQUEST });

const getAllChatSuccess = (chats: Chat[], userId: string): AppActions => ({ type: GET_ALL_CHATS_SUCCESS, chats, userId });

const getAllChatFailure = (): AppActions => ({ type: GET_ALL_CHATS_FAILURE });

export const updatedChat = (payload: SubscriptionPayload, userId: string): AppActions => ({ type: UPDATED_CHAT_SUB, payload, userId });

export const getChats = (): (dispatch: Dispatch) => Promise<void> => {
	return async (dispatch: Dispatch): Promise<void > => {
		dispatch(getAllChatRequest());

		const userId: string = (await Auth.currentUserInfo()).attributes.sub;

		try {
			const result: { success: boolean; chats: Chat[] } = await ChatService.getAllChats();
			console.log(result);

			if (result.success) {
				dispatch(getAllChatSuccess(result.chats, userId));
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
