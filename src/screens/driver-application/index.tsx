import React, { Component, ReactElement } from 'react';
import {
	Text,
	ScrollView,
	TouchableOpacity,
	View
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Props, State } from './interfaces';
import { apply, checkIfApplied, getVehicleMakes, getVehicleModels } from '../../redux/actions';
import { AppState } from '../../store';
import { DriverApplicationState, VehicleMakesAndModelsState } from '../../types/redux-reducer-state-types';
import ModalFilterPicker, { ModalFilterPickerOption } from 'react-native-modal-filter-picker';
import { List, ActivityIndicator } from 'react-native-paper';
import { Vehicle } from '@project-300/common-types';

export class DriverApplication extends Component<Props, State> {

	public constructor(props: Props) {
		super(props);
		this.state = {
			modelPickerVisible: false,
			makePickerVisible: false,
			yearPickerVisible: false,
			fuelTypePickerVisible: false,
			modelPickerItems: [],
			loading: false,
			selectedYear: '',
			selectedFuelType: '',
			selectedVehicleMake: null,
			selectedVehicleModel: null,
			modelsLoading: false,
			displayErrorMessage: false
		};
	}

	public async componentDidMount(): Promise<void> {
		this.setState({
			loading: true
		});
		await this.props.checkIfApplied();
		if (!this.props.applied) {
			await this.props.getVehicleMakes();
		}
		this.setState({
			loading: false
		});
	}

	private _getItemsForMakePicker = (): ModalFilterPickerOption[] => {
		return this.props.vehicleMakes.map((v) => {
			const option: ModalFilterPickerOption = {
				label: v.Make_Name,
				key: v.Make_ID.toString()
			};
			return option;
		});
	}

	private _getItemsForModelPicker = (): ModalFilterPickerOption[] => {
		return this.state.modelPickerItems.map((v) => {
			const option: ModalFilterPickerOption = {
				label: v.Model_Name,
				key: v.Model_ID.toString()
			};
			return option;
		});
	}

	private _getItemsForYearPicker = (): ModalFilterPickerOption[] => {
		const years: number[] = this._getAllYearsBetweenDates();

		return years.map((y: number, index: number) => {
			const option: ModalFilterPickerOption = {
				label: y.toString(),
				key: index.toString()
			};

			return option;
		});
	}

	private _getItemsForFuleTypePicker = (): ModalFilterPickerOption[] => {
		const fuleTypes: string[] = ['petrol', 'diesel', 'petrolHybrid', 'dieselHybrid', 'electric'];

		return fuleTypes.map((ft: string, index: number) => {
			const option: ModalFilterPickerOption = {
				label: ft,
				key: index.toString()
			};

			return option;
		});
	}

	private _apply = async (): Promise<void> => {
		const vehicle: Vehicle = {
			make: {
				Make_ID: this.state.selectedVehicleMake ? this.state.selectedVehicleMake.Make_ID : '',
				Make_Name: this.state.selectedVehicleMake ? this.state.selectedVehicleMake.Make_Name : ''
			},
			model: {
				Model_ID: this.state.selectedVehicleModel ? this.state.selectedVehicleModel.Model_ID : '',
				Model_Name: this.state.selectedVehicleModel ? this.state.selectedVehicleModel.Model_ID : ''
			},
			yearOfManufacture: parseInt(this.state.selectedYear, 10),
			fuelType: this.state.selectedFuelType as 'petrol' | 'diesel' | 'petrolHybrid' | 'dieselHybrid' | 'electric'
		};

		this.setState({
			loading: true
		});
		await this.props.apply(vehicle);
		await this.props.checkIfApplied();
		this.setState({
			loading: false
		});
	}

	private _openVehicleMakePicker = (): void => {
		this.setState({
			makePickerVisible: true
		});
	}

	private _openVehicleModelPicker = (): void => {
		this.setState({
			modelPickerVisible: true
		});
	}

	private _openFuleTypePicker = (): void => {
		this.setState({
			fuelTypePickerVisible: true
		});
	}

	private _openYearPicker = (): void => {
		this.setState({
			yearPickerVisible: true
		});
	}

	private _onModelPickerSelect = (key: string) => {
		this.setState({
			modelPickerVisible: false,
			selectedVehicleModel: {
				Model_ID: key.key,
				Model_Name: key.label
			}
		});
	}

	private _onMakePickerSelect = async (key: string) => {
		this.setState({
			makePickerVisible: false,
			modelPickerItems: [],
			selectedVehicleMake: {
				Make_ID: key.key,
				Make_Name: key.label
			},
			modelsLoading: true
		});
		await this.props.getVehicleModels(key.key, '2019');
		this.setState({
			modelsLoading: false,
			modelPickerItems: this.props.vehicleModels,
			displayErrorMessage: this.props.errMessage === null || this.props.errMessage === undefined ? false : true
		});
	}

	private _onYearPickerSelect = (key: string) => {
		this.setState({
			yearPickerVisible: false,
			selectedYear: key.label
		});
	}

