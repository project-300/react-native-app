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
	CREATE_JOURNEY_FAILURE
} from '../../../constants/redux-actions';
import { NewJourneyState } from '../../../types/redux-reducer-state-types';
import {
	GooglePlacesDetailsSuccess,
	GooglePlacesSearchActionTypes,
	GooglePlacesSearchSuccess, SelectGooglePlace
} from '../../../types/redux-action-types';

const initialState: NewJourneyState = {
	places: [],
	originPlace: null,
	originPlaceDetails: null,
	destinationPlace: null,
	destinationPlaceDetails: null,
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

			if (payload.locationType === 'ORIGIN') return { ...state, originPlaceDetails: payload.placeDetails };
			if (payload.locationType === 'DESTINATION') return { ...state, destinationPlaceDetails: payload.placeDetails };

			return { ...state };
		case GOOGLE_PLACES_DETAILS_FAILURE:
			return { ...state };
		case CREATE_JOURNEY_REQUEST:
			return { ...state };
		case CREATE_JOURNEY_SUCCESS:
			return { ...state };
		case CREATE_JOURNEY_FAILURE:
			return { ...state };
		default:
			return state;
	}
};

export default newJourneyReducer;
