import { TextStyle, ViewStyle } from 'react-native';
import { CommonProps } from '../../../types/common';
import { Journey } from '@project-300/common-types';

export interface Styles {
	container: ViewStyle;
	mapContainer: ViewStyle;
	button: TextStyle;
	buttonText: TextStyle;
	map: ViewStyle;
	bottomPanel: ViewStyle;
}

export interface Props extends CommonProps {
	journey: Journey | undefined;
	getJourneyDetails(j: string): Promise<void>;
}

export interface State {
	journeyId: string;
	driverRegion: {
		latitude: number;
		longitude: number;
		latitudeDelta: number;
		longitudeDelta: number;
	}
	route: [] | null;
	midpoint: {
		latitude: number;
		longitude: number;
	}
}
