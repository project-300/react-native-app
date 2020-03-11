import { Dispatch } from 'redux';
import { Journey, SubscriptionPayload } from '@project-300/common-types';
import { JourneyService } from '../../../services/journey';
import toastr from '../../../helpers/toastr';
import { AppActions } from '../../../types/redux-action-types';
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

const passengerConfirmPickupRequest = (): AppActions => ({ type: PASSENGER_CONFIRM_PICKUP_REQUEST });

const passengerConfirmPickupSuccess = (journey: Journey): AppActions => ({ type: PASSENGER_CONFIRM_PICKUP_SUCCESS, journey });

const passengerConfirmPickupFailure = (): AppActions => ({ type: PASSENGER_CONFIRM_PICKUP_FAILURE });

const passengerCancelPickupRequest = (): AppActions => ({ type: PASSENGER_CANCEL_PICKUP_REQUEST });

const passengerCancelPickupSuccess = (journey: Journey): AppActions => ({ type: PASSENGER_CANCEL_PICKUP_SUCCESS, journey });

const passengerCancelPickupFailure = (): AppActions => ({ type: PASSENGER_CANCEL_PICKUP_FAILURE });

export const passengerConfirmPickupAlert = (payload: SubscriptionPayload): AppActions => ({ type: PASSENGER_CONFIRM_PICKUP_ALERT, payload });

export const clearPickupAlerts = (): AppActions => ({ type: RESET_PICKUP_ALERTS });

export const passengerConfirmPickup = (journeyId: string, createdAt: string): (dispatch: Dispatch) => Promise<boolean> => {
	return async (dispatch: Dispatch): Promise<boolean> => {
		dispatch(passengerConfirmPickupRequest());

		try {
			const result: { success: boolean; journey: Journey } =
				await JourneyService.passengerConfirmPickup(journeyId, createdAt);

			console.log(result);

			if (result.success && result.journey) {
				dispatch(passengerConfirmPickupSuccess(result.journey));
				return true;
			}

			dispatch(passengerConfirmPickupFailure());
			return false;
		} catch (err) {
			console.log(err);
			dispatch(passengerConfirmPickupFailure());
			toastr.error(err.message);
			return false;
		}
	};
};

export const passengerCancelPickup = (journeyId: string, createdAt: string): (dispatch: Dispatch) => Promise<boolean> => {
	return async (dispatch: Dispatch): Promise<boolean> => {
		dispatch(passengerCancelPickupRequest());

		try {
			const result: { success: boolean; journey: Journey } =
				await JourneyService.passengerCancelPickup(journeyId, createdAt);

			console.log(result);

			if (result.success && result.journey) {
				dispatch(passengerCancelPickupSuccess(result.journey));
				return true;
			}

			dispatch(passengerCancelPickupFailure());
			return false;
		} catch (err) {
			console.log(err);
			dispatch(passengerCancelPickupFailure());
			toastr.error(err.message);
			return false;
		}
	};
};
