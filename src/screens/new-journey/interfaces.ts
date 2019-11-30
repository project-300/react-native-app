import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { TextStyle, ViewStyle } from 'react-native';
import { CommonProps } from '../../types/common';

export interface Styles {
	container: ViewStyle;
	text: TextStyle;
	button: TextStyle;
	buttonText: TextStyle;
	map: ViewStyle;
}

export interface Props extends CommonProps { }

export interface State { }

