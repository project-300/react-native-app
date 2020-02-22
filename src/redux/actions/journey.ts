import { AppActions } from '../../types/redux-action-types';
import {
	GET_ALL_JOURNEYS_REQUEST,
	GET_ALL_JOURNEYS_SUCCESS,
	GET_ALL_JOURNEYS_FAILURE,
	CLEAR_ALL_JOURNEYS,
	SEARCH_JOURNEYS_REQUEST,
	SEARCH_JOURNEYS_SUCCESS,
	SEARCH_JOURNEYS_FAILURE,
} from '../../constants/redux-actions';
import { Dispatch } from 'redux';
import { GetAllJourneysResult } from '../../types/http-responses';
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

export const clearJourneys = (): AppActions => ({
	type: CLEAR_ALL_JOURNEYS
});

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
