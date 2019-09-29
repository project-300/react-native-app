import { TextStyle, ViewStyle } from 'react-native';
import { CommonProps } from '../../../types/common';

export interface Styles {
	container: ViewStyle;
	inputContainer: ViewStyle;
	input: TextStyle;
	showPasswordIconContainer: ViewStyle;
	showPasswordIcon: TextStyle;
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
	hideNewPassword: boolean,
	hideCurrentPassword: boolean;
}
