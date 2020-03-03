import { TextStyle, ViewStyle } from 'react-native';
import { CommonProps } from '../../../types/common';
import { Journey, UserBrief } from '@project-300/common-types';
import Animated from 'react-native-reanimated';

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
	renderTrigger: number; // Changing this forces a re-render of the list to update times
	userType: string;
	selectedJourney?: Journey;
}

export interface AnimationValues {
	panelOpen: Animated.Value<number>;
}

export interface AnimationStyles {
	panelHeight: Animated.Node<number> | number;
}
