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
	isUpdating: boolean;
	updatePassword(cp: string, np: string): Promise<boolean>;
}

export interface State {
	newPassword: string;
	currentPassword: string;
}
