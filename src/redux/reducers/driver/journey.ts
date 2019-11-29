import {
	JOURNEY_DETAILS_REQUEST,
	JOURNEY_DETAILS_SUCCESS,
	JOURNEY_DETAILS_FAILURE,
	START_JOURNEY_REQUEST,
	START_JOURNEY_SUCCESS,
	START_JOURNEY_FAILURE,
	END_JOURNEY_REQUEST,
	END_JOURNEY_SUCCESS,
	END_JOURNEY_FAILURE
} from '../../../constants/redux-actions';
import { JourneyDetailsState } from '../../../types/redux-reducer-state-types';
import { JourneyDetailsActionTypes } from '../../../types/redux-action-types';

const initialState: JourneyDetailsState = {
	status: 'NOT_STARTED',
	isStarting: false,
	isEnding: false,
	isRequestingJourneyDetails: false,
	journey: undefined
};

const journeyDetailsReducer = (state: JourneyDetailsState = initialState, action: JourneyDetailsActionTypes): JourneyDetailsState => {
	switch (action.type) {
		case JOURNEY_DETAILS_REQUEST:
			return { ...state, isRequestingJourneyDetails: true };
		case JOURNEY_DETAILS_SUCCESS:
			return { ...state, isRequestingJourneyDetails: false, journey: action.journey };
		case JOURNEY_DETAILS_FAILURE:
			return { ...state, isRequestingJourneyDetails: false };
		case START_JOURNEY_REQUEST:
			return { ...state, isStarting: true };
		case START_JOURNEY_SUCCESS:
			return { ...state, isStarting: false, status: 'STARTED' };
		case START_JOURNEY_FAILURE:
			return { ...state, isStarting: false };
		case END_JOURNEY_REQUEST:
			return { ...state, isEnding: false };
		case END_JOURNEY_SUCCESS:
			return { ...state, isEnding: false, status: 'FINISHED' };
		case END_JOURNEY_FAILURE:
			return { ...state, isEnding: false };
		default:
			return state;
	}
};

export default journeyDetailsReducer;
