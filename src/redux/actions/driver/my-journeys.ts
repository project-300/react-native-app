import { DRIVER_JOURNEYS_REQUEST, DRIVER_JOURNEYS_SUCCESS, DRIVER_JOURNEYS_FAILURE } from '../../../constants/redux-actions';
import { Dispatch } from 'redux';
import { DriverJourneysResult } from '../../../types/http-responses';
import HttpAPI from '../../../api/http';
import toastr from '../../../helpers/toastr';
import { AppActions } from '../../../types/redux-action-types';
import { Journey } from '@project-300/common-types';

const driverJourneysRequest = (): AppActions => ({ type: DRIVER_JOURNEYS_REQUEST });

const driverJourneysSuccess = (journeys: Journey[]): AppActions => ({ type: DRIVER_JOURNEYS_SUCCESS, journeys });

const driverJourneysFailure = (): AppActions => ({ type: DRIVER_JOURNEYS_FAILURE });

export const getJourneys = (): (dispatch: Dispatch) => Promise<void> => {
	return async (dispatch: Dispatch): Promise<void> => {
		dispatch(driverJourneysRequest());

		try {
			const apiRes: DriverJourneysResult = await HttpAPI.getDriverJourneys({ userId: 'user212' });

			if (apiRes.success && apiRes.journeys) {
				dispatch(driverJourneysSuccess(apiRes.journeys));
			}
		} catch (err) {
			dispatch(driverJourneysFailure());
			toastr.error(err.message);
		}
	};
};
