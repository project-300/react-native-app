import {
	STOP_LOCATION_TRACKING,
	START_LOCATION_TRACKING,
	SET_CURRENT_LOCATION,
	STOP_PUBLISHING_LOCATION
} from '../../constants/redux-actions';
import { LocationTrackingState } from '../../types/redux-reducer-state-types';
import { LocationTrackingActionTypes, SetCurrentLocation, StartTracking } from '../../types/redux-action-types';

const initialState: LocationTrackingState = {
	allowTracking: false,
	currentLocation: undefined,
	publishLocation: false
};

const locationTrackingReducer =
	(state: LocationTrackingState = initialState, action: LocationTrackingActionTypes): LocationTrackingState => {
	switch (action.type) {
		case START_LOCATION_TRACKING:
			const trackPayload: StartTracking = action as StartTracking;
			return { ...state, allowTracking: true, publishLocation: trackPayload.publishLocation };
		case STOP_LOCATION_TRACKING:
			return { ...state, allowTracking: false };
		case STOP_PUBLISHING_LOCATION:
			return { ...state, publishLocation: false };
		case SET_CURRENT_LOCATION:
			const payload: SetCurrentLocation = action as SetCurrentLocation;
			return { ...state, currentLocation: payload.coords };
		default:
			return state;
	}
};

export default locationTrackingReducer;
