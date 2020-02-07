import { Dispatch } from 'redux';
import { InterestsListResult } from '../../../types/http-responses';
import HttpAPI from '../../../api/http';
import toastr from '../../../helpers/toastr';
import { AppActions } from '../../../types/redux-action-types';
import { INTERESTS_REQUEST, INTERESTS_SUCCESS, INTERESTS_FAILURE } from '../../../constants/redux-actions';

const interestsRequest = (): AppActions => ({ type: INTERESTS_REQUEST });

const interestsSuccess = (interests: string[]): AppActions => ({ type: INTERESTS_SUCCESS, interests });

const interestsFailure = (): AppActions => ({ type: INTERESTS_FAILURE });

export const getInterestsList = (): (dispatch: Dispatch) => Promise<void | boolean> => {
	return async (dispatch: Dispatch): Promise<void | boolean > => {
		dispatch(interestsRequest());

		try {
			const interestsRes: InterestsListResult = await HttpAPI.getInterestsList() as InterestsListResult;

			if (interestsRes.success) {
				dispatch(interestsSuccess(interestsRes.interests));
				return true;
			}

			throw Error('Unable to retrieve list of interests');
		} catch (err) {
			dispatch(interestsFailure());
			toastr.error(`Unable to retrieve list of interests: ${err.message}`);
			return false;
		}
	};
};
