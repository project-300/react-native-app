import { TextStyle, ViewStyle } from 'react-native';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';

export interface Styles {
	container: ViewStyle;
	text: TextStyle;
	input: TextStyle;
	button: ViewStyle;
	error: TextStyle;
}

export interface Props {
	navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface CodeDeliveryDetails {
	AttributeName: string;
	DeliveryMedium: string;
	Destination: string;
}

export interface State {
	username: string;
	email: string;
	codeDeliveryDetails: CodeDeliveryDetails;
	code: string;
	verificationText: string;
	error?: string;
}
