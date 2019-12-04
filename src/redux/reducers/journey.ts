import {
  GET_ALL_JOURNEYS_REQUEST,
  GET_ALL_JOURNEYS_SUCCESS,
  GET_ALL_JOURNEYS_FAILURE,
  UPDATE_ADD_USER_JOURNEY_SUCCESS,
  UPDATE_ADD_USER_JOURNEY_REQUEST,
  UPDATE_ADD_USER_JOURNEY_FAILURE
} from '../../constants/redux-actions';
import { AllJourneysListState } from '../../types/redux-reducer-state-types';
import {
  JourneyActionTypes,
  GetAllJourneysSuccess
} from '../../types/redux-action-types';
//
const initialState: AllJourneysListState = {
  isFetching: false,
  journeys: []
};

const allJourneysReducer = (
  state: AllJourneysListState = initialState,
  action: JourneyActionTypes
): AllJourneysListState => {
  let payload;

  switch (action.type) {
    case GET_ALL_JOURNEYS_REQUEST:
      return { ...state, isFetching: true };
    case GET_ALL_JOURNEYS_SUCCESS:
      payload = action as GetAllJourneysSuccess;
      return { ...state, journeys: payload.journeys, isFetching: false };
    case GET_ALL_JOURNEYS_FAILURE:
      return { ...state, isFetching: false };
    case UPDATE_ADD_USER_JOURNEY_REQUEST:
      return { ...state, isFetching: true };
    case UPDATE_ADD_USER_JOURNEY_SUCCESS:
      return { ...state, isFetching: false };
    case UPDATE_ADD_USER_JOURNEY_FAILURE:
      return { ...state, isFetching: false };
    default:
      return state;
  }
};

export default allJourneysReducer;
