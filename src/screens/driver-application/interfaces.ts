import { TextStyle, ViewStyle } from 'react-native';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { CommonProps } from '../../types/common';
import { VehicleMake, VehicleModel } from '@project-300/common-types';

export interface Styles {
	container: ViewStyle;
	text: TextStyle;
	button: TextStyle;
	buttonText: TextStyle;
}

export interface Props extends CommonProps {
	isFetching: boolean;
	apply(): Promise<boolean>;
	checkIfApplied(): Promise<boolean>;
	applied?: boolean;
	getVehicleMakes(): Promise<boolean>;
	vehicleMakes: VehicleMake[];
	getVehicleModels(makeId: string, year: string): Promise<boolean>;
	vehicleModels: VehicleModel[];
}

export interface State {
	modelPickerVisible: boolean;
	makePickerVisible: boolean;
	modelPickerItems: VehicleModel[];
}
