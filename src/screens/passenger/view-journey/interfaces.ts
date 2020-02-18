import { TextStyle, ViewStyle } from 'react-native';
import { CommonProps } from '../../../types/common';
import { Coords, Journey } from '@project-300/common-types';
import { Region } from 'react-native-maps';
import Animated from 'react-native-reanimated';

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
	journey: Journey;
	updateAddUserJourney(journeyId: string, createdAt: string): Promise<boolean>;
	isFetching: boolean;
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
	midpoint: Region | Coords | undefined;
	mapImageExpanded: boolean;
	mapToBeOpened: boolean;
}

export interface AnimationValues {
	map: Animated.Value<number>,
}

export interface AnimationStyles {
	mapHeight: Animated.Node<number> | number,
	closeMapIconOpacity: Animated.Node<number> | number,
	expandMapIconOpacity: Animated.Node<number> | number,
}
