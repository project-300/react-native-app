import { JOURNEYS_REQUEST, JOURNEYS_SUCCESS, JOURNEYS_FAILURE } from '../../../constants/redux-actions';
import { Dispatch } from 'redux';
import { JourneysResult } from '../../../types/http-responses';
import HttpAPI from '../../../api/http';
import toastr from '../../../helpers/toastr';
import { AppActions } from '../../../types/redux-action-types';
import { Journey } from '@project-300/common-types';
import { userId } from '../../../auth';

const journeysRequest = (): AppActions => ({ type: JOURNEYS_REQUEST });

const journeysSuccess = (journeys: { previous: Journey[]; current: Journey[] }): AppActions => ({ type: JOURNEYS_SUCCESS, journeys });

const journeysFailure = (): AppActions => ({ type: JOURNEYS_FAILURE });

export const getJourneys = (driver: boolean): (dispatch: Dispatch) => Promise<void> => {
	return async (dispatch: Dispatch): Promise<void> => {
		dispatch(journeysRequest());

		const uId: string = await userId() as string;

		try {
			const apiRes: JourneysResult = (driver ?
				await HttpAPI.getDriverJourneys({ userId: uId }) :
				await HttpAPI.getPassengerJourneys({ userId: uId })) as JourneysResult;

			console.log(apiRes);

			if (apiRes.success && apiRes.journeys) dispatch(journeysSuccess(apiRes.journeys));
			else dispatch(journeysFailure());
		} catch (err) {
			console.log(err);
			dispatch(journeysFailure());
			toastr.error(err.message);
		}
	};
};
