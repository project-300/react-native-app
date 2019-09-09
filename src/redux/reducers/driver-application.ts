import {
	DRIVER_APPLICATION_REQUEST,
	DRIVER_APPLICATION_SUCCESS,
	DRIVER_APPLICATION_FAILURE
} from '../../constants/redux-actions';
import { DriverApplicationState } from '../../types/redux-reducer-state-types';
import { DriverApplicationActionTypes } from '../../types/redux-action-types';

const initialState: DriverApplicationState = {
	isApplying: false,
	applications: []
};

const driverApplicationReducer = (state: DriverApplicationState = initialState, action: DriverApplicationActionTypes): DriverApplicationState => {
	switch (action.type) {
		case DRIVER_APPLICATION_REQUEST:
			return { ...state, isApplying: true };
		case DRIVER_APPLICATION_SUCCESS:
			return { ...state, isApplying: false };
		case DRIVER_APPLICATION_FAILURE:
			return { ...state, isApplying: false };
		default:
			return state;
	}
};

export default driverApplicationReducer;
