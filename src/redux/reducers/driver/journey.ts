import {
	JOURNEY_DETAILS_REQUEST,
	JOURNEY_DETAILS_SUCCESS,
	JOURNEY_DETAILS_FAILURE,
	START_JOURNEY_REQUEST,
	START_JOURNEY_SUCCESS,
	START_JOURNEY_FAILURE,
	PAUSE_JOURNEY_REQUEST,
	PAUSE_JOURNEY_SUCCESS,
	PAUSE_JOURNEY_FAILURE,
	RESUME_JOURNEY_REQUEST,
	RESUME_JOURNEY_SUCCESS,
	RESUME_JOURNEY_FAILURE,
	END_JOURNEY_REQUEST,
	END_JOURNEY_SUCCESS,
	END_JOURNEY_FAILURE,
	DRIVER_MOVEMENT_REQUEST,
	DRIVER_MOVEMENT_SUCCESS,
	DRIVER_MOVEMENT_FAILURE
} from '../../../constants/redux-actions';
import { JourneyMapState } from '../../../types/redux-reducer-state-types';
import {
	DriverMovementSuccess,
	EndJourneySuccess,
	JourneyDetailsSuccess,
	JourneyMapActionTypes,
	PauseJourneySuccess,
	ResumeJourneySuccess,
	StartJourneySuccess
} from '../../../types/redux-action-types';

const initialState: JourneyMapState = {
	status: 'NOT_STARTED',
	isStarted: false,
	isBeginningPickup: false,
	isStarting: false,
	isPausing: false,
	isResuming: false,
	isEnding: false,
	isMoving: false,
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

			return { ...state, isStarting: false, journey: payload.journey, isStarted: true };
		case START_JOURNEY_FAILURE:
			return { ...state, isStarting: false };
		case PAUSE_JOURNEY_REQUEST:
			return { ...state, isPausing: true };
		case PAUSE_JOURNEY_SUCCESS:
			payload = action as PauseJourneySuccess;

			return { ...state, isPausing: false, journey: payload.journey };
		case PAUSE_JOURNEY_FAILURE:
			return { ...state, isPausing: false };

		case RESUME_JOURNEY_REQUEST:
			return { ...state, isResuming: true };
		case RESUME_JOURNEY_SUCCESS:
			payload = action as ResumeJourneySuccess;

			return { ...state, isResuming: false, journey: payload.journey };
		case RESUME_JOURNEY_FAILURE:
			return { ...state, isResuming: false };

		case END_JOURNEY_REQUEST:
			return { ...state, isEnding: true };
		case END_JOURNEY_SUCCESS:
			payload = action as EndJourneySuccess;

			return { ...state, isEnding: false, journey: payload.journey };
		case END_JOURNEY_FAILURE:
			return { ...state, isEnding: false };
		case DRIVER_MOVEMENT_REQUEST:
			return { ...state, isMoving: true, isStarted: true }; // Remove isStarted from here
		case DRIVER_MOVEMENT_SUCCESS:
			payload = action as DriverMovementSuccess;

			return { ...state, isMoving: false, journey: payload.journey };
		case DRIVER_MOVEMENT_FAILURE:
			return { ...state, isMoving: false };
		default:
			return state;
	}
};

export default journeyDetailsReducer;
