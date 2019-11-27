import { DRIVER_JOURNEYS_REQUEST, DRIVER_JOURNEYS_SUCCESS, DRIVER_JOURNEYS_FAILURE } from '../../../constants/redux-actions';
import { DriverJourneysState } from '../../../types/redux-reducer-state-types';
import { DriverJourneysActionTypes } from '../../../types/redux-action-types';

const initialState: DriverJourneysState = {
	isRequesting: false,
	journeys: []
};

const driverJourneysReducer = (state: DriverJourneysState = initialState, action: DriverJourneysActionTypes): DriverJourneysState => {
	switch (action.type) {
		case DRIVER_JOURNEYS_REQUEST:
			return { ...state, isRequesting: true };
		case DRIVER_JOURNEYS_SUCCESS:
			console.log(state);
			return { ...state, isRequesting: false, journeys: action.journeys };
		case DRIVER_JOURNEYS_FAILURE:
			return { ...state, isRequesting: false };
		default:
			return state;
	}
};

export default driverJourneysReducer;
