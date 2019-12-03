import {
  GET_ALL_JOURNEYS_REQUEST,
  GET_ALL_JOURNEYS_SUCCESS,
  GET_ALL_JOURNEYS_FAILURE,
  UPDATE_ADD_USER_JOURNEY_SUCCESS,
  UPDATE_ADD_USER_JOURNEY_REQUEST,
  UPDATE_ADD_USER_JOURNEY_FAILURE
} from '../../constants/redux-actions';
import {
  AllJourneysListState,
  UpdateAddUserJourneyState
} from '../../types/redux-reducer-state-types';
import { JourneyActionTypes } from '../../types/redux-action-types';
//
const initialState: AllJourneysListState = {
  fetchingData: false,
  journeys: []
};

const initialUserJourneyState: UpdateAddUserJourneyState = {
  isAdding: false
};

const allJourneysReducer = (
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

const updateAddUserJourney = (
  state: UpdateAddUserJourneyState = initialUserJourneyState,
  action: JourneyActionTypes
): UpdateAddUserJourneyState => {
  switch (action.type) {
    case UPDATE_ADD_USER_JOURNEY_REQUEST:
      return { ...state, isAdding: true };
    case UPDATE_ADD_USER_JOURNEY_SUCCESS:
      return { ...state, isAdding: false };
    case UPDATE_ADD_USER_JOURNEY_FAILURE:
      return { ...state, isAdding: false };
    default:
      return state;
  }
};

export default allJourneysReducer;
export { updateAddUserJourney };
