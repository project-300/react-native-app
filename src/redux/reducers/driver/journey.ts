import { JOURNEY_DETAILS_REQUEST, JOURNEY_DETAILS_SUCCESS, JOURNEY_DETAILS_FAILURE } from '../../../constants/redux-actions';
import { JourneyDetailsState } from '../../../types/redux-reducer-state-types';
import { JourneyDetailsActionTypes } from '../../../types/redux-action-types';

const initialState: JourneyDetailsState = {
	isRequesting: false,
	journey: undefined
};

const journeyDetailsReducer = (state: JourneyDetailsState = initialState, action: JourneyDetailsActionTypes): JourneyDetailsState => {
	switch (action.type) {
		case JOURNEY_DETAILS_REQUEST:
			return { ...state, isRequesting: true };
		case JOURNEY_DETAILS_SUCCESS:
			return { ...state, isRequesting: false, journey: action.journey };
		case JOURNEY_DETAILS_FAILURE:
			return { ...state, isRequesting: false };
		default:
			return state;
	}
};

export default journeyDetailsReducer;
