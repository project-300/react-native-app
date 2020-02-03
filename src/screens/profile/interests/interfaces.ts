import { TextStyle, ViewStyle } from 'react-native';

export interface Styles {
	container: ViewStyle;
	input: TextStyle;
	button: ViewStyle;
	buttonContainer: TextStyle;
}

export interface Props {
	type: string;
	allInterests: string[];
	currentInterests: string[];
	close(): void;
	updateInterests(i: string[]): Promise<void | boolean>;
}

export interface State {
	isUpdating: boolean;
}
