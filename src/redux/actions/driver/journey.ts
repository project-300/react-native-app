import {
	JOURNEY_DETAILS_REQUEST,
	JOURNEY_DETAILS_SUCCESS,
	JOURNEY_DETAILS_FAILURE,
	START_JOURNEY_REQUEST,
	START_JOURNEY_SUCCESS,
	START_JOURNEY_FAILURE,
	END_JOURNEY_REQUEST,
	END_JOURNEY_SUCCESS,
	END_JOURNEY_FAILURE,
	DRIVER_MOVEMENT_REQUEST,
	DRIVER_MOVEMENT_SUCCESS,
	DRIVER_MOVEMENT_FAILURE
} from '../../../constants/redux-actions';
import { Dispatch } from 'redux';
import { JourneyDetailsResult } from '../../../types/http-responses';
import HttpAPI from '../../../api/http';
import toastr from '../../../helpers/toastr';
import { AppActions } from '../../../types/redux-action-types';
import { Coords, Journey } from '@project-300/common-types';
import { JourneyService } from '../../../services/journey';

const journeyDetailsRequest = (): AppActions => ({ type: JOURNEY_DETAILS_REQUEST });

const journeyDetailsSuccess = (journey: Journey): AppActions => ({ type: JOURNEY_DETAILS_SUCCESS, journey });

const journeyDetailsFailure = (): AppActions => ({ type: JOURNEY_DETAILS_FAILURE });

const startJourneyRequest = (): AppActions => ({ type: START_JOURNEY_REQUEST });

const startJourneySuccess = (journey: Journey): AppActions => ({ type: START_JOURNEY_SUCCESS, journey });

const startJourneyFailure = (): AppActions => ({ type: START_JOURNEY_FAILURE });

const endJourneyRequest = (): AppActions => ({ type: END_JOURNEY_REQUEST });

const endJourneySuccess = (journey: Journey): AppActions => ({ type: END_JOURNEY_SUCCESS, journey });

const endJourneyFailure = (): AppActions => ({ type: END_JOURNEY_FAILURE });

const driverMovementRequest = (): AppActions => ({ type: DRIVER_MOVEMENT_REQUEST });

const driverMovementSuccess = (journey: Journey): AppActions => ({ type: DRIVER_MOVEMENT_SUCCESS, journey });

const driverMovementFailure = (): AppActions => ({ type: DRIVER_MOVEMENT_FAILURE });

export const getJourneyDetails = (journeyId: string, createdAt: string): (dispatch: Dispatch) => Promise<void> => {
	return async (dispatch: Dispatch): Promise<void> => {
		dispatch(journeyDetailsRequest());

		try {
			const result: { success: boolean; journey: Journey } = await JourneyService.getJourneyById(journeyId, createdAt);
			console.log(result);

			if (result.success && result.journey) dispatch(journeyDetailsSuccess(result.journey));
		} catch (err) {
			dispatch(journeyDetailsFailure());
			toastr.error(err.message);
		}
	};
};

export const subscribeDriverLocation = (journeyId: string, createdAt: string): (dispatch: Dispatch) => Promise<void> => {
	return async (dispatch: Dispatch): Promise<void> => {
		// dispatch(journeyDetailsRequest());

		try {
			const result: { success: boolean } = await JourneyService.subscribeDriverLocation(journeyId, createdAt);
			console.log(result);

			// if (apiRes.success) dispatch(journeyDetailsSuccess(apiRes.journey));
		} catch (err) {
			console.log(err);
			// dispatch(journeyDetailsFailure());
			toastr.error(err.message);
		}
	};
};

export const unsubscribeDriverLocation = (journeyId: string): (dispatch: Dispatch) => Promise<void> => {
	return async (dispatch: Dispatch): Promise<void> => {
		// dispatch(journeyDetailsRequest());

		try {
			const result: { success: boolean } = await JourneyService.unsubscribeDriverLocation(journeyId);
			console.log(result);

			// if (apiRes.success) dispatch(journeyDetailsSuccess(apiRes.journey));
		} catch (err) {
			console.log(err);
			// dispatch(journeyDetailsFailure());
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

export const driverMovement = (journeyId: string, createdAt: string, coords: Coords): (dispatch: Dispatch) => Promise<void> => {
	return async (dispatch: Dispatch): Promise<void> => {
		console.log('driver movement');
		dispatch(driverMovementRequest());

		try {
			const apiRes: JourneyDetailsResult = await JourneyService.driverMovement(journeyId, createdAt, coords) as JourneyDetailsResult;

			console.log(apiRes);
			if (apiRes.success && apiRes.journey) dispatch(driverMovementSuccess(apiRes.journey));
		} catch (err) {
			console.log(err);
			dispatch(driverMovementFailure());
			toastr.error(err.message);
		}
	};
};
