import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { AppActions } from './redux-action-types';

export interface CommonProps {
	navigation: NavigationScreenProp<NavigationState, NavigationParams>;
	DARK_MODE: boolean;
}

export interface ContentReloading {
	contentReloading: boolean;
	contentReloadOn(): AppActions;
	contentReloadOff(): AppActions;
}

export enum EditTypes {
	EMAIL = 'email', // Email to be removed
	FIRST_NAME = 'firstName',
	LAST_NAME = 'lastName',
	PASSWORD = 'password',
	INTERESTS = 'interests',
	PHONE = 'phone'
}
