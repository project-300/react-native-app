import {
	CANCEL_JOURNEY_REQUEST,
	CANCEL_JOURNEY_SUCCESS,
	CANCEL_JOURNEY_FAILURE
} from '../../../constants/redux-actions';
import { Dispatch } from 'redux';
import toastr from '../../../helpers/toastr';
import { AppActions } from '../../../types/redux-action-types';
import { Journey } from '@project-300/common-types';
import { JourneyService } from '../../../services/journey';

const cancelJourneyRequest = (): AppActions => ({ type: CANCEL_JOURNEY_REQUEST });

const cancelJourneySuccess = (journey: Journey): AppActions => ({ type: CANCEL_JOURNEY_SUCCESS, journey });

const cancelJourneyFailure = (): AppActions => ({ type: CANCEL_JOURNEY_FAILURE });

export const cancelJourney = (journeyId: string, createdAt: string): (dispatch: Dispatch) => Promise<boolean> => {
	return async (dispatch: Dispatch): Promise<boolean> => {
		dispatch(cancelJourneyRequest());

		try {
			const result: { success: boolean; journey: Journey } = await JourneyService.cancelJourney(journeyId, createdAt);

			console.log(result);

			if (result.success && result.journey) {
				dispatch(cancelJourneySuccess(result.journey));
				toastr.success('You have successfully cancelled your journey');
				return true;
			}

			dispatch(cancelJourneyFailure());
			return false;
		} catch (err) {
			console.log(err);
			dispatch(cancelJourneyFailure());
			toastr.error(err.message || err.description);
			return false;
		}
	};
};
