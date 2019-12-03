import {
	GOOGLE_PLACES_SEARCH_REQUEST,
	GOOGLE_PLACES_SEARCH_SUCCESS,
	GOOGLE_PLACES_SEARCH_FAILURE
} from '../../../constants/redux-actions';
import { NewJourneyState } from '../../../types/redux-reducer-state-types';
import {
	GooglePlacesSearchActionTypes,
	GooglePlacesSearchSuccess
} from '../../../types/redux-action-types';

const initialState: NewJourneyState = {
	places: []
};

const newJourneyReducer = (state: NewJourneyState = initialState, action: GooglePlacesSearchActionTypes): NewJourneyState => {
	let payload;

	switch (action.type) {
		case GOOGLE_PLACES_SEARCH_REQUEST:
			return { ...state };
		case GOOGLE_PLACES_SEARCH_SUCCESS:
			payload = action as GooglePlacesSearchSuccess;

			console.log(payload);

			return { ...state, places: payload.places };
		case GOOGLE_PLACES_SEARCH_FAILURE:
			return { ...state };
		default:
			return state;
	}
};

export default newJourneyReducer;
