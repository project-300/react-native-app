import { AppActions } from '../../types/redux-action-types';
import {
  GET_ALL_JOURNEYS_REQUEST,
  GET_ALL_JOURNEYS_SUCCESS,
  GET_ALL_JOURNEYS_FAILURE,
  UPDATE_ADD_USER_JOURNEY_REQUEST,
  UPDATE_ADD_USER_JOURNEY_SUCCESS,
  UPDATE_ADD_USER_JOURNEY_FAILURE
} from '../../constants/redux-actions';
import HttpAPI from '../../api/http';
import { Dispatch } from 'redux';
import {
  GetAllJourneysResult,
  UpdateAddUserJourneyResult
} from '../../types/http-responses';
import toastr from '../../helpers/toastr';
import { Journey } from '@project-300/common-types';
import { Auth } from 'aws-amplify';

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

const updateUserJoinsJourneyRequest = (): AppActions => ({
  type: UPDATE_ADD_USER_JOURNEY_REQUEST
});

const updateUserJoinsJourneySuccess = (): AppActions => ({
  type: UPDATE_ADD_USER_JOURNEY_SUCCESS
});

const updateUserJoinsJourneyFailure = (): AppActions => ({
  type: UPDATE_ADD_USER_JOURNEY_FAILURE
});

export const updateAddUserJourney = (
  journey: Journey
): ((dispatch: Dispatch) => Promise<boolean>) => {
  return async (dispatch: Dispatch): Promise<boolean> => {
    dispatch(updateUserJoinsJourneyRequest());
    try {
      const user = await Auth.currentAuthenticatedUser();
      const userId: string = user.attributes.sub;
      console.log(journey);
      const apiRes: UpdateAddUserJourneyResult = await HttpAPI.updateUserJoinsJourney(
        { userId, journey }
      );

      if (apiRes.success) {
        dispatch(getAllJourneysSuccess());
        toastr.success('You are now added to the journey');
        return true;
      }

      return false;
    } catch (err) {
      console.log(err);
      dispatch(updateUserJoinsJourneyFailure());
      toastr.error(err.message || err.description || 'Unknown Error');
      return false;
    }
  };
};

export const getAllJourneys = (): ((
  dispatch: Dispatch
) => Promise<boolean>) => {
  return async (dispatch: Dispatch): Promise<boolean> => {
    dispatch(getAllJourneysRequest());
    try {
      const user = await Auth.currentAuthenticatedUser();
      const userId: string = user.attributes.sub;
      const apiRes: GetAllJourneysResult = await HttpAPI.getAllJourneys(userId);

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
