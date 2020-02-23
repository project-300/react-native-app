import { ApiName } from '../../environment/env';
import { API } from 'aws-amplify';
import { Chat } from '@project-300/common-types';

export class ChatService {

	public static getChatWithUser = async (userId: string): Promise<{ success: boolean; chat: Chat}> => API.get(ApiName, `/chats/${userId}`, '').catch(ChatService.handleError);

	private static handleError = (error: any): void => {
		if (!error.response || !error.response.data || !error.response.data) throw { message: 'Unknown Error' };
		throw error.response.data.error;
	}

}
