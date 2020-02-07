import { TextStyle, ViewStyle } from 'react-native';
import { CommonProps } from '../../../types/common';
import { SignUpActionResponse } from '../../../screens/signup/interfaces';

export interface Styles {
	container: ViewStyle;
	text: TextStyle;
	loginLink: TextStyle;
	showPasswordIconContainer: ViewStyle;
	showPasswordIcon: TextStyle;
}

export interface Props extends CommonProps {
	isCreatingAccount: boolean;
	signUp(email: string, username: string, password: string): Promise<void | boolean>;
	keyboardOpen(): void;
}

export interface CodeDeliveryDetails {
	AttributeName: string;
	DeliveryMedium: string;
	Destination: string;
}

export interface State {
	email: string;
	username: string;
	password: string;
	hidePassword: boolean;
}
