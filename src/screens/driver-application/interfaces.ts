import { TextStyle, ViewStyle } from 'react-native';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { CommonProps } from '../../types/common';
import { VehicleMake, VehicleModel, Vehicle } from '@project-300/common-types';

export interface Styles {
	container: ViewStyle;
	text: TextStyle;
	button: TextStyle;
	buttonText: TextStyle;
	listItem: ViewStyle;
	formView: ViewStyle;
	errText: TextStyle;
	spinner: ViewStyle;
}

export interface Props extends CommonProps {
	isApplying: boolean;
	apply(vehicle: any): Promise<boolean>;
	checkIfApplied(): Promise<boolean>;
	applied?: boolean;
	vehicleMakes: VehicleMake[];
	vehicleModels: VehicleModel[];
}

export interface State {
	yearPickerVisible: boolean;
	isChecking: boolean;
	fuelTypePickerVisible: boolean;
	selectedYear: string;
	selectedFuelType: string;
	selectedVehicleMake: string;
	selectedVehicleModel: string;
}

export interface SelectedVehicleMake {
	Make_ID: string;
	Make_Name: string;
}

export interface SelectedVehicleModel {
	Model_ID: string;
	Model_Name: string;
}
