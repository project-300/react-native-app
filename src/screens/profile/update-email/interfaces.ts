import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { TextStyle, ViewStyle } from 'react-native';
import { CommonProps } from '../../../types/common';

export interface Styles {
	container: ViewStyle;
	input: TextStyle;
	text: TextStyle;
	pushDown: TextStyle;
	button: ViewStyle;
	buttonText: TextStyle;
}

export interface Props extends CommonProps {
	email: string;
	isUpdating: boolean;
	updateEmail(e: string): Promise<boolean>;
}

export interface State {
	currentEmail: string,
	newEmail: string;
}
