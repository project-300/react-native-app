import { Vehicle } from '@project-300/common-types';
import { DriverApplicationService } from './../../services/driver-application';
import { DriverApplicationCheckResult } from './../../types/http-responses';
import { APPLICATION_ALREADY_APPLIED } from './../../constants/redux-actions';
import {
	DRIVER_APPLICATION_REQUEST,
	DRIVER_APPLICATION_SUCCESS,
	DRIVER_APPLICATION_FAILURE
} from '../../constants/redux-actions';
import { Dispatch } from 'redux';
import { DriverApplicationResult } from '../../types/http-responses';
import toastr from '../../helpers/toastr';
import { AppActions } from '../../types/redux-action-types';
import { setUserType, userId } from '../../auth';

const driverApplicationRequest = (): AppActions => ({
	type: DRIVER_APPLICATION_REQUEST
});

const driverApplicationSuccess = (): AppActions => ({
	type: DRIVER_APPLICATION_SUCCESS
});

const driverApplicationFailure = (): AppActions => ({
	type: DRIVER_APPLICATION_FAILURE
});

const applicationAlreadyApplied = (applied: boolean): AppActions => ({
	type: APPLICATION_ALREADY_APPLIED,
	applied
});

export const apply = (vehicle: any): ((dispatch: Dispatch) => Promise<boolean>) => {
	return async (dispatch: Dispatch): Promise<boolean> => {
		dispatch(driverApplicationRequest());

		try {
			const apiRes: DriverApplicationResult = await DriverApplicationService.applyForApplication(vehicle);
			console.log(apiRes);
			if (apiRes.success) {
				dispatch(driverApplicationSuccess());
				toastr.success('You have successfully submitted your application');
				return true;
			}

			return false;
		} catch (err) {
			dispatch(driverApplicationFailure());
			toastr.error(err.message || err.description || 'Unknown Error');
			return false;
		}
	};
};

export const checkIfApplied = (): ((dispatch: Dispatch) => Promise<boolean>) => {
	return async (dispatch: Dispatch): Promise<boolean> => {
		try {
			const id: string = await userId() as string;
			const apiRes: DriverApplicationCheckResult = await DriverApplicationService.checkIfUserHasApplied(id);

			if (apiRes.success && apiRes.alreadyApplied) {
				dispatch(applicationAlreadyApplied(true));
				return true;
			}
			dispatch(applicationAlreadyApplied(false));
			return true;
		} catch (err) {
			toastr.error(err.message || err.description || 'Unknown Error');
			return false;
		}
	};
};
