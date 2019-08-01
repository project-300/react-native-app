import { AsyncStorage } from 'react-native';
import { AUTH_KEY } from './constants/storage-keys';

export const signIn = (): Promise<void> => AsyncStorage.setItem(AUTH_KEY, 'true');

export const signOut = (): Promise<void> => AsyncStorage.removeItem(AUTH_KEY);

export const isSignedIn = (): Promise<boolean> => {
	return new Promise((resolve, reject) => {
		AsyncStorage.getItem(AUTH_KEY)
			.then((res: string | null) => {
				if (res !== null) resolve(true);
				else resolve(false);
			})
			.catch((err: object) => reject(err));
	});
};
