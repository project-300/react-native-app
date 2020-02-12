import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';

export interface CommonProps {
	navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export enum EditTypes {
	EMAIL = 'email', // Email to be removed
	FIRST_NAME = 'firstName',
	LAST_NAME = 'lastName',
	PASSWORD = 'password',
	INTERESTS = 'interests'
}
