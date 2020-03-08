import {
	PASSENGER_PICKUP_JOURNEY_REQUEST,
	PASSENGER_PICKUP_JOURNEY_SUCCESS,
	PASSENGER_PICKUP_JOURNEY_FAILURE,
	DRIVER_CONFIRM_PASSENGER_PICKUP_REQUEST,
	DRIVER_CONFIRM_PASSENGER_PICKUP_SUCCESS,
	DRIVER_CONFIRM_PASSENGER_PICKUP_FAILURE,
	DRIVER_CANCEL_PASSENGER_PICKUP_REQUEST,
	DRIVER_CANCEL_PASSENGER_PICKUP_FAILURE,
	DRIVER_CANCEL_PASSENGER_PICKUP_SUCCESS
} from '../../../constants/redux-actions';
import { Dispatch } from 'redux';
import toastr from '../../../helpers/toastr';
import { AppActions } from '../../../types/redux-action-types';
import { Journey } from '@project-300/common-types';
import { JourneyService } from '../../../services/journey';

const passengerPickupJourneyRequest = (): AppActions => ({ type: PASSENGER_PICKUP_JOURNEY_REQUEST });

const passengerPickupJourneySuccess = (journey: Journey): AppActions => ({ type: PASSENGER_PICKUP_JOURNEY_SUCCESS, journey });

const passengerPickupJourneyFailure = (): AppActions => ({ type: PASSENGER_PICKUP_JOURNEY_FAILURE });

const driverConfirmPassengerPickupRequest = (passengerId: string): AppActions => ({ type: DRIVER_CONFIRM_PASSENGER_PICKUP_REQUEST, passengerId });

const driverConfirmPassengerPickupSuccess = (journey: Journey): AppActions => ({ type: DRIVER_CONFIRM_PASSENGER_PICKUP_SUCCESS, journey });

const driverConfirmPassengerPickupFailure = (): AppActions => ({ type: DRIVER_CONFIRM_PASSENGER_PICKUP_FAILURE });

const driverCancelPassengerPickupRequest = (passengerId: string): AppActions => ({ type: DRIVER_CANCEL_PASSENGER_PICKUP_REQUEST, passengerId });

const driverCancelPassengerPickupSuccess = (journey: Journey): AppActions => ({ type: DRIVER_CANCEL_PASSENGER_PICKUP_SUCCESS, journey });

const driverCancelPassengerPickupFailure = (): AppActions => ({ type: DRIVER_CANCEL_PASSENGER_PICKUP_FAILURE });

export const getPassengerPickupJourney = (journeyId: string, createdAt: string): (dispatch: Dispatch) => Promise<void> => {
	return async (dispatch: Dispatch): Promise<void> => {
		dispatch(passengerPickupJourneyRequest());

		try {
			const result: { success: boolean; journey: Journey } =
				await JourneyService.getJourneyById(journeyId, createdAt);

			console.log(result);

			if (result.success && result.journey) dispatch(passengerPickupJourneySuccess(result.journey));
			else dispatch(passengerPickupJourneyFailure());
		} catch (err) {
			console.log(err);
			dispatch(passengerPickupJourneyFailure());
			toastr.error(err.message);
		}
	};
};

export const driverConfirmPassengerPickup = (journeyId: string, createdAt: string, passengerId: string): (dispatch: Dispatch) => Promise<boolean> => {
	return async (dispatch: Dispatch): Promise<boolean> => {
		dispatch(driverConfirmPassengerPickupRequest(passengerId));

		try {
			const result: { success: boolean; journey: Journey } =
				await JourneyService.driverConfirmPassengerPickup(journeyId, createdAt, passengerId);

			console.log(result);

			if (result.success && result.journey) {
				dispatch(driverConfirmPassengerPickupSuccess(result.journey));
				return true;
			}

			dispatch(driverConfirmPassengerPickupFailure());
			return false;
		} catch (err) {
			console.log(err);
			dispatch(driverConfirmPassengerPickupFailure());
			toastr.error(err.message);
			return false;
		}
	};
};

export const driverCancelPassengerPickup = (journeyId: string, createdAt: string, passengerId: string): (dispatch: Dispatch) => Promise<boolean> => {
	return async (dispatch: Dispatch): Promise<boolean> => {
		dispatch(driverCancelPassengerPickupRequest(passengerId));

		try {
			const result: { success: boolean; journey: Journey } =
				await JourneyService.driverCancelPassengerPickup(journeyId, createdAt, passengerId);

			console.log(result);

			if (result.success && result.journey) {
				dispatch(driverCancelPassengerPickupSuccess(result.journey));
				return true;
			}

			dispatch(driverCancelPassengerPickupFailure());
			return false;
		} catch (err) {
			console.log(err);
			dispatch(driverCancelPassengerPickupFailure());
			toastr.error(err.message);
			return false;
		}
	};
};
