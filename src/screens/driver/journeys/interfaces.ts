import { TextStyle, ViewStyle } from 'react-native';
import { CommonProps } from '../../../types/common';
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
	textRow: TextStyle;
}

export interface Props extends CommonProps {
	getJourneys(d: boolean): Promise<void>;
	cancelPassengerAcceptedJourney(j: string): Promise<void>;
	isRequesting: boolean;
	isCancelling: boolean;
	journeys: { previous: Journey[]; current: Journey[] };
}

export interface State {
	driverView: boolean; // View the list with extra driver functionality (eg. Start a journey)
}
