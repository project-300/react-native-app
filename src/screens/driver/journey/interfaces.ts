import { TextStyle, ViewStyle } from 'react-native';
import { CommonProps } from '../../../types/common';
import { Coords, Journey } from '@project-300/common-types';

export interface Styles {
	container: ViewStyle;
	mapContainer: ViewStyle;
	button: TextStyle;
	buttonText: TextStyle;
	map: ViewStyle;
	bottomPanel: ViewStyle;
	spinner: ViewStyle;
	spinnerTextStyle: TextStyle;
}

export interface Props extends CommonProps {
	// status: string;
	isStarting: boolean;
	isEnding: boolean;
	isMoving: boolean;
	isRequestingJourneyDetails: boolean;
	journey: Journey | undefined;
	getJourneyDetails(j: string): Promise<void>;
	startJourney(j: string): Promise<void>;
	endJourney(j: string): Promise<void>;
	driverMovement(j: string, c: Coords): Promise<void>;
}

export interface State {
	journeyId: string;
	driverRegion: {
		latitude: number;
		longitude: number;
		latitudeDelta: number;
		longitudeDelta: number;
	}
	currentPosition: {
		latitude: number;
		longitude: number;
		latitudeDelta: number;
		longitudeDelta: number;
	}
	route: Coords[] | null;
	routeTravelled: Coords[];
	midpoint: {
		latitude: number;
		longitude: number;
	};
	tracker: number | null;
}
