import { ApiName } from './../../environment/env';
import { API } from 'aws-amplify';
import { Journey } from '@project-300/common-types';

export class JourneyService {

	public static getAllJourneys = async (): Promise<Journey[]> => API.get(ApiName, '/journeys', '');

	public static getJourneyById = async (journeyId: string): Promise<Journey> => API.get(ApiName, `/journeys/${journeyId}`, '');

	public static createJourney = async (journey: Partial<Journey>): Promise<void> => API.post(ApiName, '/journeys', { body: journey });

	public static updateJourney = async (journey: Partial<Journey>): Promise<void> => API.put(ApiName, '/journeys', { body: journey });

	public static deleteJourney = async (): Promise<void> => API.del(ApiName, '/journeys', '');

	public static addUserToJourney = async (journeyId: string, userId: string): Promise<void> =>
		API.put(ApiName, '/journeys/add-user', { body: {
			userId,
			journeyId
		}})

	public static getDriverJourneys = async (userId: string): Promise<Journey[]> => API.get(ApiName, `/journeys/driver/${userId}`, '');

	public static getPassengerJourneys = async (userId: string): Promise<Journey[]> => API.get(ApiName, `/journeys/passenger/${userId}`, '');

	public static startJourney = async (journeyId: string): Promise<void> => API.put(ApiName, `/journeys/start/${journeyId}`, '');

	public static endJourney = async (journeyId: string): Promise<void> => API.put(ApiName, `/journeys/end/${journeyId}`, '');

	public static cancelPassengerAcceptedJourney = async (journeyId: string): Promise<void> =>
		API.put(ApiName, `/journeys/passenger-cancel/${journeyId}`, '')
}
