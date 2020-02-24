import { VehicleMakesResult, VehicleModelsResult } from './../../types/http-responses';
import { DriverApplicationService } from './../../services/driver-application';
import {
	VEHICLE_MAKES_REQUEST,
	VEHICLE_MAKES_SUCCESS,
	VEHICLE_MAKES_FAILURE,
	VEHICLE_MODELS_REQUEST,
	VEHICLE_MODELS_SUCCESS,
	VEHICLE_MODELS_FAILURE
} from '../../constants/redux-actions';
import { Dispatch } from 'redux';
import toastr from '../../helpers/toastr';
import { AppActions } from '../../types/redux-action-types';
import { VehicleMake, VehicleModel } from '@project-300/common-types';

const vehicleMakesRequest = (): AppActions => ({
	type: VEHICLE_MAKES_REQUEST
});

const vehiclesMakesSuccess = (vehicleMakes: VehicleMake[]): AppActions => ({
	type: VEHICLE_MAKES_SUCCESS,
	vehicleMakes
});

const vehiclesMakesFailure = (): AppActions => ({
	type: VEHICLE_MAKES_FAILURE
});

const vehicleModelsRequest = (): AppActions => ({
	type: VEHICLE_MODELS_REQUEST
});

const vehiclesModelsSuccess = (vehicleModels: VehicleModel[]): AppActions => ({
	type: VEHICLE_MODELS_SUCCESS,
	vehicleModels
});

const vehiclesModelsFailure = (): AppActions => ({
	type: VEHICLE_MODELS_FAILURE
});

export const getVehicleMakes = (): ((dispatch: Dispatch) => Promise<boolean>) => {
	return async (dispatch: Dispatch): Promise<boolean> => {
		dispatch(vehicleMakesRequest());

		try {
			const apiRes: VehicleMakesResult = await DriverApplicationService.getAllVehicleMakes();

			if (apiRes.success) {
				dispatch(vehiclesMakesSuccess(apiRes.vehicleMakes));
				return true;
			}

			return false;
		} catch (err) {
			dispatch(vehiclesMakesFailure());
			toastr.error(err.message || err.description || 'Unknown Error');
			return false;
		}
	};
};

export const getVehicleModels = (makeId: string, year: string): ((dispatch: Dispatch) => Promise<boolean>) => {
	return async (dispatch: Dispatch): Promise<boolean> => {
		dispatch(vehicleModelsRequest());

		try {
			const apiRes: VehicleModelsResult = await DriverApplicationService.getVehicleModels(makeId, year);
			console.log(apiRes);

			if (apiRes.success) {
				dispatch(vehiclesModelsSuccess(apiRes.vehicleModels));
				return true;
			}

			return false;
		} catch (err) {
			dispatch(vehiclesModelsFailure());
			toastr.error(err.message || err.description || 'Unknown Error');
			return false;
		}
	};
};
