import { TextStyle, ViewStyle } from 'react-native';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';

export interface Styles {
	container: ViewStyle;
	input: TextStyle;
	button: ViewStyle;
	buttonText: TextStyle;
	error: TextStyle;
	underline: TextStyle;
}

export interface Props {
	navigation: NavigationScreenProp<NavigationState, NavigationParams>;
	isLoggingIn: boolean;
	error: string;
	login: Function;
}

export interface State {
	username: string;
	password: string;
}

export interface LoginResult {
	success: boolean;
	error?: {
		code: string;
		description: string;
	};
}
