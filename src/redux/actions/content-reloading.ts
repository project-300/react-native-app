import { AppActions } from '../../types/redux-action-types';
import { CONTENT_RELOAD_ON, CONTENT_RELOAD_OFF } from '../../constants/redux-actions';

export const contentReloadOn = (): AppActions => ({
	type: CONTENT_RELOAD_ON
});

export const contentReloadOff = (): AppActions => ({
	type: CONTENT_RELOAD_OFF
});
