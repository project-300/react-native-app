import { ApiName } from '../../environment/env';
import { API } from 'aws-amplify';
import { Coords, Journey, LastEvaluatedKey, UserTypes } from '@project-300/common-types';
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

	public static getCurrentJourney = async (): Promise<{ success: boolean; journey: Journey; travellingAs: UserTypes }> => API.get(ApiName, `/journeys/current/${await deviceId()}`, '').catch(JourneyService.handleError);

	public static createJourney = async (journey: Partial<Journey>): Promise<void> => API.post(ApiName, '/journeys', { body: { journey } }).catch(JourneyService.handleError);

	public static addUserToJourney = async (journeyId: string, createdAt: string): Promise<void> => API.put(ApiName, '/journeys/add-user', { body: { journeyId, createdAt } }).catch(JourneyService.handleError);

	public static getDriverJourneys = async (): Promise<{ success: boolean; journeys: Journey[] }> => API.get(ApiName, `/journeys/driver`, '').catch(JourneyService.handleError);

	public static getPassengerJourneys = async (): Promise<{ success: boolean; journeys: Journey[] }> => API.get(ApiName, `/journeys/passenger`, '').catch(JourneyService.handleError);

	public static driverConfirmPassengerPickup = async (journeyId: string, createdAt: string, passengerId: string): Promise<{ success: boolean; journey: Journey }> => API.put(ApiName, `/journeys/confirm-pickup/driver`, { body: { journeyId, createdAt, passengerId } }).catch(JourneyService.handleError);

	public static passengerConfirmPickup = async (journeyId: string, createdAt: string): Promise<{ success: boolean; journey: Journey }> => API.put(ApiName, `/journeys/confirm-pickup/passenger`, { body: { journeyId, createdAt } }).catch(JourneyService.handleError);

	public static driverCancelPassengerPickup = async (journeyId: string, createdAt: string, passengerId: string): Promise<{ success: boolean; journey: Journey }> => API.put(ApiName, `/journeys/cancel-pickup/driver`, { body: { journeyId, createdAt, passengerId } }).catch(JourneyService.handleError);

	public static passengerCancelPickup = async (journeyId: string, createdAt: string): Promise<{ success: boolean; journey: Journey }> => API.put(ApiName, `/journeys/cancel-pickup/passenger`, { body: { journeyId, createdAt } }).catch(JourneyService.handleError);

	public static beginPickup = async (journeyId: string, createdAt: string): Promise<{ success: boolean; journey: Journey }> => API.put(ApiName, `/journeys/begin-pickup/${journeyId}/${createdAt}`, '').catch(JourneyService.handleError);

	public static waitingJourney = async (journeyId: string, createdAt: string): Promise<{ success: boolean; journey: Journey }> => API.put(ApiName, `/journeys/waiting/${journeyId}/${createdAt}`, '').catch(JourneyService.handleError);

	public static startJourney = async (journeyId: string, createdAt: string): Promise<{ success: boolean; journey: Journey }> => API.put(ApiName, `/journeys/start/${journeyId}/${createdAt}`, '').catch(JourneyService.handleError);

	public static pauseJourney = async (journeyId: string, createdAt: string): Promise<{ success: boolean; journey: Journey }> => API.put(ApiName, `/journeys/pause/${journeyId}/${createdAt}`, '').catch(JourneyService.handleError);

	public static resumeJourney = async (journeyId: string, createdAt: string): Promise<{ success: boolean; journey: Journey }> => API.put(ApiName, `/journeys/resume/${journeyId}/${createdAt}`, '').catch(JourneyService.handleError);

	public static endJourney = async (journeyId: string, createdAt: string): Promise<{ success: boolean; journey: Journey }> => API.put(ApiName, `/journeys/end/${journeyId}/${createdAt}`, '').catch(JourneyService.handleError);

	public static cancelJourney = async (journeyId: string, createdAt: string): Promise<{ success: boolean; journey: Journey }> => API.put(ApiName, `/journeys/cancel/${journeyId}/${createdAt}`, '').catch(JourneyService.handleError);

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
