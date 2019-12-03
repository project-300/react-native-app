import {
	GOOGLE_PLACES_SEARCH_REQUEST,
	GOOGLE_PLACES_SEARCH_SUCCESS,
	GOOGLE_PLACES_SEARCH_FAILURE
} from '../../../constants/redux-actions';
import { Dispatch } from 'redux';
import toastr from '../../../helpers/toastr';
import { AppActions } from '../../../types/redux-action-types';
import { GooglePlace } from '../../../types/maps';
import { GooglePlacesSearchResult } from '../../../types/google';
import ExternalApi from '../../../api/external-api';

const googlePlacesSearchRequest = (): AppActions => ({ type: GOOGLE_PLACES_SEARCH_REQUEST });

const googlePlacesSearchSuccess = (places: GooglePlace[]): AppActions => ({ type: GOOGLE_PLACES_SEARCH_SUCCESS, places });

const googlePlacesSearchFailure = (): AppActions => ({ type: GOOGLE_PLACES_SEARCH_FAILURE });

export const googlePlacesSearch = (query: string): (dispatch: Dispatch) => Promise<void> => {
	return async (dispatch: Dispatch): Promise<void> => {
		dispatch(googlePlacesSearchRequest());

		try {
			const apiRes: GooglePlacesSearchResult = await ExternalApi.GooglePlaces(query);

			console.log(apiRes);

			if (apiRes.status === 'OK' && apiRes.predictions) {
				console.log('success')
				dispatch(googlePlacesSearchSuccess(apiRes.predictions));
			}
			else dispatch(googlePlacesSearchFailure());
		} catch (err) {
			console.log(err);
			dispatch(googlePlacesSearchFailure());
			toastr.error(err.message);
		}
	};
};
