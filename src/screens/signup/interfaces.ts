import { TextStyle, ViewStyle } from 'react-native';
import { CommonProps } from '../../types/common';
import { CodeDeliveryDetails } from 'amazon-cognito-identity-js';

export interface Styles {
	container: ViewStyle;
	inputContainer: ViewStyle;
	input: TextStyle;
	button: ViewStyle;
	buttonText: TextStyle;
	loginLink: TextStyle;
	showPasswordIconContainer: ViewStyle;
	showPasswordIcon: TextStyle;
}

export interface Props extends CommonProps {
	isCreatingAccount: boolean;
	signUp(e: string, u: string, p: string): Promise<SignUpActionResponse>;
}

export interface State {
	email: string;
	username: string;
	password: string;
	hidePassword: boolean;
}

export interface SignUpActionResponse {
	ok: boolean,
	confirmationRequired?: boolean;
	username?: string;
	email?: string,
	codeDeliveryDetails?: CodeDeliveryDetails,
	userId?: string;
}
