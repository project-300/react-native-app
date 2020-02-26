import {
	TURN_ON_DARK_MODE,
	TURN_OFF_DARK_MODE
} from '../../../constants/redux-actions';
import { DarkModeState } from '../../../types/redux-reducer-state-types';
import { DarkModeActionTypes } from '../../../types/redux-action-types';

const initialState: DarkModeState = {
	DARK_MODE: false
};

const darkModeReducer = (state: DarkModeState = initialState, action: DarkModeActionTypes): DarkModeState => {
	switch (action.type) {
		case TURN_ON_DARK_MODE:
			return { ...state, DARK_MODE: true };
		case TURN_OFF_DARK_MODE:
			return { ...state, DARK_MODE: false };
		default:
			return state;
	}
};

export default darkModeReducer;
