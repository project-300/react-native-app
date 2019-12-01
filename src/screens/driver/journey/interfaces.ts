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
	currentPosition: { // The current position of the driver - Used for centering map & tracking
		latitude: number;
		longitude: number;
		latitudeDelta: number;
		longitudeDelta: number;
	}
	midpoint: { // Center point between origin and destination of a journey
		latitude: number;
		longitude: number;
	};
	routeTravelled: Coords[]; // Coordinates of movement points - Used to draw route on map. These are movements already made, not planned route.
	movementCount: number; // A count of movements made. Every 5 or 10 movements is logged in the DB for routeTravelled.
	tracker: number | null; // ID of the tracker - Used to stop tracking when the journey ends
}
