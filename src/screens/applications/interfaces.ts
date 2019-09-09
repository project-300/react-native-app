import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { TextStyle, ViewStyle } from 'react-native';
import { AppActions } from '../../types/redux-action-types';

export interface Styles {
	container: ViewStyle;
	text: TextStyle;
	applicationRow: ViewStyle;
	title: TextStyle;
	button: ViewStyle;
	buttonText: TextStyle;
}

export interface Props {
	navigation: NavigationScreenProp<NavigationState, NavigationParams>;
	applications: [];
	isApplying: boolean;
	approveApplication(userId: string): Promise<boolean>;
	deleteApplication(userId: string): Promise<boolean>;
}

export interface State {
	applications: [];
}

export interface DriverApplication {
	userId: string;
	approved?: boolean;
	times: {
		applied: string;
		approved?: string;
	}
}
