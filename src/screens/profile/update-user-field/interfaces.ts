import { TextStyle, ViewStyle } from 'react-native';
import { EditTypes } from '../../../types/common';

export interface Styles {
	container: ViewStyle;
	input: TextStyle;
	button: ViewStyle;
	buttonContainer: ViewStyle;
	spinner: ViewStyle;
}

export interface Props {
	type: string;
	field: EditTypes;
	value: string;
	isUpdating: boolean;
	close(): void;
	updateUserField(f: EditTypes, t: string, e: string): Promise<boolean>;
}

export interface State {
	value: string;
}
