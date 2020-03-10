import {
	PASSENGER_JOURNEY_RATING_REQUEST,
	PASSENGER_JOURNEY_RATING_SUCCESS,
	PASSENGER_JOURNEY_RATING_FAILURE
} from '../../../constants/redux-actions';
import { PassengerJourneyRatingState } from '../../../types/redux-reducer-state-types';
import {
	PassengerJourneyRatingActionsTypes
} from '../../../types/redux-action-types';

const initialState: PassengerJourneyRatingState = {
	isRating: false
};

const passengerJourneyRatingReducer = (state: PassengerJourneyRatingState = initialState, action: PassengerJourneyRatingActionsTypes):
	PassengerJourneyRatingState => {

	switch (action.type) {
		case PASSENGER_JOURNEY_RATING_REQUEST:
			return { ...state, isRating: true };
		case PASSENGER_JOURNEY_RATING_SUCCESS:
			return { ...state, isRating: false };
		case PASSENGER_JOURNEY_RATING_FAILURE:
			return { ...state, isRating: false };
		default:
			return state;
	}
};

export default passengerJourneyRatingReducer;
