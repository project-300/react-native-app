import { TextStyle, ViewStyle } from 'react-native';
import { CommonProps } from '../../types/common';
import { CodeDeliveryDetails } from 'amazon-cognito-identity-js';

export interface Styles {
	container: ViewStyle;
	input: TextStyle;
	button: ViewStyle;
	buttonText: TextStyle;
	logo: ViewStyle;
}

export interface Props extends CommonProps {
	isCreatingAccount: boolean;
	isConfirmingAccount: boolean;
	signUp(u: string, pn: string, p: string): Promise<SignUpActionResponse | { ok: boolean }>;
	confirmAccount(uId: string, c: string, iSU: boolean, u: string): Promise<boolean>;
}

export interface State {
	keyboardOpen: boolean;
	confirmationDetails: ConfirmSignUpDetails | null;
}

export interface SignUpActionResponse {
	ok: boolean,
	confirmationRequired?: boolean;
	email: string;
	codeDeliveryDetails: CodeDeliveryDetails,
	userId: string;
	isSignUp: boolean;
}

interface ConfirmSignUpDetails {
	email: string;
	codeDeliveryDetails: CodeDeliveryDetails;
	userId: string;
	isSignUp: boolean;
}
