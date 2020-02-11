import { API } from 'aws-amplify';
import { User } from '@project-300/common-types';
export class UserService {
	private static readonly apiName: string = 'dev-P300-ApiGatewayRestApi';

	public static async getUser(userId: string): Promise<User> {
		return API.get(UserService.apiName, `/users/${userId}`, '');
	}
}
