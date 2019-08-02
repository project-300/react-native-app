import { TextStyle, ViewStyle } from 'react-native';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';

export interface Styles {
	container: ViewStyle;
	input: TextStyle;
	button: ViewStyle;
	error: TextStyle;
	underline: TextStyle;
}

export interface Props {
	navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export interface State {
	email: string;
	username: string;
	password: string;
	error?: string;
}

export interface SignupResult {
	success: boolean;
	error?: {
		code: string;
		description: string;
	};
}
