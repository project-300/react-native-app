import { Dispatch } from 'redux';
import { JourneyDetailsResult } from '../../../types/http-responses';
import HttpAPI from '../../../api/http';
import toastr from '../../../helpers/toastr';
import { AppActions } from '../../../types/redux-action-types';
import {
	PASSENGER_JOURNEY_DETAILS_REQUEST,
	PASSENGER_JOURNEY_DETAILS_SUCCESS,
	PASSENGER_JOURNEY_DETAILS_FAILURE,
	UPDATE_DRIVER_LOCATION
} from '../../../constants/redux-actions';
import { Coords, Journey, SubscriptionPayload } from '@project-300/common-types';

export const updateDriverLocation = (payload: SubscriptionPayload): AppActions =>
	({ type: UPDATE_DRIVER_LOCATION, payload });

const passengerJourneyDetailsRequest = (): AppActions => ({ type: PASSENGER_JOURNEY_DETAILS_REQUEST });

const passengerJourneyDetailsSuccess = (journey: Journey): AppActions => ({ type: PASSENGER_JOURNEY_DETAILS_SUCCESS, journey });

const passengerJourneyDetailsFailure = (): AppActions => ({ type: PASSENGER_JOURNEY_DETAILS_FAILURE });

export const getPassengerJourneyDetails = (journeyId: string): (dispatch: Dispatch) => Promise<void> => {
	return async (dispatch: Dispatch): Promise<void> => {
		console.log('getting passenger journey details');
		dispatch(passengerJourneyDetailsRequest());

		try {
			const apiRes: JourneyDetailsResult = await HttpAPI.getJourneyDetails({ journeyId }) as JourneyDetailsResult;

			console.log(apiRes);
			if (apiRes.success && apiRes.journey) dispatch(passengerJourneyDetailsSuccess(apiRes.journey));
			else dispatch(passengerJourneyDetailsFailure());
		} catch (err) {
			dispatch(passengerJourneyDetailsFailure());
			toastr.error(err.message);
		}
	};
};
