import { ConfirmationResult } from '../screens/signup/verification/interfaces';
import { SignupResult } from '../screens/signup/interfaces';
import { LoginResult } from '../screens/login/interfaces';
import { ACCOUNT_CONFIRM, LOGIN, SIGNUP } from '../constants/api-paths';

const API_URL = 'https://h4q090fyzg.execute-api.eu-west-1.amazonaws.com/dev'

export default class HttpAPI {

	public static confirmAccount = (userId: object): Promise<ConfirmationResult> => HttpAPI.send(userId, ACCOUNT_CONFIRM);

	public static signUp = (data: object): Promise<SignupResult> => HttpAPI.send(data, SIGNUP);

	public static login = (data: object): Promise<LoginResult> => HttpAPI.send(data, LOGIN);

	private static send = async (req: object, path: string) => {
		const res: Response = await fetch(`${API_URL}${path}`, {
			method: 'POST',
			body: JSON.stringify(req),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
			}
		});

		const ok = res.ok;
		const data: ConfirmationResult = await res.json();

		if (!ok) throw data.error || Error('Unknown Error');
		return data;
	}

}
