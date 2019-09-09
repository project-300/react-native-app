import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { TextStyle, ViewStyle } from 'react-native';

export interface Styles {
	container: ViewStyle;
	text: TextStyle;
	button: TextStyle;
	buttonText: TextStyle;
}

export interface Props {
	navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export interface State { }
