import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';

export interface CommonProps {
	navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
