import { AsyncStorage } from 'react-native';
import { AUTH_KEY, USER_TYPE, USERID_KEY } from './constants/storage-keys';

export const storeLogin = async (userId: string, userType: string): Promise<void> => {
	await AsyncStorage.setItem(AUTH_KEY, 'true');
	await AsyncStorage.setItem(USERID_KEY, userId);
	await AsyncStorage.setItem(USER_TYPE, userType);
};

export const userId = async (): Promise<string | null> => AsyncStorage.getItem(USERID_KEY);

export const userType = async (): Promise<string | null> => AsyncStorage.getItem(USER_TYPE);

export const storeLogout = async (): Promise<void> => {
	await AsyncStorage.removeItem(AUTH_KEY);
	await AsyncStorage.removeItem(USERID_KEY);
};

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
