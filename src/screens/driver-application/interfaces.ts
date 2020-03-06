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
}

export interface Props extends CommonProps {
	isFetching: boolean;
	apply(vehicle: any): Promise<boolean>;
	checkIfApplied(): Promise<boolean>;
	applied?: boolean;
	getVehicleMakes(): Promise<boolean>;
	vehicleMakes: VehicleMake[];
	getVehicleModels(makeId: string, year: string): Promise<boolean>;
	vehicleModels: VehicleModel[];
	errMessage: string;
}

export interface State {
	loading: boolean;
	yearPickerVisible: boolean;
	fuelTypePickerVisible: boolean;
	selectedYear: string;
	selectedFuelType: string;
	selectedVehicleMake: string;
	selectedVehicleModel: string;
	displayErrorMessage: boolean;
}

export interface SelectedVehicleMake {
	Make_ID: string;
	Make_Name: string;
}

export interface SelectedVehicleModel {
	Model_ID: string;
	Model_Name: string;
}
