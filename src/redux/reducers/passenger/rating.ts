import {
	PASSENGER_JOURNEY_RATING_REQUEST,
	PASSENGER_JOURNEY_RATING_SUCCESS,
	PASSENGER_JOURNEY_RATING_FAILURE,
	PASSENGER_REQUEST_RATING,
	PASSENGER_STOP_RATING
} from '../../../constants/redux-actions';
import { PassengerJourneyRatingState } from '../../../types/redux-reducer-state-types';
import {
	PassengerJourneyRatingActionsTypes
} from '../../../types/redux-action-types';

const initialState: PassengerJourneyRatingState = {
	isRating: false,
	requestRating: false
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
		case PASSENGER_REQUEST_RATING:
			return { ...state, requestRating: true };
		case PASSENGER_STOP_RATING:
			return { ...state, requestRating: false };
		default:
			return state;
	}
};

export default passengerJourneyRatingReducer;
