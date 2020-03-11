import { ViewStyle } from 'react-native';
import { CommonProps, ContentReloading } from '../../../types/common';
import { Coords, Journey } from '@project-300/common-types';
import { Region } from 'react-native-maps';

export interface Styles {
	container: ViewStyle;
	mapContainer: ViewStyle;
	map: ViewStyle;
}

export interface Props extends CommonProps, ContentReloading {
	journey: Journey | undefined;
}

export interface State {
	journey: Journey;
	mapRegion: {
		latitude: number;
		longitude: number;
		latitudeDelta: number;
		longitudeDelta: number;
	};
	route: Coords[];
	midpoint: Region | Coords;
}
