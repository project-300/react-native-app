import {
	DRIVER_APPLICATION_REQUEST,
	DRIVER_APPLICATION_SUCCESS,
	DRIVER_APPLICATION_FAILURE,
	STORE_APPLICATIONS
} from '../../constants/redux-actions';
import { Dispatch } from 'redux';
import { DriverApplicationResult } from '../../types/http-responses';
import HttpAPI from '../../api/http';
import toastr from '../../helpers/toastr';
import { AppActions } from '../../types/redux-action-types';
import { userId } from '../../auth';

const driverApplicationRequest = (): AppActions => ({ type: DRIVER_APPLICATION_REQUEST });

const driverApplicationSuccess = (): AppActions => ({ type: DRIVER_APPLICATION_SUCCESS });

const driverApplicationFailure = (): AppActions => ({ type: DRIVER_APPLICATION_FAILURE });

export const apply = (): (dispatch: Dispatch) => Promise<boolean> => {
	return async (dispatch: Dispatch): Promise<boolean > => {
		dispatch(driverApplicationRequest());

		try {
			const apiRes: DriverApplicationResult = await HttpAPI.driverApplication({ userId: await userId() });

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
