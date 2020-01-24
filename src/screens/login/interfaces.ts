import { ViewStyle } from 'react-native';
import { CommonProps } from '../../types/common';

export interface Styles {
	closeButton: ViewStyle;
}

export interface Props extends CommonProps {
	isLoggingIn: boolean;
	isLoggedIn: boolean;
	login(u: string, p: string): Promise<boolean>;
}

export interface CompState {
	formOpen: boolean;
	keyboardOpen: boolean;
}
