import { TextStyle, ViewStyle } from 'react-native';
import { CommonProps } from '../../types/common';
import { Journey } from '@project-300/common-types';

export interface Styles {
	container: ViewStyle;
	button: TextStyle;
	buttonText: TextStyle;
	applicationRow: ViewStyle;
	centerText: TextStyle;
	bold: TextStyle;
	cardHeader: ViewStyle;
	journeyHeading: TextStyle;
}

export interface Props extends CommonProps {
	journeys: Journey[];
	isFetching: boolean;
	getAllJourneys(): Promise<boolean>;
	updateAddUserJourney(journey: Journey): Promise<boolean>;
}

export interface State { }
