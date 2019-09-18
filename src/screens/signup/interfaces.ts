import { TextStyle, ViewStyle } from 'react-native';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { CommonProps } from '../../types/common';

export interface Styles {
	container: ViewStyle;
	input: TextStyle;
	button: ViewStyle;
	buttonText: TextStyle;
	loginLink: TextStyle;
}

export interface Props extends CommonProps {
	isCreatingAccount: boolean;
	signUp(e: string, u: string, p: string): Promise<SignUpActionResponse>;
}

export interface State {
	email: string;
	username: string;
	password: string;
}

export interface SignUpActionResponse {
	ok: boolean,
	confirmationRequired?: boolean;
}
