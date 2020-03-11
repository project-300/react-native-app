import { TextStyle, ViewStyle } from 'react-native';
import { CommonProps } from '../../types/common';
import { CodeDeliveryDetails } from 'amazon-cognito-identity-js';

export interface Styles {
	container: ViewStyle;
	input: TextStyle;
	button: ViewStyle;
	buttonText: TextStyle;
	logo: ViewStyle;
	loginLink: TextStyle;
}

export interface Props extends CommonProps {
	confirmed: boolean;
	codeSent: boolean;
	forgotPassword(email: string): Promise<boolean>;
	forgotPasswordSubmit(email: string, code: string, password: string): Promise<boolean>;
}

export interface State {
	keyboardOpen: boolean;
	email: string;
	code: string;
	password: string;
	confirmPassword: string;
}
