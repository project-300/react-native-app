import { TextStyle, ViewStyle } from 'react-native';
import { CommonProps } from '../../../types/common';

export interface Styles {
	container: ViewStyle;
	text: TextStyle;
	input: TextStyle;
	button: ViewStyle;
	buttonText: TextStyle;
}

export interface Props extends CommonProps {
	isConfirmingAccount: boolean;
	confirmAccount(uId: string, c: string, iSU: boolean, u: string): Promise<boolean>;
}

interface CodeDeliveryDetails {
	AttributeName: string;
	DeliveryMedium: string;
	Destination: string;
}

export interface State {
	code: string;
	confirmationText: string;
	username: string;
	email: string,
	codeDeliveryDetails: CodeDeliveryDetails,
	userId: string;
	isSignUp: boolean;
}