	private _onFuleTypeSelect = (key: string) => {
		this.setState({
			fuelTypePickerVisible: false,
			selectedFuelType: key.label
		});
	}

	private _onFuleTypeCancel = (): void => {
		this.setState({
			fuelTypePickerVisible: false
		});
	}

	private _onYearPickerCancel = (): void => {
		this.setState({
			yearPickerVisible: false
		});
	}

	private _onModelPickerCancel = (): void => {
		this.setState({
			modelPickerVisible: false
		});
	}

	private _onMakePickerCancel = (): void => {
		this.setState({
			makePickerVisible: false
		});
	}

	private _onModelPickerPress = (): void => {
		if (typeof this.state.selectedVehicleMake === 'object' && this.state.selectedVehicleMake !== null && this.state.selectedYear !== '') {
			this._openVehicleModelPicker();
		}
	}

	private _getAllYearsBetweenDates = (): number[] => {
		const startDate = new Date('01 ' + 'Jan 1980');
		const yearOne = startDate.getFullYear();

		const currentDate = new Date();
		const yearTwo = currentDate.getFullYear();

		const yearsArray: number[] = [];

	   for (let i = yearOne; i <= yearTwo; i += 1) yearsArray.push(i);

	   return yearsArray;
	}

	public render(): ReactElement {
		return (
			<ScrollView contentContainerStyle={ styles.container }>
				{ this.state.loading ? <ActivityIndicator animating={ true }/> :
					this.props.applied ? <Text style={ styles.text }>Thanks for applying you will be notified soon</Text> :
					<View style={ styles.formView }>
						<ModalFilterPicker
						options={ this._getItemsForMakePicker() }
						visible={ this.state.makePickerVisible }
						onSelect={ this._onMakePickerSelect }
						onCancel={ this._onMakePickerCancel }
						/>
						<ModalFilterPicker
						options={ this._getItemsForYearPicker() }
						visible={ this.state.yearPickerVisible }
						onSelect={ this._onYearPickerSelect }
						onCancel={ this._onYearPickerCancel }
						/>
						<ModalFilterPicker
						options={ this._getItemsForFuleTypePicker() }
						visible={ this.state.fuelTypePickerVisible }
						onSelect={ this._onFuleTypeSelect }
						onCancel={ this._onFuleTypeCancel }
						/>
						<ModalFilterPicker
						options={ this._getItemsForModelPicker() }
						visible={ this.state.modelPickerVisible && !this.state.displayErrorMessage }
						onSelect={ this._onModelPickerSelect }
						onCancel={ this._onModelPickerCancel }
						/>
						<List.Item
								title='Choose a vehicle make'
								description={ this.state.selectedVehicleMake ? `"${this.state.selectedVehicleMake.Make_Name}" selected` : null }
								onPress={ this._openVehicleMakePicker }
								style= { styles.listItem}
								right={ (props) => <List.Icon { ...props } icon='chevron-down'/>}
							/>
						<List.Item
								title='Choose the year of manufacture'
								description={ this.state.selectedYear !== '' ? `"${this.state.selectedYear}" selected` : '' }
								onPress={ this._openYearPicker }
								style= { styles.listItem }
								right={ (props) => <List.Icon { ...props } icon='chevron-down'/>}
							/>
						<List.Item
								title='Choose the vehicle fule type'
								description={ this.state.selectedFuelType !== '' ? `"${this.state.selectedFuelType}" selected` : '' }
								onPress={ this._openFuleTypePicker }
								style= { styles.listItem}
								right={ (props) => <List.Icon { ...props } icon='chevron-down'/>}
							/>
						<List.Item
								title='Vehicle Model Picker'
								description={ this.state.selectedVehicleModel ? `"${this.state.selectedVehicleModel.Model_Name}" selected` : null  }
								onPress={ this._onModelPickerPress }
								style= { styles.listItem}
								right={ (props) =>
									this.state.modelsLoading ? <ActivityIndicator animating={ true }/> : <List.Icon { ...props } icon='chevron-down'/> }
							/>
						{ this.state.displayErrorMessage ? <Text style={ styles.errText }>There is no models for the selected make and year</Text> :
						<View></View> }

						<TouchableOpacity style= { styles.button }
							onPress={ this._apply }
							disabled={ this.state.selectedVehicleMake === null || this.state.selectedVehicleModel === null ||
								this.state.selectedYear === '' || this.state.selectedFuelType === '' ? true : false }
						>
							<Text style={ styles.buttonText }>Apply</Text>
						</TouchableOpacity>
					</View>
				}

			</ScrollView>
		);
	}
}

const mapStateToProps = (state: AppState): DriverApplicationState & VehicleMakesAndModelsState => ({
	...state.driverApplicationReducer,
	...state.vehicleMakesAndModelsReducer
});

export default connect(mapStateToProps, { apply, checkIfApplied, getVehicleMakes, getVehicleModels })(DriverApplication);
