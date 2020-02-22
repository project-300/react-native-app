import {
	VEHICLE_MAKES_REQUEST,
	VEHICLE_MAKES_SUCCESS,
	VEHICLE_MAKES_FAILURE,
	VEHICLE_MODELS_REQUEST,
	VEHICLE_MODELS_SUCCESS,
	VEHICLE_MODELS_FAILURE
} from '../../constants/redux-actions';
import { Dispatch } from 'redux';
import { DriverApplicationResult } from '../../types/http-responses';
import toastr from '../../helpers/toastr';
import { AppActions } from '../../types/redux-action-types';

const vehicleMakesRequest = (): AppActions => ({
	type: VEHICLE_MAKES_REQUEST
});

const vehiclesMakesSuccess = (vehicleMakes: object[]): AppActions => ({
	type: VEHICLE_MAKES_SUCCESS,
	vehicleMakes
});

const vehiclesMakesFailure = (): AppActions => ({
	type: VEHICLE_MAKES_FAILURE
});

const vehicleModelsRequest = (): AppActions => ({
	type: VEHICLE_MODELS_REQUEST
});

const vehiclesModelsSuccess = (vehicleModels: object[]): AppActions => ({
	type: VEHICLE_MODELS_SUCCESS,
	vehicleModels
});

const vehiclesModelsFailure = (): AppActions => ({
	type: VEHICLE_MODELS_FAILURE
});

// export const apply = (): ((dispatch: Dispatch) => Promise<boolean>) => {
// 	return async (dispatch: Dispatch): Promise<boolean> => {
// 		dispatch(driverApplicationRequest());

// 		try {
// 			const apiRes: DriverApplicationResult = await DriverApplicationService.applyForApplication({ userId: await userId() as string });

// 			if (apiRes.success) {
// 				// await setUserType('Driver'); // ********** Temporarily switch to Driver user type on auto approve
// 				dispatch(driverApplicationSuccess());
// 				toastr.success('You have successfully submitted your application');
// 				return true;
// 			}

// 			return false;
// 		} catch (err) {
// 			dispatch(driverApplicationFailure());
// 			toastr.error(err.message || err.description || 'Unknown Error');
// 			return false;
// 		}
// 	};
// };

// export const checkIfApplied = (): ((dispatch: Dispatch) => Promise<boolean>) => {
// 	return async (dispatch: Dispatch): Promise<boolean> => {
// 		dispatch(driverApplicationRequest());

// 		try {
// 			const id: string = await userId() as string;
// 			const apiRes: DriverApplicationCheckResult = await DriverApplicationService.checkIfUserHasApplied(id);

// 			if (apiRes.success && apiRes.alreadyApplied) {
// 				dispatch(applicationAlreadyApplied(true));
// 				return true;
// 			}

// 			dispatch(applicationAlreadyApplied(false));
// 			return true;
// 		} catch (err) {
// 			dispatch(driverApplicationFailure());
// 			toastr.error(err.message || err.description || 'Unknown Error');
// 			return false;
// 		}
// 	};
// };
