import { TextStyle, ViewStyle } from 'react-native';
import { CommonProps, Coords } from '../../../types/common';
import { Journey } from '@project-300/common-types';

export interface Styles {
	container: ViewStyle;
	mapContainer: ViewStyle;
	button: TextStyle;
	buttonText: TextStyle;
	map: ViewStyle;
	bottomPanel: ViewStyle;
	spinner: ViewStyle;
}

export interface Props extends CommonProps {
	// status: string;
	isStarting: boolean;
	isEnding: boolean;
	isRequestingJourneyDetails: boolean;
	journey: Journey | undefined;
	getJourneyDetails(j: string): Promise<void>;
	startJourney(j: string): Promise<void>;
	endJourney(j: string): Promise<void>;
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
	}
	route: Coords[] | null;
	midpoint: {
		latitude: number;
		longitude: number;
	}
}
