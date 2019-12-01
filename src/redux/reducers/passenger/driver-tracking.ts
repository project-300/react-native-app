import {
	PASSENGER_JOURNEY_DETAILS_REQUEST,
	PASSENGER_JOURNEY_DETAILS_SUCCESS,
	PASSENGER_JOURNEY_DETAILS_FAILURE,
	UPDATE_DRIVER_LOCATION
} from '../../../constants/redux-actions';
import { DriverTrackingState } from '../../../types/redux-reducer-state-types';
import {
	PassengerJourneyDetailsSuccess,
	PassengerJourneyDetailsActionTypes
} from '../../../types/redux-action-types';
import { Journey, SubscriptionPayload } from '@project-300/common-types';

const initialState: DriverTrackingState = {
	isRequesting: false,
	isComplete: false,
	journey: undefined
};

const driverTrackingReducer = (state: DriverTrackingState = initialState, action: PassengerJourneyDetailsActionTypes):
	DriverTrackingState => {
	let payload;

	switch (action.type) {
		case PASSENGER_JOURNEY_DETAILS_REQUEST:
			return { ...state, isRequesting: true };
		case PASSENGER_JOURNEY_DETAILS_SUCCESS:
			payload = action as PassengerJourneyDetailsSuccess;
			const journey: Journey = payload.journey;
			const driverLocation = journey.driver.lastLocation;

			return { ...state, isRequesting: false, journey, driverLocation };
		case PASSENGER_JOURNEY_DETAILS_FAILURE:
			return { ...state, isRequesting: false };
		case UPDATE_DRIVER_LOCATION:
			payload = action.payload as SubscriptionPayload;

			return { ...state, driverLocation: payload.data.location };
		default:
			return state;
	}
};

export default driverTrackingReducer;
