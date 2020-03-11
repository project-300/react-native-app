import { TextStyle, ViewStyle } from 'react-native';
import { CommonProps } from '../../../types/common';

export interface Styles {
	container: ViewStyle;
	text: TextStyle;
}

export interface Props extends CommonProps {
	username: string;
	codeDeliveryDetails: CodeDeliveryDetails;
	userId: string;
	isSignUp: boolean;
	password: string;
	isConfirmingAccount: boolean;
	confirmAccount(uId: string, c: string, iSU: boolean, u: string): Promise<boolean>;
	login(email: string, password: string): Promise<boolean>;
}

export interface CodeDeliveryDetails {
	AttributeName: string;
	DeliveryMedium: string;
	Destination: string;
}

export interface State {
	code: string;
	confirmationText: string;
	username: string;
	codeDeliveryDetails: CodeDeliveryDetails,
	userId: string;
	isSignUp: boolean;
}
