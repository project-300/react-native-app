import { ApiName } from '../../environment/env';
import { API } from 'aws-amplify';
import { Chat } from '@project-300/common-types';
import { deviceId } from '../app';

export class ChatService {

	public static chatSubscribe = async (userId: string): Promise<{ success: boolean; chat: Chat }> =>
		API.get(ApiName, `/chats/subscribe/${userId}/${await deviceId()}`, '').catch(ChatService.handleError);

	public static chatUnsubscribe = async (userId: string): Promise<{ success: boolean; chat: Chat }> =>
		API.put(ApiName, `/chats/unsubscribe/${userId}/${await deviceId()}`, '').catch(ChatService.handleError);

	private static handleError = (error: any): void => {
		console.log(error.response);
		if (!error.response || !error.response.data || !error.response.data) throw { message: 'Unknown Error' };
		throw error.response.data.error || error.response.data.message;
	}

}
