import { TextStyle, ViewStyle } from 'react-native';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';

export interface Styles {
	container: ViewStyle;
	text: TextStyle;
	input: TextStyle;
	button: ViewStyle;
	buttonText: TextStyle;
}

export interface Props {
	navigation: NavigationScreenProp<NavigationState, NavigationParams>;
	isConfirmingAccount: boolean;
	username: string;
	email: string;
	userId: string;
	signUp: Function;
	confirmAccount: Function;
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

export interface ConfirmationResult {
	success: boolean;
	error?: {
		code: string;
		description: string;
	};
}
