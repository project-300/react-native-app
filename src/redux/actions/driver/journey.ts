import {
	JOURNEY_DETAILS_REQUEST,
	JOURNEY_DETAILS_SUCCESS,
	JOURNEY_DETAILS_FAILURE,
	START_JOURNEY_REQUEST,
	START_JOURNEY_SUCCESS,
	START_JOURNEY_FAILURE,
	END_JOURNEY_REQUEST,
	END_JOURNEY_SUCCESS,
	END_JOURNEY_FAILURE
} from '../../../constants/redux-actions';
import { Dispatch } from 'redux';
import { JourneyDetailsResult } from '../../../types/http-responses';
import HttpAPI from '../../../api/http';
import toastr from '../../../helpers/toastr';
import { AppActions } from '../../../types/redux-action-types';
import { Journey } from '@project-300/common-types';

const journeyDetailsRequest = (): AppActions => ({ type: JOURNEY_DETAILS_REQUEST });

const journeyDetailsSuccess = (journey: Journey): AppActions => ({ type: JOURNEY_DETAILS_SUCCESS, journey });

const journeyDetailsFailure = (): AppActions => ({ type: JOURNEY_DETAILS_FAILURE });

const startJourneyRequest = (): AppActions => ({ type: START_JOURNEY_REQUEST });

const startJourneySuccess = (journey: Journey): AppActions => ({ type: START_JOURNEY_SUCCESS, journey });

const startJourneyFailure = (): AppActions => ({ type: START_JOURNEY_FAILURE });

const endJourneyRequest = (): AppActions => ({ type: END_JOURNEY_REQUEST });

const endJourneySuccess = (journey: Journey): AppActions => ({ type: END_JOURNEY_SUCCESS, journey });

const endJourneyFailure = (): AppActions => ({ type: END_JOURNEY_FAILURE });

export const getJourneyDetails = (journeyId: string): (dispatch: Dispatch) => Promise<void> => {
	return async (dispatch: Dispatch): Promise<void> => {
		console.log('getting details');
		dispatch(journeyDetailsRequest());

		try {
			const apiRes: JourneyDetailsResult = await HttpAPI.getJourneyDetails({ journeyId }) as JourneyDetailsResult;

			console.log(apiRes);
			if (apiRes.success && apiRes.journey) dispatch(journeyDetailsSuccess(apiRes.journey));
		} catch (err) {
			dispatch(journeyDetailsFailure());
			toastr.error(err.message);
		}
	};
};

export const startJourney = (journeyId: string): (dispatch: Dispatch) => Promise<void> => {
	return async (dispatch: Dispatch): Promise<void> => {
		console.log('starting journey');
		dispatch(startJourneyRequest());

		try {
			const apiRes: JourneyDetailsResult = await HttpAPI.startJourney({ journeyId }) as JourneyDetailsResult;

			console.log(apiRes);
			if (apiRes.success && apiRes.journey) dispatch(startJourneySuccess(apiRes.journey));
		} catch (err) {
			console.log(err);
			dispatch(startJourneyFailure());
			toastr.error(err.message);
		}
	};
};

export const endJourney = (journeyId: string): (dispatch: Dispatch) => Promise<void> => {
	return async (dispatch: Dispatch): Promise<void> => {
		console.log('ending journey');
		dispatch(endJourneyRequest());

		try {
			const apiRes: JourneyDetailsResult = await HttpAPI.endJourney({ journeyId }) as JourneyDetailsResult;

			console.log(apiRes);
			if (apiRes.success && apiRes.journey) dispatch(endJourneySuccess(apiRes.journey));
		} catch (err) {
			console.log(err);
			dispatch(endJourneyFailure());
			toastr.error(err.message);
		}
	};
};
