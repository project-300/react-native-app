import { ApiName } from './../../environment/env';
import { API } from 'aws-amplify';
import { User } from '@project-300/common-types';

export class UserService {

	public static getUser = async (userId: string): Promise<{ success: true; user: User }> => API.get(ApiName, `/users/${userId}`, '');

	public static updateUser = async (user: Partial<User>): Promise<{ success: boolean; user: User }> => API.put(ApiName, '/users/', { body: user });
	//
	// public static updateInterests = async (interests: string[]): Promise<{ success: boolean }> =>
	// 	API.put(ApiName, '/users/interests', { body: interests });
	//
	// public static updateAvatar = async (avatar: string): Promise<{ success: boolean }> =>
	// 	API.put(ApiName, '/users/avatar', { body: { avatar } });

}
