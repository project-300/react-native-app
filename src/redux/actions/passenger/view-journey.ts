import { AppActions } from '../../../types/redux-action-types';
import {
	CANCEL_LIFT_ACCEPTANCE_FAILURE,
	CANCEL_LIFT_ACCEPTANCE_REQUEST,
	CANCEL_LIFT_ACCEPTANCE_SUCCESS, CLEAR_VIEW_JOURNEY_INFO,
	GET_VIEW_JOURNEY_FAILURE,
	GET_VIEW_JOURNEY_REQUEST,
	GET_VIEW_JOURNEY_SUCCESS,
	UPDATE_ADD_USER_JOURNEY_FAILURE,
	UPDATE_ADD_USER_JOURNEY_REQUEST,
	UPDATE_ADD_USER_JOURNEY_SUCCESS
} from '../../../constants/redux-actions';
import { Journey } from '@project-300/common-types';
import { Dispatch } from 'redux';
import { UpdateAddUserJourneyResult } from '../../../types/http-responses';
import { JourneyService } from '../../../services/journey';
import toastr from '../../../helpers/toastr';

const getJourneyRequest = (): AppActions => ({
	type: GET_VIEW_JOURNEY_REQUEST
});

const getJourneySuccess = (journey: Journey): AppActions => ({
	type: GET_VIEW_JOURNEY_SUCCESS,
	journey
});

const getJourneyFailure = (): AppActions => ({
	type: GET_VIEW_JOURNEY_FAILURE
});

const joinLiftRequest = (): AppActions => ({
	type: UPDATE_ADD_USER_JOURNEY_REQUEST
});

const joinLiftSuccess = (journey: Journey): AppActions => ({
	type: UPDATE_ADD_USER_JOURNEY_SUCCESS,
	journey
});

const joinLiftFailure = (): AppActions => ({
	type: UPDATE_ADD_USER_JOURNEY_FAILURE
});

const cancelLiftAcceptanceRequest = (): AppActions => ({
	type: CANCEL_LIFT_ACCEPTANCE_REQUEST
});

const cancelLiftAcceptanceSuccess = (journey: Journey): AppActions => ({
	type: CANCEL_LIFT_ACCEPTANCE_SUCCESS,
	journey
});

const cancelLiftAcceptanceFailure = (): AppActions => ({
	type: CANCEL_LIFT_ACCEPTANCE_FAILURE
});

export const clearJourneyInfo = (): AppActions => ({
	type: CLEAR_VIEW_JOURNEY_INFO
});

export const getViewJourney = (journeyId: string, createdAt: string): ((dispatch: Dispatch) => Promise<boolean>) => {
	return async (dispatch: Dispatch): Promise<boolean> => {
		dispatch(getJourneyRequest());

		try {
			const apiRes: UpdateAddUserJourneyResult = await JourneyService.getJourneyById(journeyId, createdAt);

			console.log(apiRes);
			if (apiRes.success) {
				dispatch(getJourneySuccess(apiRes.journey));
				return true;
			}

			return false;
		} catch (err) {
			console.log(err);
			dispatch(getJourneyFailure());
			toastr.error(err.message || err.description || 'Unknown Error');
			return false;
		}
	};
};

export const updateAddUserJourney = (journeyId: string, createdAt: string): ((dispatch: Dispatch) => Promise<boolean>) => {
	return async (dispatch: Dispatch): Promise<boolean> => {
		dispatch(joinLiftRequest());

		try {
			const apiRes: UpdateAddUserJourneyResult = await JourneyService.addUserToJourney(journeyId, createdAt);

			console.log(apiRes);
			if (apiRes.success) {
				dispatch(joinLiftSuccess(apiRes.journey));
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
			console.log(apiRes);

			if (apiRes.success) {
				dispatch(cancelLiftAcceptanceSuccess(apiRes.journey));
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
