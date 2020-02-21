import {
	UPDATE_ADD_USER_JOURNEY_SUCCESS,
	UPDATE_ADD_USER_JOURNEY_REQUEST,
	UPDATE_ADD_USER_JOURNEY_FAILURE,
	GET_VIEW_JOURNEY_REQUEST,
	GET_VIEW_JOURNEY_SUCCESS,
	GET_VIEW_JOURNEY_FAILURE,
	CANCEL_LIFT_ACCEPTANCE_REQUEST,
	CANCEL_LIFT_ACCEPTANCE_SUCCESS,
	CANCEL_LIFT_ACCEPTANCE_FAILURE, CLEAR_VIEW_JOURNEY_INFO
} from '../../../constants/redux-actions';
import { ViewJourneyState } from '../../../types/redux-reducer-state-types';
import { ViewJourneyActionTypes } from '../../../types/redux-action-types';

const initialState: ViewJourneyState = {
	isUpdating: false,
	isReloading: false,
	journey: undefined
};

const viewJourneyReducer = (state: ViewJourneyState = initialState, action: ViewJourneyActionTypes): ViewJourneyState => {
	switch (action.type) {
		case GET_VIEW_JOURNEY_REQUEST:
			return { ...state, isUpdating: true };
		case GET_VIEW_JOURNEY_SUCCESS:
			return { ...state, isUpdating: false, journey: action.journey };
		case GET_VIEW_JOURNEY_FAILURE:
			return { ...state, isUpdating: false };
		case UPDATE_ADD_USER_JOURNEY_REQUEST:
			return { ...state, isUpdating: true };
		case UPDATE_ADD_USER_JOURNEY_SUCCESS:
			return { ...state, isUpdating: false, journey: action.journey };
		case UPDATE_ADD_USER_JOURNEY_FAILURE:
			return { ...state, isUpdating: false };
		case CANCEL_LIFT_ACCEPTANCE_REQUEST:
			return { ...state, isUpdating: true };
		case CANCEL_LIFT_ACCEPTANCE_SUCCESS:
			return { ...state, isUpdating: false, journey: action.journey };
		case CANCEL_LIFT_ACCEPTANCE_FAILURE:
			return { ...state, isUpdating: false };
		case CLEAR_VIEW_JOURNEY_INFO:
			console.log('clearing');
			return { ...state, journey: undefined };
		default:
			return state;
	}
};

export default viewJourneyReducer;
