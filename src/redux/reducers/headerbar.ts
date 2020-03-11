import {
	CURRENT_JOURNEY_SUB_RECEIVED,
	CURRENT_JOURNEY,
	RESET_CURRENT_JOURNEY_UPDATED_FLAG, CLEAR_CURRENT_JOURNEY
} from '../../constants/redux-actions';
import { CurrentJourneyState } from '../../types/redux-reducer-state-types';
import {
	CurrentJourneySubReceived,
	HeaderBarActionTypes,
	SetCurrentJourney
} from '../../types/redux-action-types';
import { Journey, JourneyRating } from '@project-300/common-types';

const initialState: CurrentJourneyState = {
	currentJourney: undefined,
	travellingAs: 'Passenger',
	hasUpdated: false,
	awaitingConfirmation: false
};

const currentJourneyReducer = (state: CurrentJourneyState = initialState, action: HeaderBarActionTypes): CurrentJourneyState => {
	switch (action.type) {
		case RESET_CURRENT_JOURNEY_UPDATED_FLAG:
			return { ...state, hasUpdated: false };
		case CURRENT_JOURNEY:
			const currentData: SetCurrentJourney = action as SetCurrentJourney;
			return { ...state, currentJourney: currentData.journey, travellingAs: currentData.travellingAs, hasUpdated: !currentData.onAppLoad, awaitingConfirmation: currentData.awaitingConfirmation };
		case CLEAR_CURRENT_JOURNEY:
			console.log('CLEAR JOURNEY');
			return { ...state, currentJourney: undefined, travellingAs: 'Passenger', hasUpdated: false, awaitingConfirmation: false };
		case CURRENT_JOURNEY_SUB_RECEIVED:
			const subData: CurrentJourneySubReceived = action as CurrentJourneySubReceived;
			console.log(subData);
			const journey: Journey = subData.payload.data.journey;
			const hasUpdated: boolean = state.hasUpdated || (subData.userId !== subData.payload.data.updatedBy) && (journey.journeyStatus !== state.currentJourney.journeyStatus);
			if (journey.journeyStatus === 'FINISHED' && state.travellingAs === 'Driver') return { ...state, currentJourney: undefined, travellingAs: 'Passenger', hasUpdated: false }
			if (journey.journeyStatus === 'FINISHED' && state.travellingAs === 'Passenger' &&
				journey.ratings && journey.ratings.find((rating: JourneyRating) => rating.passenger.userId === subData.userId))
				return { ...state, currentJourney: undefined, travellingAs: 'Passenger', hasUpdated: false };

			return { ...state, currentJourney: journey, hasUpdated, travellingAs: subData.payload.data.travellingAs || state.travellingAs };
		default:
			return state;
	}
};

export default currentJourneyReducer;
