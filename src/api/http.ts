import { ACCOUNT_CONFIRM, LOGIN, SIGNUP, DRIVER_APPLICATION, APPROVE_APPLICATION, DELETE_APPLICATION } from '../constants/api-paths';
import { SERVER_HTTPS_URL } from '../../environment/env';
import { HttpResponse } from '../types/http-responses';

export default class HttpAPI {

	public static confirmAccount = (userId: object): Promise<HttpResponse> => HttpAPI.send(userId, ACCOUNT_CONFIRM);

	public static signUp = (data: object): Promise<HttpResponse> => HttpAPI.send(data, SIGNUP);

	public static login = (data: object): Promise<HttpResponse> => HttpAPI.send(data, LOGIN);

	public static driverApplication = (data: object): Promise<HttpResponse> => HttpAPI.send(data, DRIVER_APPLICATION);

	public static approveApplication = (data: object): Promise<HttpResponse> => HttpAPI.send(data, APPROVE_APPLICATION);

	public static deleteApplication = (data: object): Promise<HttpResponse> => HttpAPI.send(data, DELETE_APPLICATION);

	private static send = async (req: object, path: string): Promise<HttpResponse> => {
		const res: Response = await fetch(`${SERVER_HTTPS_URL}${path}`, {
			method: 'POST',
			body: JSON.stringify(req),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
			}
		});

		const ok = res.ok;
		const data: HttpResponse = await res.json();

		if (!ok) throw data.error || Error('Unknown Error');
		return data;
	}

}
