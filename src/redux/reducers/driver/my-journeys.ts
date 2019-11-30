import { JOURNEYS_REQUEST, JOURNEYS_SUCCESS, JOURNEYS_FAILURE } from '../../../constants/redux-actions';
import { JourneysState } from '../../../types/redux-reducer-state-types';
import { DriverJourneysActionTypes, DriverJourneysSuccess } from '../../../types/redux-action-types';

const initialState: JourneysState = {
	isRequesting: false,
	journeys: { current: [], previous: [] }
};

const driverJourneysReducer = (state: JourneysState = initialState, action: DriverJourneysActionTypes): JourneysState => {
	let payload;

	switch (action.type) {
		case JOURNEYS_REQUEST:
			return { ...state, isRequesting: true };
		case JOURNEYS_SUCCESS:
			payload = action as DriverJourneysSuccess;

			return { ...state, isRequesting: false, journeys: payload.journeys };
		case JOURNEYS_FAILURE:
			return { ...state, isRequesting: false };
		default:
			return state;
	}
};

export default driverJourneysReducer;
