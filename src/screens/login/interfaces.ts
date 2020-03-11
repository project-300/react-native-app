import { ViewStyle, TextStyle } from 'react-native';
import { CommonProps } from '../../types/common';
import { getCurrentJourney } from '../../redux/actions';

export interface Styles {
	container: ViewStyle;
	heightThird: ViewStyle;
	closeButtonContainer: ViewStyle;
	closeButton: ViewStyle;
	bottomForm: ViewStyle;
	loginLink: TextStyle;
}

export interface Props extends CommonProps {
	isLoggingIn: boolean;
	isLoggedIn: boolean;
	login(u: string, p: string): Promise<boolean>;
	getCurrentJourney(onAppLoad?: boolean): Promise<void>;
}

export interface CompState {
	formOpen: boolean;
	keyboardOpen: boolean;
	isClosingForm: boolean;
}
