import { TextStyle, ViewStyle } from 'react-native';

export interface Styles {
	container: ViewStyle;
	inputContainer: ViewStyle;
	showPasswordIconContainer: ViewStyle;
	showPasswordIcon: TextStyle;
	button: ViewStyle;
	buttonContainer: ViewStyle;
	spinner: ViewStyle;
}

export interface Props {
	type: string;
	close(): void;
	updatePassword(cp: string, np: string): Promise<boolean>;
}

export interface State {
	newPassword: string;
	currentPassword: string;
	hideNewPassword: boolean;
	hideCurrentPassword: boolean;
	isUpdating: boolean;
}
