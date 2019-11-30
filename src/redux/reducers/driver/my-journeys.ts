import { DRIVER_JOURNEYS_REQUEST, DRIVER_JOURNEYS_SUCCESS, DRIVER_JOURNEYS_FAILURE } from '../../../constants/redux-actions';
import { DriverJourneysState } from '../../../types/redux-reducer-state-types';
import { DriverJourneysActionTypes, DriverJourneysSuccess } from '../../../types/redux-action-types';

const initialState: DriverJourneysState = {
	isRequesting: false,
	journeys: { current: [], previous: [] }
};

const driverJourneysReducer = (state: DriverJourneysState = initialState, action: DriverJourneysActionTypes): DriverJourneysState => {
	let payload;

	switch (action.type) {
		case DRIVER_JOURNEYS_REQUEST:
			return { ...state, isRequesting: true };
		case DRIVER_JOURNEYS_SUCCESS:
			payload = action as DriverJourneysSuccess;

			return { ...state, isRequesting: false, journeys: payload.journeys };
		case DRIVER_JOURNEYS_FAILURE:
			return { ...state, isRequesting: false };
		default:
			return state;
	}
};

export default driverJourneysReducer;
