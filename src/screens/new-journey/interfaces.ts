import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { TextStyle, ViewStyle, TouchableOpacity, TextInput, StyleProp } from 'react-native';
import { CommonProps } from '../../types/common';
import { Region, LatLng } from 'react-native-maps';

export interface Styles {
	container: ViewStyle;
	map: ViewStyle;
	header: TextStyle;
	input: ViewStyle;
	mapWrap: ViewStyle;
	icon: TextStyle;
	showForm: ViewStyle;
	form: ViewStyle;
	text: TextStyle;
	button: TextStyle;
	buttonText: TextStyle;
}

export interface Props extends CommonProps { }

export interface State {
	formTop?: number,
	places: Place[];
    positionStart: LatLng;
    positionEnd: LatLng;
    journeyRegion: Region;
 }

export interface Place {
	formatted_address: string,
	name: string,
	location: LatLng
 }

