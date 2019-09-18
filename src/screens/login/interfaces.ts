import { TextStyle, ViewStyle } from 'react-native';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { CommonProps } from '../../types/common';

export interface Styles {
	container: ViewStyle;
	input: TextStyle;
	button: ViewStyle;
	buttonText: TextStyle;
	signUpLink: TextStyle;
}

export interface Props extends CommonProps {
	isLoggingIn: boolean;
	isLoggedIn: boolean;
	login(u: string, p: string): Promise<boolean>;
}

export interface State {
	username: string;
	password: string;
}
