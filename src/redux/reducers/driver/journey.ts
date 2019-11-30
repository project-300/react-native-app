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
import { JourneyMapState } from '../../../types/redux-reducer-state-types';
import {
	EndJourneySuccess,
	JourneyDetailsSuccess,
	JourneyMapActionTypes,
	StartJourneySuccess
} from '../../../types/redux-action-types';

const initialState: JourneyMapState = {
	status: 'NOT_STARTED',
	isStarting: false,
	isEnding: false,
	isRequestingJourneyDetails: false,
	journey: undefined
};

const journeyDetailsReducer = (state: JourneyMapState = initialState, action: JourneyMapActionTypes): JourneyMapState => {
	let payload;

	switch (action.type) {
		case JOURNEY_DETAILS_REQUEST:
			return { ...state, isRequestingJourneyDetails: true };
		case JOURNEY_DETAILS_SUCCESS:
			payload = action as JourneyDetailsSuccess;

			return { ...state, isRequestingJourneyDetails: false, journey: payload.journey };
		case JOURNEY_DETAILS_FAILURE:
			return { ...state, isRequestingJourneyDetails: false };
		case START_JOURNEY_REQUEST:
			return { ...state, isStarting: true };
		case START_JOURNEY_SUCCESS:
			payload = action as StartJourneySuccess;

			return { ...state, isStarting: false, journey: payload.journey };
		case START_JOURNEY_FAILURE:
			return { ...state, isStarting: false };
		case END_JOURNEY_REQUEST:
			return { ...state, isEnding: true };
		case END_JOURNEY_SUCCESS:
			payload = action as EndJourneySuccess;

			return { ...state, isEnding: false, journey: payload.journey };
		case END_JOURNEY_FAILURE:
			return { ...state, isEnding: false };
		default:
			return state;
	}
};

export default journeyDetailsReducer;
