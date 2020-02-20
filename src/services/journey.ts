import { ApiName } from '../../environment/env';
import { API } from 'aws-amplify';
import { Journey, LastEvaluatedKey } from '@project-300/common-types';
import { GetAllJourneysResult } from '../types/http-responses';

export class JourneyService {

	public static getAllJourneys = async (lastEvaluatedKey?: LastEvaluatedKey): Promise<GetAllJourneysResult> => {
		let url: string = `/journeys`;
		if (lastEvaluatedKey) url = `${url}?pk=${lastEvaluatedKey.pk}&sk=${lastEvaluatedKey.sk}`;
		return API.get(ApiName, url, '').catch(JourneyService.handleError);
	}

	public static searchJourneys = async (query: string, lastEvaluatedKey?: { pk: string; sk: string }): Promise<GetAllJourneysResult> => {
		let url: string = `/journeys/search/${query}`;
		if (lastEvaluatedKey) url = `${url}?pk=${lastEvaluatedKey.pk}&sk=${lastEvaluatedKey.sk}`;
		return API.get(ApiName, url, '').catch(JourneyService.handleError);
	}

	public static getJourneyById = async (journeyId: string): Promise<Journey> => API.get(ApiName, `/journeys/${journeyId}`, '').catch(JourneyService.handleError);

	public static createJourney = async (journey: Partial<Journey>): Promise<void> => API.post(ApiName, '/journeys', { body: { journey } }).catch(JourneyService.handleError);

	public static updateJourney = async (journey: Partial<Journey>): Promise<void> => API.put(ApiName, '/journeys', { body: journey }).catch(JourneyService.handleError);

	public static deleteJourney = async (): Promise<void> => API.del(ApiName, '/journeys', '').catch(JourneyService.handleError);

	public static addUserToJourney = async (journeyId: string, createdAt: string): Promise<void> => API.put(ApiName, '/journeys/add-user', { body: { journeyId, createdAt } }).catch(JourneyService.handleError);

	public static getDriverJourneys = async (userId: string): Promise<Journey[]> => API.get(ApiName, `/journeys/driver/${userId}`, '').catch(JourneyService.handleError);

	public static getPassengerJourneys = async (userId: string): Promise<Journey[]> => API.get(ApiName, `/journeys/passenger/${userId}`, '').catch(JourneyService.handleError);

	public static startJourney = async (journeyId: string): Promise<void> => API.put(ApiName, `/journeys/start/${journeyId}`, '').catch(JourneyService.handleError);

	public static endJourney = async (journeyId: string): Promise<void> => API.put(ApiName, `/journeys/end/${journeyId}`, '').catch(JourneyService.handleError);

	public static cancelPassengerAcceptedJourney = async (journeyId: string, createdAt: string): Promise<void> =>
		API.put(ApiName, `/journeys/passenger-cancel`, { body: { journeyId, createdAt } }).catch(JourneyService.handleError);

	private static handleError = (error: any): void => {
		if (!error.response || !error.response.data || !error.response.data) throw { message: 'Unknown Error' };
		throw error.response.data.error;
	}
}
