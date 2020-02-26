import { Dispatch } from 'redux';
import { IsDarkMode } from '../../../constants/theme';
import { AppActions } from '../../../types/redux-action-types';
import { TURN_ON_DARK_MODE, TURN_OFF_DARK_MODE } from '../../../constants/redux-actions';

const turnOnDarkMode = (): AppActions => ({ type: TURN_ON_DARK_MODE });

const turnOffDarkMode = (): AppActions => ({ type: TURN_OFF_DARK_MODE });

export const setDarkMode = (): (dispatch: Dispatch) => Promise<void> => {
	return async (dispatch: Dispatch): Promise<void> => {
		const isDarkMode: boolean = await IsDarkMode();
		if (isDarkMode) dispatch(turnOnDarkMode());
		else dispatch(turnOffDarkMode());
	};
};
