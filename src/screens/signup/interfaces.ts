import { TextStyle, ViewStyle } from 'react-native';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';

export interface Styles {
	container: ViewStyle;
	input: TextStyle;
	button: ViewStyle;
	buttonText: TextStyle;
	loginLink: TextStyle;
}

export interface Props {
	navigation: NavigationScreenProp<NavigationState, NavigationParams>;
	isCreatingAccount: boolean;
	signUp: Function;
}

export interface State {
	email: string;
	username: string;
	password: string;
}

export interface SignupResult {
	success: boolean;
	error?: {
		code: string;
		description: string;
	};
}
