import { TextStyle, ViewStyle } from 'react-native';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';

export interface Styles {
	container: ViewStyle;
	input: TextStyle;
	button: ViewStyle;
	buttonText: TextStyle;
	signUpLink: TextStyle;
}

export interface Props {
	navigation: NavigationScreenProp<NavigationState, NavigationParams>;
	isLoggingIn: boolean;
	isLoggedIn: boolean;
	login: Function;
}

export interface State {
	username: string;
	password: string;
}
