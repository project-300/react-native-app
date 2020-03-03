import { ApiName } from '../../environment/env';
import { API } from 'aws-amplify';
import { Coords, Journey, LastEvaluatedKey } from '@project-300/common-types';
import { GetAllJourneysResult } from '../types/http-responses';
import { deviceId } from '../app';

export class JourneyService {

	public static getAllJourneys = async (lastEvaluatedKey?: LastEvaluatedKey): Promise<GetAllJourneysResult> => {
		let url: string = `/journeys`;
		if (lastEvaluatedKey) url = `${url}?pk=${lastEvaluatedKey.pk}&sk=${lastEvaluatedKey.sk}`;
		return API.get(ApiName, url, '').catch(JourneyService.handleError);
	}

	public static searchJourneys = async (query: string, lastEvaluatedKey?: LastEvaluatedKey): Promise<GetAllJourneysResult> => {
		let url: string = `/journeys/search/${query}`;
		if (lastEvaluatedKey) url = `${url}?pk=${lastEvaluatedKey.pk}&sk=${lastEvaluatedKey.sk}`;
		return API.get(ApiName, url, '').catch(JourneyService.handleError);
	}

	public static getJourneyById = async (journeyId: string, createdAt: string): Promise<{ success: boolean; journey: Journey }> => API.get(ApiName, `/journeys/${journeyId}/${createdAt}`, '').catch(JourneyService.handleError);

	public static createJourney = async (journey: Partial<Journey>): Promise<void> => API.post(ApiName, '/journeys', { body: { journey } }).catch(JourneyService.handleError);

	public static addUserToJourney = async (journeyId: string, createdAt: string): Promise<void> => API.put(ApiName, '/journeys/add-user', { body: { journeyId, createdAt } }).catch(JourneyService.handleError);

	public static getDriverJourneys = async (): Promise<{ success: boolean; journeys: Journey[] }> => API.get(ApiName, `/journeys/driver`, '').catch(JourneyService.handleError);

	public static getPassengerJourneys = async (): Promise<{ success: boolean; journeys: Journey[] }> => API.get(ApiName, `/journeys/passenger`, '').catch(JourneyService.handleError);

	public static startJourney = async (journeyId: string): Promise<void> => API.put(ApiName, `/journeys/start/${journeyId}`, '').catch(JourneyService.handleError);

	public static endJourney = async (journeyId: string): Promise<void> => API.put(ApiName, `/journeys/end/${journeyId}`, '').catch(JourneyService.handleError);

	public static cancelPassengerAcceptedJourney = async (journeyId: string, createdAt: string): Promise<void> =>
		API.put(ApiName, `/journeys/passenger-cancel`, { body: { journeyId, createdAt } }).catch(JourneyService.handleError);

	public static driverMovement = async (journeyId: string, createdAt: string, coords: Coords): Promise<void> =>
		API.put(ApiName, `/journeys/driver-movement`, { body: { journeyId, createdAt, coords } }).catch(JourneyService.handleError);

	public static subscribeDriverLocation = async (journeyId: string, createdAt: string): Promise<{ success: boolean }> =>
		API.put(ApiName, `/journeys/subscribe/driver-location`, { body: { journeyId, createdAt, deviceId: await deviceId() } }).catch(JourneyService.handleError);

	public static unsubscribeDriverLocation = async (journeyId: string): Promise<{ success: boolean }> =>
		API.put(ApiName, `/journeys/unsubscribe/driver-location`, { body: { journeyId, deviceId: await deviceId() } }).catch(JourneyService.handleError);

	private static handleError = (error: any): void => {
		if (!error.response || !error.response.data || !error.response.data) throw { message: 'Unknown Error' };
		throw error.response.data.error;
	}
}
