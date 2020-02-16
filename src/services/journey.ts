import { ApiName } from './../../environment/env';
import { API } from 'aws-amplify';
import { Journey } from '@project-300/common-types';

export class JourneyService {

	public static getAllJourneys = async (): Promise<Journey[]> => API.get(ApiName, '/journeys', '').catch(JourneyService.handleError);

	public static searchJourneys = async (query: string): Promise<Journey[]> => API.get(ApiName, `/journeys/search/${query}`, '').catch(JourneyService.handleError);

	public static getJourneyById = async (journeyId: string): Promise<Journey> => API.get(ApiName, `/journeys/${journeyId}`, '').catch(JourneyService.handleError);

	public static createJourney = async (journey: Partial<Journey>): Promise<void> => API.post(ApiName, '/journeys', { body: { journey } }).catch(JourneyService.handleError);

	public static updateJourney = async (journey: Partial<Journey>): Promise<void> => API.put(ApiName, '/journeys', { body: journey }).catch(JourneyService.handleError);

	public static deleteJourney = async (): Promise<void> => API.del(ApiName, '/journeys', '').catch(JourneyService.handleError);

	public static addUserToJourney = async (journeyId: string): Promise<void> => API.put(ApiName, '/journeys/add-user', { body: { journeyId }}).catch(JourneyService.handleError);

	public static getDriverJourneys = async (userId: string): Promise<Journey[]> => API.get(ApiName, `/journeys/driver/${userId}`, '').catch(JourneyService.handleError);

	public static getPassengerJourneys = async (userId: string): Promise<Journey[]> => API.get(ApiName, `/journeys/passenger/${userId}`, '').catch(JourneyService.handleError);

	public static startJourney = async (journeyId: string): Promise<void> => API.put(ApiName, `/journeys/start/${journeyId}`, '').catch(JourneyService.handleError);

	public static endJourney = async (journeyId: string): Promise<void> => API.put(ApiName, `/journeys/end/${journeyId}`, '').catch(JourneyService.handleError);

	public static cancelPassengerAcceptedJourney = async (journeyId: string): Promise<void> =>
		API.put(ApiName, `/journeys/passenger-cancel/${journeyId}`, '').catch(JourneyService.handleError);

	private static handleError = (error: any): void => {
		if (!error.response || !error.response.data || !error.response.data) throw { message: 'Unknown Error' };
		throw error.response.data.error;
	}
}
