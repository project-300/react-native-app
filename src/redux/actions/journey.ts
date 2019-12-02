import { AppActions } from '../../types/redux-action-types';
import {
  GET_ALL_JOURNEYS_REQUEST,
  GET_ALL_JOURNEYS_SUCCESS,
  GET_ALL_JOURNEYS_FAILURE
} from '../../constants/redux-actions';
import HttpAPI from '../../api/http';
import { Dispatch } from 'redux';
import { GetAllJourneysResult } from '../../types/http-responses';
import toastr from '../../helpers/toastr';
import { Journey } from '@project-300/common-types';

const getAllJourneysRequest = (): AppActions => ({
  type: GET_ALL_JOURNEYS_REQUEST
});

const getAllJourneysSuccess = (journeys?: Journey[]): AppActions => ({
  type: GET_ALL_JOURNEYS_SUCCESS,
  payload: journeys
});

const getAllJourneysFailure = (): AppActions => ({
  type: GET_ALL_JOURNEYS_FAILURE
});

export const getAllJourneys = (): ((
  dispatch: Dispatch
) => Promise<boolean>) => {
  return async (dispatch: Dispatch): Promise<boolean> => {
    dispatch(getAllJourneysRequest());
    try {
      const apiRes: GetAllJourneysResult = await HttpAPI.getAllJourneys();
      if (apiRes.success && apiRes.journeys) {
        dispatch(getAllJourneysSuccess(apiRes.journeys));
        return true;
      }

      return false;
    } catch (err) {
      dispatch(getAllJourneysFailure());
      toastr.error(err.message || err.description || 'Unknown Error');
      return false;
    }
  };
};
