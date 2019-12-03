import { TextStyle, ViewStyle } from 'react-native';
import { CommonProps } from '../../types/common';
import { Region, LatLng } from 'react-native-maps';
import { GooglePlace } from '../../types/maps';

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
}

export interface Props extends CommonProps {
	places: GooglePlace[];
	googlePlacesSearch(q: string): Promise<void>;
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
	locationType: string;
	placesFieldText: string;
	origin: GooglePlace | null;
	destination: GooglePlace | null;
 }

export interface Place {
	formatted_address: string,
	name: string,
	location: LatLng
}
