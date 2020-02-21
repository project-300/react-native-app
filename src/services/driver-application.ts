import { ApiName } from './../../environment/env';
import { API } from 'aws-amplify';
import { DriverApplicationObject } from '@project-300/common-types';

export class DriverApplicationService {

	public static checkIfUserHasApplied = async (userId: string): Promise<boolean> => API.get(ApiName,
		`/driver-applications/check/${userId}`, '')

	public static applyForApplication = async (application: Partial<DriverApplicationObject>): Promise<void> => API.post(ApiName,
		'/driver-applications/apply',
		{
			body: application
		})

	public static getAllVehicleMakes = async (): Promise<object[]> => API.get(ApiName, '/driver-applications/vehicle-makes', '');

	public static getVehicleModels = async (makeId: string, year: string): Promise<object[]> => API.get(ApiName,
		'/driver-applications/vehicle-models', '')
}
