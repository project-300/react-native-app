import { ApiName } from '../../environment/env';
import { API } from 'aws-amplify';
import { Interest } from '@project-300/common-types';

export class InterestService {

	public static getInterestsList = async (): Promise<Interest> => API.get(ApiName, `/interests/list`, '');

}
