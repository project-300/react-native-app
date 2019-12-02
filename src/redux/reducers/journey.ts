import {
  GET_ALL_JOURNEYS_REQUEST,
  GET_ALL_JOURNEYS_SUCCESS,
  GET_ALL_JOURNEYS_FAILURE
} from '../../constants/redux-actions';
import { AllJourneysListState } from '../../types/redux-reducer-state-types';
import { JourneyActionTypes } from '../../types/redux-action-types';
//
const initialState: AllJourneysListState = {
  fetchingData: false,
  journeys: []
};

const journeyReducer = (
  state: AllJourneysListState = initialState,
  action: JourneyActionTypes
): AllJourneysListState => {
  switch (action.type) {
    case GET_ALL_JOURNEYS_REQUEST:
      return { ...state, fetchingData: true };
    case GET_ALL_JOURNEYS_SUCCESS:
      return { ...state, journeys: action.payload, fetchingData: false };
    case GET_ALL_JOURNEYS_FAILURE:
      return { ...state, fetchingData: false };
    default:
      return state;
  }
};

export default journeyReducer;
