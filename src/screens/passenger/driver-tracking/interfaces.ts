import { TextStyle, ViewStyle } from 'react-native';
import { CommonProps } from '../../../types/common';
import { Coords, Journey, Place } from '@project-300/common-types';

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
	journey: Journey | undefined;
	isRequesting: boolean;
	isComplete: boolean;
	driverLocation: Coords | null;
	passengerLocation: Coords | null;
	getPassengerJourneyDetails(j: string): Promise<void>;
}

export interface State {
	journeyId: string;
	driverRouteTravelled: Coords[];
	mapRegion: {
		latitude: number;
		longitude: number;
		latitudeDelta: number;
		longitudeDelta: number;
	};
}
