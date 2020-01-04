import {
	JOURNEYS_REQUEST,
	JOURNEYS_SUCCESS,
	JOURNEYS_FAILURE,
	CANCEL_PASSENGER_JOURNEY_REQUEST,
	CANCEL_PASSENGER_JOURNEY_SUCCESS,
	CANCEL_PASSENGER_JOURNEY_FAILURE
} from '../../../constants/redux-actions';
import { Dispatch } from 'redux';
import { JourneysResult } from '../../../types/http-responses';
import HttpAPI from '../../../api/http';
import toastr from '../../../helpers/toastr';
import { AppActions } from '../../../types/redux-action-types';
import { Journey } from '@project-300/common-types';
import { userId } from '../../../auth';

const journeysRequest = (): AppActions => ({ type: JOURNEYS_REQUEST });

const journeysSuccess = (journeys: { previous: Journey[]; current: Journey[] }): AppActions => ({ type: JOURNEYS_SUCCESS, journeys });

const journeysFailure = (): AppActions => ({ type: JOURNEYS_FAILURE });

const cancelPassengerAcceptedJourneyRequest = (): AppActions => ({ type: CANCEL_PASSENGER_JOURNEY_REQUEST });

const cancelPassengerAcceptedJourneySuccess = (journeys: { previous: Journey[]; current: Journey[] }):
	AppActions => ({ type: CANCEL_PASSENGER_JOURNEY_SUCCESS, journeys });

const cancelPassengerAcceptedJourneyFailure = (): AppActions => ({ type: CANCEL_PASSENGER_JOURNEY_FAILURE });

export const getJourneys = (driver: boolean): (dispatch: Dispatch) => Promise<void> => {
	return async (dispatch: Dispatch): Promise<void> => {
		dispatch(journeysRequest());

		const uId: string = await userId() as string;

		try {
			const apiRes: JourneysResult = (driver ?
				await HttpAPI.getDriverJourneys({ userId: uId }) :
				await HttpAPI.getPassengerJourneys({ userId: uId })) as JourneysResult;

			console.log(apiRes);

			if (apiRes.success && apiRes.journeys) dispatch(journeysSuccess(apiRes.journeys));
			else dispatch(journeysFailure());
		} catch (err) {
			console.log(err);
			dispatch(journeysFailure());
			toastr.error(err.message);
		}
	};
};

export const cancelPassengerAcceptedJourney = (journeyId: string): (dispatch: Dispatch) => Promise<void> => {
	return async (dispatch: Dispatch): Promise<void> => {
		dispatch(cancelPassengerAcceptedJourneyRequest());

		const uId: string = await userId() as string;

		try {
			const apiRes: JourneysResult = await HttpAPI.cancelPassengerAcceptedJourney({ journeyId, userId: uId });

			console.log(apiRes);

			if (apiRes.success && apiRes.journeys) dispatch(cancelPassengerAcceptedJourneySuccess(apiRes.journeys));
			else dispatch(cancelPassengerAcceptedJourneyFailure());
		} catch (err) {
			console.log(err);
			dispatch(cancelPassengerAcceptedJourneyFailure());
			toastr.error(err.message || err.description);
		}
	};
};
