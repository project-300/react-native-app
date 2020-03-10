import { Dispatch } from 'redux';
import { Journey } from '@project-300/common-types';
import { JourneyService } from '../../../services/journey';
import toastr from '../../../helpers/toastr';
import { AppActions } from '../../../types/redux-action-types';
import {
	PASSENGER_JOURNEY_RATING_REQUEST,
	PASSENGER_JOURNEY_RATING_SUCCESS,
	PASSENGER_JOURNEY_RATING_FAILURE
} from '../../../constants/redux-actions';

const passengerJourneyRatingRequest = (): AppActions => ({ type: PASSENGER_JOURNEY_RATING_REQUEST });

const passengerJourneyRatingSuccess = (journey: Journey): AppActions => ({ type: PASSENGER_JOURNEY_RATING_SUCCESS, journey });

const passengerJourneyRatingFailure = (): AppActions => ({ type: PASSENGER_JOURNEY_RATING_FAILURE });

export const passengerJourneyRating = (journeyId: string, createdAt: string, rating: number): (dispatch: Dispatch) => Promise<boolean> => {
	return async (dispatch: Dispatch): Promise<boolean> => {
		dispatch(passengerJourneyRatingRequest());

		try {
			const result: { success: boolean; journey: Journey } = await JourneyService.rateJourney(journeyId, createdAt, rating);

			console.log(result);

			if (result.success && result.journey) {
				dispatch(passengerJourneyRatingSuccess(result.journey));
				toastr.success('Your Rating Has Been Submitted');
				return true;
			}

			dispatch(passengerJourneyRatingFailure());
			return false;
		} catch (err) {
			console.log(err);
			dispatch(passengerJourneyRatingFailure());
			toastr.error(err.message);
			return false;
		}
	};
};

