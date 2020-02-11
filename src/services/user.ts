import { ApiName } from './../../environment/env';
import { API } from 'aws-amplify';
import { User } from '@project-300/common-types';

export class UserService {

	public static getUser = async (userId: string): Promise<User> => API.get(ApiName, `/users/${userId}`, '');

	public static updateUser = async (user: Partial<User>): Promise<void> => API.put(ApiName, '/users/', { body: user });

}
