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

			// if (payload.data.ended) return { ...state, ended: payload.data.ended };

			const routeTravelled = [ ...state.routeTravelled ];
			routeTravelled.push(payload.data.coords);

			const length: number = routeTravelled.length;

			const start: Coords = routeTravelled[length - 2];
			const end: Coords = routeTravelled[length - 1];

			let direction: number = 0;
			direction = length >= 2 ? MapUtils.direction(start.latitude, start.longitude, end.latitude, end.longitude) : direction;

			return { ...state, driverLocation: payload.data.coords, direction, routeTravelled, isWaitingOnDriverCoords: false, ended: false };
		default:
			return state;
	}
};

export default driverTrackingReducer;
