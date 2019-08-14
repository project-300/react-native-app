import { Lift } from './../types/http-responses';
import { ThunkDispatch } from 'redux-thunk';
import { Dispatch } from 'redux';
import {
	FETCHING_LIFTS_REQUEST,
	FETCHING_LIFTS_FAILURE,
	FETCHING_LIFTS_SUCCESS
 } from './../constants/redux-actions';
import { AppActions } from '../types/redux-action-types';

const fetchingLiftsRequest = (): AppActions => ({ type: FETCHING_LIFTS_REQUEST });

const fetchingLiftsSuccess = (json: Lift[]): AppActions => ({
	type: FETCHING_LIFTS_SUCCESS,
	payload: json
});

const fetchingLiftsFailure = (error: Error): AppActions => ({
	type: FETCHING_LIFTS_FAILURE,
	payload: error
});

interface LiftsRequestResponse {
	ok: boolean;
}

export const fetchLifts = (): (dispatch: Dispatch<AppActions>) => Promise<LiftsRequestResponse> => {
	return async (dispatch: Dispatch<AppActions>): Promise<LiftsRequestResponse> => {
		dispatch(fetchingLiftsRequest());
		try {
			const response: Response = await fetch('https://j4ggmo5dth.execute-api.eu-west-1.amazonaws.com/dev/lifts');
			const json = await response.json();
			dispatch(fetchingLiftsSuccess(json));

			return { ok: true };
		} catch (error) {
			dispatch(fetchingLiftsFailure(error));

			return { ok: false};
		}
	};
};
