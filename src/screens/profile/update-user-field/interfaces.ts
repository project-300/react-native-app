import { TextStyle, ViewStyle } from 'react-native';
import { CommonProps, EditTypes } from '../../../types/common';

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
	updateUserField(f: EditTypes, t: string, e: string): Promise<boolean>;
}

export interface State {
	type: string;
	field: EditTypes;
	value: string;
}
