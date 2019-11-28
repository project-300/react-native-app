import { JOURNEY_DETAILS_REQUEST, JOURNEY_DETAILS_SUCCESS, JOURNEY_DETAILS_FAILURE } from '../../../constants/redux-actions';
import { Dispatch } from 'redux';
import { JourneyDetailsResult } from '../../../types/http-responses';
import HttpAPI from '../../../api/http';
import toastr from '../../../helpers/toastr';
import { AppActions } from '../../../types/redux-action-types';
import { Journey } from '@project-300/common-types';

const journeyDetailsRequest = (): AppActions => ({ type: JOURNEY_DETAILS_REQUEST });

const journeyDetailsSuccess = (journey: Journey): AppActions => ({ type: JOURNEY_DETAILS_SUCCESS, journey });

const journeyDetailsFailure = (): AppActions => ({ type: JOURNEY_DETAILS_FAILURE });

export const getJourneyDetails = (journeyId: string): (dispatch: Dispatch) => Promise<void> => {
	return async (dispatch: Dispatch): Promise<void> => {
		console.log('getting details');
		dispatch(journeyDetailsRequest());

		try {
			const apiRes: JourneyDetailsResult = await HttpAPI.getJourneyDetails({ journeyId });

			console.log(apiRes);
			if (apiRes.success && apiRes.journey) {
				dispatch(journeyDetailsSuccess(apiRes.journey));
			}
		} catch (err) {
			dispatch(journeyDetailsFailure());
			toastr.error(err.message);
		}
	};
};
