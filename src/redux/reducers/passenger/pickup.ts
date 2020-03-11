import {
	PASSENGER_CONFIRM_PICKUP_REQUEST,
	PASSENGER_CONFIRM_PICKUP_SUCCESS,
	PASSENGER_CONFIRM_PICKUP_FAILURE,
	PASSENGER_CANCEL_PICKUP_REQUEST,
	PASSENGER_CANCEL_PICKUP_SUCCESS,
	PASSENGER_CANCEL_PICKUP_FAILURE,
	PASSENGER_CONFIRM_PICKUP_ALERT,
	RESET_PICKUP_ALERTS
} from '../../../constants/redux-actions';
import { PassengerConfirmPickupState } from '../../../types/redux-reducer-state-types';
import {
	PassengerJourneyDetailsActionTypes, PassengerConfirmPickupSuccess, PassengerCancelPickupSuccess, PassengerPickupConfirmationAlert
} from '../../../types/redux-action-types';
import { Journey } from '@project-300/common-types';

const initialState: PassengerConfirmPickupState = {
	isConfirming: false,
	journey: undefined,
	passengerConfirmPickupAlert: false
};

const passengerConfirmPickupReducer = (state: PassengerConfirmPickupState = initialState, action: PassengerJourneyDetailsActionTypes):
	PassengerConfirmPickupState => {
	let payload;
	let journey: Journey;

	switch (action.type) {
		case PASSENGER_CONFIRM_PICKUP_REQUEST:
			return { ...state, isConfirming: true };
		case PASSENGER_CONFIRM_PICKUP_SUCCESS:
			payload = action as PassengerConfirmPickupSuccess;
			journey = payload.journey;

			return { ...state, isConfirming: false, journey };
		case PASSENGER_CONFIRM_PICKUP_FAILURE:
			return { ...state, isConfirming: false };
		case PASSENGER_CANCEL_PICKUP_REQUEST:
			return { ...state, isConfirming: true };
		case PASSENGER_CANCEL_PICKUP_SUCCESS:
			payload = action as PassengerCancelPickupSuccess;
			journey = payload.journey;

			return { ...state, isConfirming: false, journey };
		case PASSENGER_CANCEL_PICKUP_FAILURE:
			return { ...state, isConfirming: false };
		case PASSENGER_CONFIRM_PICKUP_ALERT:
			const confirmationData: PassengerPickupConfirmationAlert = action as PassengerPickupConfirmationAlert;

			return { ...state, passengerConfirmPickupAlert: true };
		case RESET_PICKUP_ALERTS:
			return { ...state, passengerConfirmPickupAlert: false };
		default:
			return state;
	}
};

export default passengerConfirmPickupReducer;
