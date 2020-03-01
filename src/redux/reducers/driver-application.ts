import {
	DRIVER_APPLICATION_REQUEST,
	DRIVER_APPLICATION_SUCCESS,
	DRIVER_APPLICATION_FAILURE,
	APPLICATION_ALREADY_APPLIED
} from '../../constants/redux-actions';
import { DriverApplicationState } from '../../types/redux-reducer-state-types';
import { DriverApplicationActionTypes, ApplicationAlreadyApplied } from '../../types/redux-action-types';

const initialState: DriverApplicationState = {
	isFetching: false,
	applied: false
};

const driverApplicationReducer = (
	state: DriverApplicationState = initialState,
	action: DriverApplicationActionTypes
): DriverApplicationState => {
	switch (action.type) {
		case DRIVER_APPLICATION_REQUEST:
			return { ...state, isFetching: true };
		case DRIVER_APPLICATION_SUCCESS:
			return { ...state, isFetching: false };
		case DRIVER_APPLICATION_FAILURE:
			return { ...state, isFetching: false };
		case APPLICATION_ALREADY_APPLIED:
			const payload = action as ApplicationAlreadyApplied;
			return { ...state, applied: payload.applied, isFetching: false };
		default:
			return state;
	}
};

export default driverApplicationReducer;
