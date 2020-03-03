import {
	JOURNEYS_REQUEST,
	JOURNEYS_SUCCESS,
	JOURNEYS_FAILURE,
	CANCEL_PASSENGER_JOURNEY_REQUEST,
	CANCEL_PASSENGER_JOURNEY_SUCCESS,
	CANCEL_PASSENGER_JOURNEY_FAILURE
} from '../../../constants/redux-actions';
import { JourneysState } from '../../../types/redux-reducer-state-types';
import { CancelPassengerAcceptedSuccess, DriverJourneysActionTypes, DriverJourneysSuccess } from '../../../types/redux-action-types';

const initialState: JourneysState = {
	isRequesting: false,
	isCancelling: false,
	journeys: { driver: [], passenger: [] }
};

const driverJourneysReducer = (state: JourneysState = initialState, action: DriverJourneysActionTypes): JourneysState => {
	let payload;

	switch (action.type) {
		case JOURNEYS_REQUEST:
			return { ...state, isRequesting: true };
		case JOURNEYS_SUCCESS:
			payload = action as DriverJourneysSuccess;

			console.log(payload.journeys);

			const journeys = {
				driver: payload.isDriver ? payload.journeys : [ ...state.journeys.driver ],
				passenger: !payload.isDriver ? payload.journeys : [ ...state.journeys.passenger ]
			};

			console.log(journeys);

			return { ...state, isRequesting: false, journeys };
		case JOURNEYS_FAILURE:
			return { ...state, isRequesting: false };
		case CANCEL_PASSENGER_JOURNEY_REQUEST:
			return { ...state, isCancelling: true };
		case CANCEL_PASSENGER_JOURNEY_SUCCESS:
			payload = action as CancelPassengerAcceptedSuccess;

			return { ...state, isCancelling: false, journeys: payload.journeys };
		case CANCEL_PASSENGER_JOURNEY_FAILURE:
			return { ...state, isCancelling: false };
		default:
			return state;
	}
};

export default driverJourneysReducer;
