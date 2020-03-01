import { Message } from '@project-300/common-types';
import { AsyncStorage } from 'react-native';

export class MessageCache {

	public static StoreMessages = async (messages: Message[]): Promise<void> => {
		console.log('storing messages: ', JSON.stringify(messages));
		await AsyncStorage.setItem('Chat-Messages', JSON.stringify(messages));
	}

	public static RetrieveMessages = async (): Promise<Message[] | null> => {
		const messages: string | null = await AsyncStorage.getItem('Chat-Messages');
		return messages ? JSON.parse(messages) : null;
	}

}
