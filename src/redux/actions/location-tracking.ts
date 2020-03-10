import {
	STOP_LOCATION_TRACKING,
	START_LOCATION_TRACKING, SET_CURRENT_LOCATION
} from '../../constants/redux-actions';
import { Dispatch } from 'redux';
import toastr from '../../helpers/toastr';
import { AppActions } from '../../types/redux-action-types';
import { Coords } from '@project-300/common-types';
import { JourneyService } from '../../services/journey';

export const stopLocationTracking = (): AppActions => ({ type: STOP_LOCATION_TRACKING });

export const startLocationTracking = (): AppActions => ({ type: START_LOCATION_TRACKING });

export const updateCurrentLocation = (coords: Coords): AppActions => ({ type: SET_CURRENT_LOCATION, coords });

export const setCurrentLocation = (coords: Coords):
	(dispatch: Dispatch<AppActions>) => Promise<void> => { return async (dispatch: Dispatch<AppActions>): Promise<void> => {
		dispatch(updateCurrentLocation(coords));

		try {
			const result = await JourneyService.locationMovement(coords);
			console.log(result);
		} catch (err) {
			console.log(err);
			toastr.error('Unable to update location');
		}
	};
};
