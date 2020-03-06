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
import { apply, checkIfApplied } from '../../redux/actions';
import { AppState } from '../../store';
import { DriverApplicationState, VehicleMakesAndModelsState } from '../../types/redux-reducer-state-types';
import ModalFilterPicker, { ModalFilterPickerOption } from 'react-native-modal-filter-picker';
import { List, ActivityIndicator, TextInput } from 'react-native-paper';

export class DriverApplication extends Component<Props, State> {

	public constructor(props: Props) {
		super(props);
		this.state = {
			yearPickerVisible: false,
			fuelTypePickerVisible: false,
			loading: false,
			selectedYear: '',
			selectedFuelType: '',
			selectedVehicleMake: '',
			selectedVehicleModel: '',
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
		const vehicle: any = {
			make: this.state.selectedVehicleMake,
			model: this.state.selectedVehicleModel,
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
						<TextInput
							label='Choose the make of the vehicle'
							value={ this.state.selectedVehicleMake}
							onChangeText={ (text: string): void => this.setState({ selectedVehicleMake: text})}
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
						<TextInput
							label='Choose the model of the vehicle'
							value={ this.state.selectedVehicleModel}
							onChangeText={ (text: string): void => this.setState({ selectedVehicleModel: text})}
						/>

						<TouchableOpacity style= { styles.button }
							onPress={ this._apply }
							disabled={ this.state.selectedVehicleMake === '' || this.state.selectedVehicleModel === '' ||
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

const mapStateToProps = (state: AppState): DriverApplicationState => ({
	...state.driverApplicationReducer
});

export default connect(mapStateToProps, { apply, checkIfApplied })(DriverApplication);
