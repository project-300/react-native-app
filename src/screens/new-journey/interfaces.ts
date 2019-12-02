import { TextStyle, ViewStyle } from 'react-native';
import { CommonProps } from '../../types/common';
import { Region, LatLng } from 'react-native-maps';

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
}

export interface Props extends CommonProps { }

export interface State {
	formTop?: number,
	places: Place[];
	positionStart: LatLng;
	positionEnd: LatLng;
	journeyRegion: Region;
	droppingMarker: boolean;
	isDateTimePickerVisible: boolean;
	isSearching: boolean;
	openLocationPanel: boolean,
	locationType: string;
	placesFieldText: string;
 }

export interface Place {
	formatted_address: string,
	name: string,
	location: LatLng
}
