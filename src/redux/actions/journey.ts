import { AppActions } from '../../types/redux-action-types';
import {
	GET_ALL_JOURNEYS_REQUEST,
	GET_ALL_JOURNEYS_SUCCESS,
	GET_ALL_JOURNEYS_FAILURE,
	CLEAR_ALL_JOURNEYS,
	UPDATE_ADD_USER_JOURNEY_REQUEST,
	UPDATE_ADD_USER_JOURNEY_SUCCESS,
	UPDATE_ADD_USER_JOURNEY_FAILURE,
	SEARCH_JOURNEYS_REQUEST,
	SEARCH_JOURNEYS_SUCCESS,
	SEARCH_JOURNEYS_FAILURE,
	CANCEL_LIFT_ACCEPTANCE_REQUEST,
	CANCEL_LIFT_ACCEPTANCE_SUCCESS,
	CANCEL_LIFT_ACCEPTANCE_FAILURE
} from '../../constants/redux-actions';
import { Dispatch } from 'redux';
import {
	GetAllJourneysResult,
	UpdateAddUserJourneyResult
} from '../../types/http-responses';
import toastr from '../../helpers/toastr';
import { Journey, LastEvaluatedKey } from '@project-300/common-types';
import { JourneyService } from '../../services/journey';

const getAllJourneysRequest = (): AppActions => ({
	type: GET_ALL_JOURNEYS_REQUEST
});

const getAllJourneysSuccess = (journeys: Journey[], isFirstCall: boolean, lastEvaluatedKey?: LastEvaluatedKey): AppActions => ({
	type: GET_ALL_JOURNEYS_SUCCESS,
	journeys,
	lastEvaluatedKey,
	isFirstCall
});

const getAllJourneysFailure = (): AppActions => ({
	type: GET_ALL_JOURNEYS_FAILURE
});

const searchJourneysRequest = (): AppActions => ({
	type: SEARCH_JOURNEYS_REQUEST
});

const searchJourneysSuccess = (journeys: Journey[], isFirstCall: boolean, lastEvaluatedKey?: LastEvaluatedKey): AppActions => ({
	type: SEARCH_JOURNEYS_SUCCESS,
	journeys,
	lastEvaluatedKey,
	isFirstCall
});

const searchJourneysFailure = (): AppActions => ({
	type: SEARCH_JOURNEYS_FAILURE
});

const joinLiftRequest = (): AppActions => ({
	type: UPDATE_ADD_USER_JOURNEY_REQUEST
});

const joinLiftSuccess = (): AppActions => ({
	type: UPDATE_ADD_USER_JOURNEY_SUCCESS
});

const joinLiftFailure = (): AppActions => ({
	type: UPDATE_ADD_USER_JOURNEY_FAILURE
});

export const clearJourneys = (): AppActions => ({
	type: CLEAR_ALL_JOURNEYS
});

const cancelLiftAcceptanceRequest = (): AppActions => ({
	type: CANCEL_LIFT_ACCEPTANCE_REQUEST
});

const cancelLiftAcceptanceSuccess = (): AppActions => ({
	type: CANCEL_LIFT_ACCEPTANCE_SUCCESS
});

const cancelLiftAcceptanceFailure = (): AppActions => ({
	type: CANCEL_LIFT_ACCEPTANCE_FAILURE
});

export const updateAddUserJourney = (journeyId: string, createdAt: string): ((dispatch: Dispatch) => Promise<boolean>) => {
	return async (dispatch: Dispatch): Promise<boolean> => {
		dispatch(joinLiftRequest());

		try {
			const apiRes: UpdateAddUserJourneyResult = await JourneyService.addUserToJourney(journeyId, createdAt);

			if (apiRes.success) {
				dispatch(joinLiftSuccess());
				toastr.success('You are now added to the journey');
				return true;
			}

			return false;
		} catch (err) {
			console.log(err);
			dispatch(joinLiftFailure());
			toastr.error(err.message || err.description || 'Unknown Error');
			return false;
		}
	};
};

export const cancelLiftAcceptance = (journeyId: string, createdAt: string): ((dispatch: Dispatch) => Promise<boolean>) => {
	return async (dispatch: Dispatch): Promise<boolean> => {
		dispatch(cancelLiftAcceptanceRequest());

		try {
			const apiRes: UpdateAddUserJourneyResult = await JourneyService.cancelPassengerAcceptedJourney(journeyId, createdAt);

			if (apiRes.success) {
				dispatch(cancelLiftAcceptanceSuccess());
				toastr.success('You have successfully cancelled your lift request');
				return true;
			}

			return false;
		} catch (err) {
			console.log(err);
			dispatch(cancelLiftAcceptanceFailure());
			toastr.error(err.message || err.description || 'Unknown Error');
			return false;
		}
	};
};

export const getAllJourneys = (isFirstCall: boolean, lastEvaluatedKey?: LastEvaluatedKey): ((dispatch: Dispatch) => Promise<boolean>) => {
	return async (dispatch: Dispatch): Promise<boolean> => {
		dispatch(getAllJourneysRequest());

		try {
			const result: GetAllJourneysResult = await JourneyService.getAllJourneys(lastEvaluatedKey);

			console.log(result);

			if (result.success && result.journeys) {
				dispatch(getAllJourneysSuccess(result.journeys, isFirstCall, result.lastEvaluatedKey));
				return true;
			}

			return false;
		} catch (err) {
			console.log(err);
			dispatch(getAllJourneysFailure());
			toastr.error(err.message || err.description || 'Unknown Error');
			return false;
		}
	};
};

export const searchJourneys = (query: string, isFirstCall: boolean, lastEvaluatedKey?: LastEvaluatedKey): ((dispatch: Dispatch) => Promise<boolean>) => {
	return async (dispatch: Dispatch): Promise<boolean> => {
		dispatch(searchJourneysRequest());

		try {
			const result: GetAllJourneysResult = await JourneyService.searchJourneys(query, lastEvaluatedKey);

			if (result.success && result.journeys) {
				dispatch(searchJourneysSuccess(result.journeys, isFirstCall, result.lastEvaluatedKey));
				return true;
			}

			return false;
		} catch (err) {
			console.log(err);
			dispatch(searchJourneysFailure());
			toastr.error(err.message || err.description || 'Unknown Error');
			return false;
		}
	};
};
