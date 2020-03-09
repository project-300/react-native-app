import {
	PASSENGER_PICKUP_JOURNEY_REQUEST,
	PASSENGER_PICKUP_JOURNEY_SUCCESS,
	PASSENGER_PICKUP_JOURNEY_FAILURE,
	DRIVER_CONFIRM_PASSENGER_PICKUP_REQUEST,
	DRIVER_CONFIRM_PASSENGER_PICKUP_SUCCESS,
	DRIVER_CONFIRM_PASSENGER_PICKUP_FAILURE,
	DRIVER_CANCEL_PASSENGER_PICKUP_REQUEST,
	DRIVER_CANCEL_PASSENGER_PICKUP_SUCCESS,
	DRIVER_CANCEL_PASSENGER_PICKUP_FAILURE, BEGIN_PICKUP_REQUEST, BEGIN_PICKUP_SUCCESS, BEGIN_PICKUP_FAILURE
} from '../../../constants/redux-actions';
import { PassengerPickupState } from '../../../types/redux-reducer-state-types';
import {
	BeginPickupSuccess,
	PassengerPickupActionTypes, PassengerPickupConfirmRequest,
	PassengerPickupConfirmSuccess,
	PassengerPickupJourneySuccess
} from '../../../types/redux-action-types';
import _ from 'lodash';
import { PassengerBrief } from '@project-300/common-types';

const initialState: PassengerPickupState = {
	isRequesting: false,
	isBeginningPickup: false,
	isConfirming: '',
	isCancelling: '',
	journey: undefined,
	pickedUpCount: 0,
	cancelledCount: 0,
	totalCount: 0
};

const passengerPickupReducer = (state: PassengerPickupState = initialState, action: PassengerPickupActionTypes): PassengerPickupState => {
	let payload;
	let counts: { pickedUp: number; cancelled: number; total: number };

	switch (action.type) {
		case PASSENGER_PICKUP_JOURNEY_REQUEST:
			return { ...state, isRequesting: true };
		case PASSENGER_PICKUP_JOURNEY_SUCCESS:
			payload = action as PassengerPickupJourneySuccess;

			counts = passengerCounts(payload.journey.passengers);

			return { ...state, isRequesting: false, journey: payload.journey, pickedUpCount: counts.pickedUp, cancelledCount: counts.cancelled, totalCount: counts.total };
		case PASSENGER_PICKUP_JOURNEY_FAILURE:
			return { ...state, isRequesting: false };
		case BEGIN_PICKUP_REQUEST:
			return { ...state, isBeginningPickup: true };
		case BEGIN_PICKUP_SUCCESS:
			payload = action as BeginPickupSuccess;

			return { ...state, isBeginningPickup: false, journey: payload.journey };
		case BEGIN_PICKUP_FAILURE:
			return { ...state, isBeginningPickup: false };
		case DRIVER_CONFIRM_PASSENGER_PICKUP_REQUEST:
			payload = action as PassengerPickupConfirmRequest;

			return { ...state, isConfirming: payload.passengerId };
		case DRIVER_CONFIRM_PASSENGER_PICKUP_SUCCESS:
			payload = action as PassengerPickupConfirmSuccess;

			counts = passengerCounts(payload.journey.passengers);

			return { ...state, isConfirming: '', journey: payload.journey, pickedUpCount: counts.pickedUp, cancelledCount: counts.cancelled, totalCount: counts.total };
		case DRIVER_CONFIRM_PASSENGER_PICKUP_FAILURE:
			return { ...state, isConfirming: '' };
		case DRIVER_CANCEL_PASSENGER_PICKUP_REQUEST:
			payload = action as PassengerPickupConfirmRequest;

			return { ...state, isCancelling: payload.passengerId };
		case DRIVER_CANCEL_PASSENGER_PICKUP_SUCCESS:
			payload = action as PassengerPickupConfirmSuccess;

			counts = passengerCounts(payload.journey.passengers);

			return { ...state, isCancelling: '', journey: payload.journey, pickedUpCount: counts.pickedUp, cancelledCount: counts.cancelled, totalCount: counts.total };
		case DRIVER_CANCEL_PASSENGER_PICKUP_FAILURE:
			return { ...state, isCancelling: '' };
		default:
			return state;
	}
};

export default passengerPickupReducer;

const passengerCounts = (passengers: PassengerBrief[]): { pickedUp: number; cancelled: number; total: number } => {
	const pickedUp: { [key: string]: number } = _.countBy(passengers, (p: PassengerBrief) => p.driverConfirmedPickup);
	const cancelled: { [key: string]: number } = _.countBy(passengers, (p: PassengerBrief) => p.driverCancelledPickup);
	return { pickedUp: pickedUp.true || 0, cancelled: cancelled.true || 0, total: (pickedUp.true || 0) + (cancelled.true || 0) };
}
