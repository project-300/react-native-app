import {
	ACCOUNT_CONFIRM,
	LOGIN,
	SIGNUP,
	DRIVER_APPLICATION,
	UPDATE_USER_FIELD,
	UPDATE_AVATAR,
	S3_KEY_REQUEST,
	DRIVER_JOURNEYS,
	JOURNEY_DETAILS,
	START_JOURNEY,
	END_JOURNEY,
	JOURNEY_DRIVER_MOVEMENT,
	PASSENGER_JOURNEYS,
	CANCEL_PASSENGER_ACCEPTED_JOURNEY,
	CREATE_JOURNEY,
	GET_ALL_JOURNEYS,
	UPDATE_ADD_USER_JOURNEY,
	GET_INTERESTS_LIST,
	UPDATE_INTERESTS
} from '../constants/api-paths';
import { SERVER_HTTPS_URL } from '../../environment/env';
import { HttpResponse } from '../types/http-responses';

export default class HttpAPI {

	public static updateUserJoinsJourney = (data: object): Promise<HttpResponse> => HttpAPI.patch(data, UPDATE_ADD_USER_JOURNEY);

	public static getAllJourneys = (userId: string): Promise<HttpResponse> => HttpAPI.get(GET_ALL_JOURNEYS, userId);

	public static confirmAccount = (userId: object): Promise<HttpResponse> => HttpAPI.send(userId, ACCOUNT_CONFIRM);

	public static signUp = (data: object): Promise<HttpResponse> => HttpAPI.send(data, SIGNUP);

	public static login = (data: object): Promise<HttpResponse> => HttpAPI.send(data, LOGIN);

	public static driverApplication = (data: object): Promise<HttpResponse> => HttpAPI.send(data, DRIVER_APPLICATION);

	public static updateUserField = (data: object): Promise<HttpResponse> => HttpAPI.send(data, UPDATE_USER_FIELD);

	public static updateAvatar = (data: object): Promise<HttpResponse> => HttpAPI.send(data, UPDATE_AVATAR);

	public static updateInterests = (data: object): Promise<HttpResponse> => HttpAPI.send(data, UPDATE_INTERESTS);

	public static getS3SecretKey = (): Promise<HttpResponse> => HttpAPI.send({ }, S3_KEY_REQUEST);

	public static getDriverJourneys = (data: object): Promise<HttpResponse> => HttpAPI.send(data, DRIVER_JOURNEYS);

	public static getPassengerJourneys = (data: object): Promise<HttpResponse> => HttpAPI.send(data, PASSENGER_JOURNEYS);

	public static cancelPassengerAcceptedJourney = (data: object): Promise<HttpResponse> => HttpAPI.send(data, CANCEL_PASSENGER_ACCEPTED_JOURNEY);

	public static getJourneyDetails = (data: object): Promise<HttpResponse> => HttpAPI.send(data, JOURNEY_DETAILS);

	public static startJourney = (data: object): Promise<HttpResponse> => HttpAPI.send(data, START_JOURNEY);

	public static endJourney = (data: object): Promise<HttpResponse> => HttpAPI.send(data, END_JOURNEY);

	public static driverMovement = (data: object): Promise<HttpResponse> => HttpAPI.send(data, JOURNEY_DRIVER_MOVEMENT);

	public static createJourney = (data: object): Promise<HttpResponse> => HttpAPI.send(data, CREATE_JOURNEY);

	public static getInterestsList = (): Promise<HttpResponse> => HttpAPI.get(GET_INTERESTS_LIST);

	private static get = async (path: string, params?: string): Promise<HttpResponse> => {
		// change this later...
		let url = `${SERVER_HTTPS_URL}${path}`;
		url = params ? `${url}/${params}` : url;

		const res: Response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
			}
		});

		const ok: boolean = res.ok;
		const data: HttpResponse = await res.json();
		if (!ok) throw data.error || Error('Unknown Error');
		return data;
	}

	private static send = async (req: object, path: string): Promise<HttpResponse> => {
		const res: Response = await fetch(`${SERVER_HTTPS_URL}${path}`, {
			method: 'POST',
			body: JSON.stringify(req),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
			}
		});

		const ok: boolean = res.ok;
		const data: HttpResponse = await res.json();
		if (!ok) throw data.error || Error('Unknown Error');
		return data;
	}

	private static patch = async (req: object, path: string): Promise<HttpResponse> => {
		const res: Response = await fetch(`${SERVER_HTTPS_URL}${path}`, {
			method: 'PATCH',
			body: JSON.stringify(req),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
			}
		});

		const ok: boolean = res.ok;
		const data: HttpResponse = await res.json();
		if (!ok) throw data.error || Error('Unknown Error');
		return data;
	}

}
