import { AsyncStorage } from 'react-native';
import { AUTH_KEY } from './constants/storage-keys';

export const storeLogin = (): Promise<void> => AsyncStorage.setItem(AUTH_KEY, 'true');

export const storeLogout = (): Promise<void> => AsyncStorage.removeItem(AUTH_KEY);

export const isStoreLoggedIn = (): Promise<boolean> => {
	return new Promise((resolve, reject) => {
		AsyncStorage.getItem(AUTH_KEY)
			.then((res: string | null) => {
				if (res !== null) resolve(true);
				else resolve(false);
			})
			.catch(reject);
	});
};
