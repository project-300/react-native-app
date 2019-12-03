import { TextStyle, ViewStyle } from 'react-native';
import { CommonProps } from '../../types/common';
import { Region, LatLng } from 'react-native-maps';
import { GooglePlace } from '../../types/maps';
import { CreateJourney, GooglePlaceDetails } from '@project-300/common-types';
import { AppActions } from '../../types/redux-action-types';

export interface Styles {
	container: ViewStyle;
	map: ViewStyle;
	input: ViewStyle;
	mapWrap: ViewStyle;
	icon: TextStyle;
	showForm: ViewStyle;
	form: ViewStyle;
	text: TextStyle;
	button: TextStyle;
	buttonText: TextStyle;
	divider: ViewStyle;
	placesList: ViewStyle;
	placeItem: ViewStyle;
	continueButton: ViewStyle;
	buttonValid: ViewStyle;
	buttonInvalid: ViewStyle;
}

export interface Props extends CommonProps {
	places: GooglePlace[];
	originPlace: GooglePlace | null;
	originPlaceDetails: GooglePlaceDetails | null;
	destinationPlace: GooglePlace | null;
	destinationPlaceDetails: GooglePlaceDetails | null;
	googlePlacesSearch(q: string): Promise<void>;
	getGooglePlaceDetails(p: string, l: string): Promise<void>;
	selectGooglePlace(p: GooglePlace, l: string): AppActions;
	googlePlacesSearchClearResults(): void;
	createJourney(j: CreateJourney): Promise<boolean>;
}

export interface State {
	formTop?: number,
	places: GooglePlace[];
	positionStart: LatLng;
	positionEnd: LatLng;
	journeyRegion: Region;
	droppingMarker: boolean;
	isDateTimePickerVisible: boolean;
	isSearching: boolean;
	openLocationPanel: boolean,
	openConfirmPanel: boolean,
	locationType: string;
	placesFieldText: string;
	totalNoOfSeats: number;
	pricePerSeat: number;
	leavingAt: Date;
}
