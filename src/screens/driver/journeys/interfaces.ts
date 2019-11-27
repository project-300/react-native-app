import { TextStyle, ViewStyle } from 'react-native';
import { CommonProps } from '../../../types/common';
import { Journey } from '@project-300/common-types';

export interface Styles {
	container: ViewStyle;
	button: TextStyle;
	buttonText: TextStyle;
	applicationRow: ViewStyle;
}

export interface Props extends CommonProps {
	getJourneys(): Promise<void>;
	journeys: Journey[];
}

export interface State { }
