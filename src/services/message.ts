import { ApiName } from '../../environment/env';
import { API } from 'aws-amplify';
import { Message } from '@project-300/common-types';
import { GetChatMessagesResult } from '../types/http-responses';

export class MessageService {

	public static getChatMessages = async (chatId: string): Promise<GetChatMessagesResult> =>
		API.post(ApiName, `/messages/chat/${chatId}`, '').catch(MessageService.handleError);

	public static sendMessage = async (message: Partial<Message>, otherUserId: string): Promise<{ success: boolean; message: Message}> =>
		API.post(ApiName, `/messages`, { body: { message, otherUserId } }).catch(MessageService.handleError);

	private static handleError = (error: any): void => {
		if (!error.response || !error.response.data || !error.response.data) throw { message: 'Unknown Error' };
		throw error.response.data.error;
	}

}
