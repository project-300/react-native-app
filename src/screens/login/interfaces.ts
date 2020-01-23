import { TextStyle, ViewStyle } from 'react-native';
import { CommonProps } from '../../types/common';

export interface Styles {
	container: ViewStyle;
	input: TextStyle;
	button: ViewStyle;
	buttonText: TextStyle;
	uiButton: ViewStyle;
	textInput: ViewStyle;
	closeButton: ViewStyle;
}

export interface Props extends CommonProps {
	isLoggingIn: boolean;
	isLoggedIn: boolean;
	login(u: string, p: string): Promise<boolean>;
}

export interface CompState {
	formOpen: boolean;
	keyboardOpen: boolean;
}
