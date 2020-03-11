import { ApiName } from '../../environment/env';
import { API } from 'aws-amplify';
import { Interest } from '@project-300/common-types';

export class InterestService {

	public static getInterestsList = async (): Promise<{ success: boolean; interests: string[] }> => API.get(ApiName, `/interests/list`, '').catch(InterestService.handleError);

	private static handleError = (error: any): void => {
		if (!error.response || !error.response.data || !error.response.data) throw { message: 'Unknown Error' };
		throw error.response.data.error;
	}

}
