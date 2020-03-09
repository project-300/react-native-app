import {
	CURRENT_JOURNEY_SUB_RECEIVED,
	CURRENT_JOURNEY, RESET_CURRENT_JOURNEY_UPDATED_FLAG
} from '../../constants/redux-actions';
import { HeaderBarState } from '../../types/redux-reducer-state-types';
import { CurrentJourneySubReceived, HeaderBarActionTypes } from '../../types/redux-action-types';

const initialState: HeaderBarState = {
	currentJourney: undefined,
	travellingAs: 'Passenger',
	hasUpdated: false
};

const headerBarReducer = (state: HeaderBarState = initialState, action: HeaderBarActionTypes): HeaderBarState => {
	switch (action.type) {
		case RESET_CURRENT_JOURNEY_UPDATED_FLAG:
			return { ...state, hasUpdated: false };
		case CURRENT_JOURNEY:
			return { ...state, currentJourney: action.journey, travellingAs: action.travellingAs, hasUpdated: !action.onAppLoad };
		case CURRENT_JOURNEY_SUB_RECEIVED:
			const subData: CurrentJourneySubReceived = action as CurrentJourneySubReceived;
			return { ...state, currentJourney: subData.payload.data.journey, hasUpdated: subData.userId !== subData.payload.data.updatedBy };
			// return { ...state };
		default:
			return state;
	}
};

export default headerBarReducer;
