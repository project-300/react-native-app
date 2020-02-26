import { DriverApplicationCheckResult, DriverApplicationResult, VehicleMakesResult, VehicleModelsResult } from './../types/http-responses';
import { ApiName } from './../../environment/env';
import { API } from 'aws-amplify';
import { Vehicle } from '@project-300/common-types';

export class DriverApplicationService {

	public static checkIfUserHasApplied = async (userId: string): Promise<DriverApplicationCheckResult> => API.get(ApiName,
		`/driver-applications/check/${userId}`, '')

	public static applyForApplication = async (vehicle: Vehicle): Promise<DriverApplicationResult> =>
		API.post(ApiName,
		'/driver-applications/apply',
		{
			body: vehicle
		})

	public static getAllVehicleMakes = async (): Promise<VehicleMakesResult> => API.get(ApiName, '/driver-applications/vehicle-makes', '');

	public static getVehicleModels = async (makeId: string, year: string): Promise<VehicleModelsResult> => API.get(ApiName,
		`/driver-applications/vehicle-models?makeId=${makeId}`, '')
}
