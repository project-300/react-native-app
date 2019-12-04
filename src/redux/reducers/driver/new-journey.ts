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
import { NewJourneyState } from '../../../types/redux-reducer-state-types';
import {
	CreateJourneyDropMarker, FindNearbyPlaceSuccess,
	GooglePlacesDetailsSuccess,
	GooglePlacesSearchActionTypes,
	GooglePlacesSearchSuccess, SelectGooglePlace
} from '../../../types/redux-action-types';
import { Coords, GooglePlaceDetails, Place } from '@project-300/common-types';

const initialState: NewJourneyState = {
	places: [],
	originPlace: null,
	originPlaceDetails: undefined,
	destinationPlace: null,
	destinationPlaceDetails: undefined,
	destinationMarkerCoords: null,
	originMarkerCoords: null
};

const newJourneyReducer = (state: NewJourneyState = initialState, action: GooglePlacesSearchActionTypes): NewJourneyState => {
	let payload;

	switch (action.type) {
		case GOOGLE_PLACES_SEARCH_REQUEST:
			return { ...state };
		case GOOGLE_PLACES_SEARCH_SUCCESS:
			payload = action as GooglePlacesSearchSuccess;

			return { ...state, places: payload.places };
		case GOOGLE_PLACES_SEARCH_FAILURE:
			return { ...state };
		case GOOGLE_PLACES_SEARCH_CLEAR_RESULTS:
			return { ...state, places: [] };
		case SELECT_GOOGLE_PLACE:
			payload = action as SelectGooglePlace;

			if (payload.locationType === 'ORIGIN') return { ...state, originPlace: payload.place };
			if (payload.locationType === 'DESTINATION') return { ...state, destinationPlace: payload.place };

			return { ...state, places: [] };
		case GOOGLE_PLACES_DETAILS_REQUEST:
			return { ...state };
		case GOOGLE_PLACES_DETAILS_SUCCESS:
			payload = action as GooglePlacesDetailsSuccess;

			const placeDetails: GooglePlaceDetails = payload.placeDetails;
			const coordinates: Coords = { latitude: placeDetails.geometry.location.lat, longitude: placeDetails.geometry.location.lng };

			if (payload.locationType === 'ORIGIN') return { ...state, originPlaceDetails: placeDetails, originMarkerCoords: coordinates };
			if (payload.locationType === 'DESTINATION') return { ...state, destinationPlaceDetails: placeDetails, destinationMarkerCoords: coordinates };

			return { ...state };
		case GOOGLE_PLACES_DETAILS_FAILURE:
			return { ...state };
		case CREATE_JOURNEY_REQUEST:
			return { ...state };
		case CREATE_JOURNEY_SUCCESS:
			return { ...state };
		case CREATE_JOURNEY_FAILURE:
			return { ...state };
		case CLEAR_NEW_JOURNEY_FORM_DETAILS:
			return { ...state, ...initialState };
		case CREATE_JOURNEY_DROP_MARKER:
			payload = action as CreateJourneyDropMarker;

			const { coords, locationType } = payload;

			if (locationType === 'ORIGIN') return { ...state, originMarkerCoords: coords };
			if (locationType === 'DESTINATION') return { ...state, destinationMarkerCoords: coords };

			return { ...state};
		case FIND_NEARBY_PLACE_REQUEST:
			return { ...state };
		case FIND_NEARBY_PLACE_SUCCESS:
			payload = action as FindNearbyPlaceSuccess;

			const place: GooglePlaceDetails = payload.place;
			const c: Coords = { latitude: place.geometry.location.lat, longitude: place.geometry.location.lng };

			if (payload.locationType === 'ORIGIN') return { ...state, originPlaceDetails: place, originMarkerCoords: c };
			if (payload.locationType === 'DESTINATION') return { ...state, destinationPlaceDetails: place, destinationMarkerCoords: c};

			return { ...state };
		case FIND_NEARBY_PLACE_FAILURE:
			return { ...state };
		default:
			return state;
	}
};

export default newJourneyReducer;
