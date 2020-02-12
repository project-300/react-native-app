import { TextStyle, ViewStyle } from 'react-native';

export interface Styles {
	container: ViewStyle;
	input: TextStyle;
	button: ViewStyle;
	buttonContainer: ViewStyle;
	buttonsContainer: ViewStyle;
	spinner: ViewStyle;
}

export interface Props {
	type: string;
	allInterests: string[];
	currentInterests: string[] | undefined;
	panelOpen: boolean;
	isUpdating: boolean;
	close(): void;
	updateInterests(i: string[]): Promise<void | boolean>;
}

export interface State {
	interests: string[];
}
