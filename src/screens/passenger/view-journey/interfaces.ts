import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { CommonProps, ContentReloading } from '../../../types/common';
import { Journey } from '@project-300/common-types';
import Animated from 'react-native-reanimated';
import { AppActions } from '../../../types/redux-action-types';

export interface Styles {
	container: ViewStyle;
	mapImageTouchable: ViewStyle;
	mapImageContainer: ViewStyle;
	mapImage: ImageStyle;
	mapImageTopIcon: ViewStyle;
	mapImageBottomIcon: ViewStyle;
	clickToExpandText: TextStyle;
	placeText: TextStyle;
	content: ViewStyle;
	places: ViewStyle;
	origin: ViewStyle;
	centerItems: ViewStyle;
	actionButton: ViewStyle;
	overlay: ViewStyle;
	overlayButtonContainer: ViewStyle;
	overlayButton: ViewStyle;
	infoRow: TextStyle;
	bold: TextStyle;
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
