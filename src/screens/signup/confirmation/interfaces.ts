import { TextStyle, ViewStyle } from 'react-native';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { CommonProps } from '../../../types/common';
import { SignUpActionResponse } from '../interfaces';

export interface Styles {
	container: ViewStyle;
	text: TextStyle;
	input: TextStyle;
	button: ViewStyle;
	buttonText: TextStyle;
}

export interface Props extends CommonProps {
	isConfirmingAccount: boolean;
	username: string;
	email: string;
	userId: string;
	signUp(e: string, u: string, p: string): Promise<SignUpActionResponse>;
	confirmAccount(uId: string, u: string, c: string): Promise<boolean>;
	codeDeliveryDetails: {
		AttributeName: string;
		DeliveryMedium: string;
		Destination: string;
	};
}

interface CodeDeliveryDetails {
	AttributeName: string;
	DeliveryMedium: string;
	Destination: string;
}

export interface State {
	code: string;
	confirmationText: string;
}
