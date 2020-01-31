import { TextStyle, ViewStyle } from 'react-native';
import { EditTypes } from '../../../types/common';

export interface Styles {
	container: ViewStyle;
	input: TextStyle;
	button: ViewStyle;
	buttonContainer: TextStyle;
}

export interface Props {
	type: string;
	field: EditTypes;
	value: string;
	close(): void;
	updateUserField(f: EditTypes, t: string, e: string): Promise<boolean>;
}

export interface State {
	value: string;
	isUpdating: boolean;
}
