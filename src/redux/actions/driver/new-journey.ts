import {
	GOOGLE_PLACES_SEARCH_REQUEST,
	GOOGLE_PLACES_SEARCH_SUCCESS,
	GOOGLE_PLACES_SEARCH_FAILURE,
	GOOGLE_PLACES_SEARCH_CLEAR_RESULTS,
	GOOGLE_PLACES_DETAILS_REQUEST,
	GOOGLE_PLACES_DETAILS_SUCCESS,
	GOOGLE_PLACES_DETAILS_FAILURE,
	SELECT_GOOGLE_PLACE,
	CREATE_JOURNEY_REQUEST,
	CREATE_JOURNEY_SUCCESS,
	CREATE_JOURNEY_FAILURE,
	CREATE_JOURNEY_DROP_MARKER,
	CLEAR_NEW_JOURNEY_FORM_DETAILS,
	FIND_NEARBY_PLACE_REQUEST,
	FIND_NEARBY_PLACE_SUCCESS,
	FIND_NEARBY_PLACE_FAILURE
} from '../../../constants/redux-actions';
import { Dispatch } from 'redux';
import toastr from '../../../helpers/toastr';
import { AppActions } from '../../../types/redux-action-types';
import { GooglePlace } from '../../../types/maps';
import { GoogleNearbyPlaceResult, GooglePlaceDetailsResult, GooglePlacesSearchResult } from '../../../types/google';
import ExternalApi from '../../../api/external-api';
import { Coords, CreateJourney, GooglePlaceDetails } from '@project-300/common-types';
import HttpAPI from '../../../api/http';
import { userId } from '../../../auth';
import { CreateJourneyResult } from '../../../types/http-responses';

const googlePlacesSearchRequest = (): AppActions => ({ type: GOOGLE_PLACES_SEARCH_REQUEST });

const googlePlacesSearchSuccess = (places: GooglePlace[]): AppActions => ({ type: GOOGLE_PLACES_SEARCH_SUCCESS, places });

const googlePlacesSearchFailure = (): AppActions => ({ type: GOOGLE_PLACES_SEARCH_FAILURE });

const googlePlaceDetailsRequest = (): AppActions => ({ type: GOOGLE_PLACES_DETAILS_REQUEST });

const googlePlaceDetailsSuccess = (placeDetails: GooglePlaceDetails, locationType: string):
	AppActions => ({ type: GOOGLE_PLACES_DETAILS_SUCCESS, placeDetails, locationType });

const googlePlaceDetailsFailure = (): AppActions => ({ type: GOOGLE_PLACES_DETAILS_FAILURE });

const createJourneyRequest = (): AppActions => ({ type: CREATE_JOURNEY_REQUEST });

const createJourneySuccess = (): AppActions => ({ type: CREATE_JOURNEY_SUCCESS });

const createJourneyFailure = (): AppActions => ({ type: CREATE_JOURNEY_FAILURE });

export const googlePlacesSearchClearResults = (): AppActions => ({ type: GOOGLE_PLACES_SEARCH_CLEAR_RESULTS });

export const clearNewJourneyFormDetails = (): AppActions => ({ type: CLEAR_NEW_JOURNEY_FORM_DETAILS });

export const selectGooglePlace = (place: GooglePlace, locationType: string):
	AppActions => ({ type: SELECT_GOOGLE_PLACE, place, locationType });

export const googlePlacesSearch = (query: string): (dispatch: Dispatch) => Promise<void> => {
	return async (dispatch: Dispatch): Promise<void> => {
		dispatch(googlePlacesSearchRequest());

		try {
			if (!query) { // Empty search - No results
				dispatch(googlePlacesSearchSuccess([ ]));
				return;
			}

			const apiRes: GooglePlacesSearchResult = await ExternalApi.GooglePlaces(query);

			console.log(apiRes);

			if (apiRes.status === 'OK' && apiRes.predictions) dispatch(googlePlacesSearchSuccess(apiRes.predictions));
			else dispatch(googlePlacesSearchFailure());
		} catch (err) {
			console.log(err);
			dispatch(googlePlacesSearchFailure());
			toastr.error(err.message);
		}
	};
};

export const getGooglePlaceDetails = (placeId: string, locationType: string): (dispatch: Dispatch) => Promise<void> => {
	return async (dispatch: Dispatch): Promise<void> => {
		dispatch(googlePlaceDetailsRequest());

		try {
			const apiRes: GooglePlaceDetailsResult = await ExternalApi.GooglePlaceDetails(placeId);

			console.log(apiRes);

			if (apiRes.status === 'OK' && apiRes.result) dispatch(googlePlaceDetailsSuccess(apiRes.result, locationType));
			else dispatch(googlePlaceDetailsFailure());
		} catch (err) {
			console.log(err);
			dispatch(googlePlaceDetailsFailure());
			toastr.error(err.message);
		}
	};
};

export const createJourney = (journey: CreateJourney): (dispatch: Dispatch) => Promise<boolean> => {
	return async (dispatch: Dispatch): Promise<boolean> => {
		dispatch(createJourneyRequest());

		const uId: string = await userId() as string;

		try {
			const apiRes: CreateJourneyResult = await HttpAPI.createJourney({ journey, userId: uId });

			console.log(apiRes);

			if (apiRes.success) {
				dispatch(createJourneySuccess());
				toastr.success('Journey Successfully Created');
				return true;
			}

			dispatch(createJourneyFailure());
			toastr.error('An error occurred when creating journey');
			return false;
		} catch (err) {
			console.log(err);
			dispatch(createJourneyFailure());
			toastr.error(err.message);
			return false;
		}
	};
};

const dropMarkerOnMap = (coords: Coords, locationType: string): AppActions => ({ type: CREATE_JOURNEY_DROP_MARKER, coords, locationType });

const findNearbyPlaceRequest = (): AppActions => ({ type: FIND_NEARBY_PLACE_REQUEST });

const findNearbyPlaceSuccess = (place: GooglePlaceDetails, locationType: string):
	AppActions => ({ type: FIND_NEARBY_PLACE_SUCCESS, place, locationType });

const findNearbyPlaceFailure = (): AppActions => ({ type: FIND_NEARBY_PLACE_FAILURE });

export const getPlaceByMarker = (coords: Coords, locationType: string): (dispatch: Dispatch) => Promise<void> => {
	return async (dispatch: Dispatch): Promise<void> => {
		dispatch(dropMarkerOnMap(coords, locationType));
		dispatch(findNearbyPlaceRequest());

		try {
			const nearbyPlaces: GoogleNearbyPlaceResult = await ExternalApi.GoogleNearbyPlaces(coords);

			console.log(nearbyPlaces);

			if (nearbyPlaces.results.length) {
				dispatch(findNearbyPlaceSuccess(nearbyPlaces.results[0], locationType)); // Temporarily set the first place
			} else {
				dispatch(findNearbyPlaceFailure());
				toastr.error('Unable to find nearby place');
			}
		} catch (err) {
			console.log(err);
			dispatch(findNearbyPlaceFailure());
			toastr.error(err.message || 'Unable to find nearby place');
		}
	};
};
