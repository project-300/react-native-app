import { TextStyle, ViewStyle } from 'react-native';
import { CommonProps } from '../../../types/common';

export interface Styles {
	container: ViewStyle;
	input: TextStyle;
	button: ViewStyle;
	buttonText: TextStyle;
	signUpLink: TextStyle;
	showPasswordIconContainer: ViewStyle;
	showPasswordIcon: TextStyle;
	uiButton: ViewStyle;
	textInput: ViewStyle;
	closeButton: ViewStyle;
}

export interface Props extends CommonProps {
	keyboardOpen: boolean;
	isLoggingIn: boolean;
	isLoggedIn: boolean;
	login(u: string, p: string): Promise<boolean>;
}

export interface State {
	username: string;
	password: string;
	hidePassword: boolean;
}
