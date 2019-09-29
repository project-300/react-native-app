import { TextStyle, ViewStyle } from 'react-native';
import { CommonProps } from '../../types/common';

export interface Styles {
	container: ViewStyle;
	input: TextStyle;
	inputContainer: ViewStyle;
	button: ViewStyle;
	buttonText: TextStyle;
	signUpLink: TextStyle;
	showPasswordIconContainer: ViewStyle;
	showPasswordIcon: TextStyle;
}

export interface Props extends CommonProps {
	isLoggingIn: boolean;
	isLoggedIn: boolean;
	login(u: string, p: string): Promise<boolean>;
}

export interface State {
	username: string;
	password: string;
	hidePassword: boolean;
}
