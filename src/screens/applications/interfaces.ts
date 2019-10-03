import { TextStyle, ViewStyle } from 'react-native';
import { DriverApplicationObject } from '@project-300/common-types';
import { CommonProps } from '../../types/common';

export interface Styles {
	container: ViewStyle;
	text: TextStyle;
	applicationRow: ViewStyle;
	title: TextStyle;
	button: ViewStyle;
	buttonText: TextStyle;
}

export interface Props extends CommonProps {
	applications: DriverApplicationObject[];
	isApplying: boolean;
	approveApplication(userId: string): Promise<boolean>;
	deleteApplication(userId: string): Promise<boolean>;
}

export interface State {
	applications: [];
}
