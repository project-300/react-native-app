import { TextStyle, ViewStyle } from 'react-native';
import { CommonProps } from '../../types/common';
import { Coords, Journey, Place } from '@project-300/common-types';

export interface Styles {
	container: ViewStyle;
	mapContainer: ViewStyle;
	button: TextStyle;
	buttonText: TextStyle;
	map: ViewStyle;
	bottomPanel: ViewStyle;
	topPanel: ViewStyle;
	spinner: ViewStyle;
	spinnerTextStyle: TextStyle;
}

export interface Props extends CommonProps {
	journey: Journey | undefined;
	isRequesting: boolean;
	isWaitingOnDriverCoords: boolean;
	isComplete: boolean;
	driverLocation: Coords | null;
	passengerLocation: Coords | null;
	routeTravelled: Coords[];
	direction: number;
	ended: boolean;
	getPassengerJourneyDetails(journeyId: string): Promise<void>;
	subscribeDriverLocation(journeyId: string, createdAt: string): Promise<void>;
	unsubscribeDriverLocation(journeyId: string): Promise<void>;
}

export interface State {
	journeyKey: { journeyId: string; createdAt: string };
	driverRouteTravelled: Coords[];
	mapRegion: {
		latitude: number;
		longitude: number;
		latitudeDelta: number;
		longitudeDelta: number;
	};
	forceTracking: boolean;
}
