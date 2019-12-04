import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { TextStyle, ViewStyle } from 'react-native';
import { CommonProps } from '../../types/common';

export interface Styles {
	container: ViewStyle;
	title: TextStyle;
	button: TextStyle;
	buttonText: TextStyle;
	logoutButton: ViewStyle;
	logoutButtonText: TextStyle;
}

export interface Props extends CommonProps { }

export interface State {
	driverView: boolean;
}
