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
import { Coords, Journey, SubscriptionPayload } from '@project-300/common-types';
import MapUtils from '../../../services/map-utils';

const initialState: DriverTrackingState = {
	isRequesting: false,
	isComplete: false,
	isWaitingOnDriverCoords: true,
	journey: undefined,
	routeTravelled: [],
	direction: 0,
	driverLocation: undefined,
	ended: false
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

			return { ...state, isRequesting: false, journey, driverLocation, routeTravelled: journey.routeTravelled };
		case PASSENGER_JOURNEY_DETAILS_FAILURE:
			return { ...state, isRequesting: false };
		case UPDATE_DRIVER_LOCATION:
			payload = action.payload as SubscriptionPayload;

			if (payload.data.ended) return { ...state, ended: payload.data.ended };

			const routeTravelled = state.routeTravelled.concat(payload.data.location);

			// const mapCenter = state.driverLocation ?
			// 	MapUtils.calculateMapCenter(state.driverLocation, state.passengerLocation) :
			// 	driverLocation;

			const length: number = state.routeTravelled.length;
			const start: Coords = state.routeTravelled[length - 2];
			const end: Coords = state.routeTravelled[length - 1];

			const direction: number = MapUtils.direction(start.latitude, start.longitude, end.latitude, end.longitude);

			return { ...state, driverLocation: payload.data.location, routeTravelled, direction, isWaitingOnDriverCoords: false, ended: (payload.data.ended || false) };
		default:
			return state;
	}
};

export default driverTrackingReducer;
