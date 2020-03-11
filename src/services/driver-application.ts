import { DriverApplicationCheckResult, DriverApplicationResult, VehicleMakesResult, VehicleModelsResult } from './../types/http-responses';
import { ApiName } from './../../environment/env';
import { API } from 'aws-amplify';
import { Vehicle } from '@project-300/common-types';

export class DriverApplicationService {

	public static checkIfUserHasApplied = async (userId: string): Promise<DriverApplicationCheckResult> => API.get(ApiName,
		`/driver-applications/check/${userId}`, '').catch(DriverApplicationService.handleError)

	public static applyForApplication = async (vehicle: any): Promise<DriverApplicationResult> =>
		API.post(ApiName,
		'/driver-applications/apply',
		{
			body: vehicle
		}).catch(DriverApplicationService.handleError)

	public static getAllVehicleMakes = async (): Promise<VehicleMakesResult> => API.get(ApiName, '/driver-applications/vehicle-makes', '');

	public static getVehicleModels = async (makeId: string, year: string): Promise<VehicleModelsResult> => API.get(ApiName,
		`/driver-applications/vehicle-models?makeId=${makeId}`, '')

	private static handleError = (error: any): void => {
		console.log(error.response);
		if (!error.response || !error.response.data || !error.response.data) throw { message: 'Unknown Error' };
		throw error.response.data.error || error.response.data.message;
	}
}
