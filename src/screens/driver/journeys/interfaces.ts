import { TextStyle, ViewStyle } from 'react-native';
import { CommonProps } from '../../../types/common';
import { Journey } from '@project-300/common-types';

export interface Styles {
	container: ViewStyle;
	button: TextStyle;
	buttonText: TextStyle;
	applicationRow: ViewStyle;
	noJourneys: TextStyle;
}

export interface Props extends CommonProps {
	getJourneys(): Promise<void>;
	journeys: { previous: Journey[]; current: Journey[] };
}

export interface State { }
