import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { TextStyle, ViewStyle } from 'react-native';

export interface Styles {
	container: ViewStyle;
	text: TextStyle;
}

export interface LinkDispatchProps {
	onFetchLifts(): void;
}

export interface LinkStateProp {
	allLifts: object;
}

export interface HomePageProps {
	navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export type Props = HomePageProps & LinkStateProp & LinkDispatchProps;

export interface State { }
