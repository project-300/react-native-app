import {
	GET_ALL_JOURNEYS_REQUEST,
	GET_ALL_JOURNEYS_SUCCESS,
	GET_ALL_JOURNEYS_FAILURE,
	CLEAR_ALL_JOURNEYS,
	SEARCH_JOURNEYS_REQUEST,
	SEARCH_JOURNEYS_SUCCESS,
	SEARCH_JOURNEYS_FAILURE
} from '../../constants/redux-actions';
import { AllJourneysListState } from '../../types/redux-reducer-state-types';
import {
	JourneyActionTypes,
	GetAllJourneysSuccess
} from '../../types/redux-action-types';
import { Journey } from '@project-300/common-types';

const initialState: AllJourneysListState = {
	isFullList: false,
	isFetching: false,
	isSearching: false,
	showingSearchResults: false,
	journeys: []
};

const allJourneysReducer = (state: AllJourneysListState = initialState, action: JourneyActionTypes): AllJourneysListState => {
	let payload;
	let journeys: Journey[];

	switch (action.type) {
		case GET_ALL_JOURNEYS_REQUEST:
			return { ...state, isFetching: true, showingSearchResults: false };
		case GET_ALL_JOURNEYS_SUCCESS:
			payload = action as GetAllJourneysSuccess;

			journeys = payload.isFirstCall ? payload.journeys : sortJourneys(state.journeys, payload.journeys);

			return { ...state, journeys, lastEvaluatedKey: payload.lastEvaluatedKey, isFetching: false, isFullList: !payload.lastEvaluatedKey, showingSearchResults: false };
		case GET_ALL_JOURNEYS_FAILURE:
			return { ...state, isFetching: false, showingSearchResults: false };
		case SEARCH_JOURNEYS_REQUEST:
			return { ...state, isFetching: true, isSearching: true, showingSearchResults: false };
		case SEARCH_JOURNEYS_SUCCESS:
			payload = action as GetAllJourneysSuccess;

			journeys = payload.isFirstCall ? payload.journeys : sortJourneys(state.journeys, payload.journeys);

			return { ...state, journeys, lastEvaluatedKey: payload.lastEvaluatedKey, isFetching: false, isSearching: false, showingSearchResults: true, isFullList: !payload.lastEvaluatedKey };
		case SEARCH_JOURNEYS_FAILURE:
			return { ...state, isFetching: false, isSearching: false, showingSearchResults: false };
		case CLEAR_ALL_JOURNEYS:
			return { ...state, journeys: [], lastEvaluatedKey: undefined, isFetching: false, isFullList: false };
		default:
			return state;
	}
};

const sortJourneys = (oldJourneys: Journey[], newJourneys: Journey[]): Journey[] => {
	return oldJourneys.concat(newJourneys);
}

export default allJourneysReducer;
