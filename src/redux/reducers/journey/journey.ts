import {
	CANCEL_JOURNEY_REQUEST,
	CANCEL_JOURNEY_SUCCESS,
	CANCEL_JOURNEY_FAILURE
} from '../../../constants/redux-actions';
import { GeneralJourneyActionsState } from '../../../types/redux-reducer-state-types';
import {
	GeneralJourneyActionTypes,
	CancelJourneySuccess
} from '../../../types/redux-action-types';

const initialState: GeneralJourneyActionsState = {
	isCancellingJourney: false
};

const generalJourneyActionsReducer = (state: GeneralJourneyActionsState = initialState, action: GeneralJourneyActionTypes): GeneralJourneyActionsState => {
	let payload;

	switch (action.type) {
		case CANCEL_JOURNEY_REQUEST:
			return { ...state, isCancellingJourney: true };
		case CANCEL_JOURNEY_SUCCESS:
			payload = action as CancelJourneySuccess;

			return { ...state, isCancellingJourney: false, journey: payload.journey };
		case CANCEL_JOURNEY_FAILURE:
			return { ...state, isCancellingJourney: false };
		default:
			return state;
	}
};

export default generalJourneyActionsReducer;
