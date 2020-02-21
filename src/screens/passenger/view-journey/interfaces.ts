import { TextStyle, ViewStyle } from 'react-native';
import { CommonProps, ContentReloading } from '../../../types/common';
import { Coords, Journey } from '@project-300/common-types';
import { Region } from 'react-native-maps';
import Animated from 'react-native-reanimated';
import { AppActions } from '../../../types/redux-action-types';

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

export interface Props extends CommonProps, ContentReloading {
	isUpdating: boolean;
	journey: Journey | undefined;
	getViewJourney(journeyId: string, createdAt: string): Promise<boolean>;
	updateAddUserJourney(journeyId: string, createdAt: string): Promise<boolean>;
	cancelLiftAcceptance(journeyId: string, createdAt: string): Promise<boolean>;
	clearJourneyInfo(): AppActions;
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
	prepping: boolean;
	journeyLoaded: boolean;
}

export interface AnimationValues {
	map: Animated.Value<number>,
	prepping: Animated.Value<number>,
}

export interface AnimationStyles {
	mapHeight: Animated.Node<number> | number,
	closeMapIconOpacity: Animated.Node<number> | number,
	expandMapIconOpacity: Animated.Node<number> | number,
	overlayOpacity: Animated.Node<number> | number,
	overlayButtonOpacity: Animated.Node<number> | number,
	showClickMapMessageOpacity: Animated.Node<number> | number,
	mapOpacity: Animated.Node<number> | number,
}
