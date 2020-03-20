import React, { Component, ReactElement } from 'react';
import {
	Text,
	ScrollView,
	View,
	Picker
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Props, State } from './interfaces';
import { apply, checkIfApplied } from '../../redux/actions';
import { AppState } from '../../store';
import { DriverApplicationState } from '../../types/redux-reducer-state-types';
import { Button, TextInput } from 'react-native-paper';
import { Colours, ContrastTheme, Theme } from '../../constants/theme';
import formStyles from '../../styles/forms';
import { ActivityIndicator } from 'react-native-paper';

export class DriverApplication extends Component<Props, State> {

	public constructor(props: Props) {
		super(props);
		this.state = {
			yearPickerVisible: false,
			fuelTypePickerVisible: false,
			selectedYear: '',
			selectedFuelType: '',
			selectedVehicleMake: '',
			selectedVehicleModel: '',
			isChecking: false
		};
	}

	public async componentDidMount(): Promise<void> {
		this.setState({ isChecking: true});
		await this.props.checkIfApplied();
		this.setState({ isChecking: false});
	}

	private _getItemsForYearPicker(): ReactElement[] {
		const years: number[] = this._getAllYearsBetweenDates();
		const pickerItems: ReactElement[] =
			years.map((y: number, index: number) => <Picker.Item label={ y.toString() } value={ y.toString() } />);

		return (
			pickerItems.reverse()
		);
	}

	private _getItemsForFuleTypePicker(): ReactElement[] {
		const fuleTypes: string[] = ['Petrol', 'Diesel', 'Petrol Hybrid', 'Diesel Hybrid', 'Electric'];
		const pickerItems: ReactElement[] =
			fuleTypes.map((ft: string) => <Picker.Item label={ ft } value={ ft } />);

		return (
			pickerItems
		);
	}

	private _apply = async (): Promise<void> => {
		const vehicle: any = {
			make: this.state.selectedVehicleMake,
			model: this.state.selectedVehicleModel,
			yearOfManufacture: parseInt(this.state.selectedYear, 10),
			fuelType: this.state.selectedFuelType as 'Petrol' | 'Diesel' | 'Petrol Hybrid' | 'DieselHybrid' | 'Electric'
		};

		await this.props.apply(vehicle);
		await this.props.checkIfApplied();
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

	private _renderApplicationForm(): ReactElement {
		return (
			<View style={ styles.formView }>
				<TextInput
					style={ { marginBottom: 20 } }
					mode={ 'outlined' }
					theme={ ContrastTheme }
					label='Vehicle Make'
					value={ this.state.selectedVehicleMake }
					onChangeText={ (text: string): void => this.setState({ selectedVehicleMake: text })}
				/>

				<TextInput
					style={ { marginBottom: 20 } }
					mode={ 'outlined' }
					theme={ ContrastTheme }
					label='Vehicle Model'
					value={ this.state.selectedVehicleModel }
					onChangeText={ (text: string): void => this.setState({ selectedVehicleModel: text })}
				/>

				<Picker
					selectedValue={ this.state.selectedYear}
					onValueChange={ (itemValue) => this.setState({ selectedYear: itemValue}) }
				>
					{ this._getItemsForYearPicker() }
				</Picker>

				<Picker
					selectedValue={ this.state.selectedFuelType}
					onValueChange={ (itemValue) => this.setState({ selectedFuelType: itemValue}) }
				>
					{ this._getItemsForFuleTypePicker() }
				</Picker>

				<Button
					mode={ 'contained' }
					theme={ ContrastTheme }
					style={ [formStyles.button, { marginTop: 20 }] }
					onPress={ this._apply }
					disabled={ this.state.selectedVehicleMake === '' || this.state.selectedVehicleModel === '' ||
						this.state.selectedYear === '' || this.state.selectedFuelType === '' }
					icon={ (icon) => <ActivityIndicator animating={ this.props.isApplying } /> }
				>
					{ this.props.isApplying ? <Text></Text> : <Text>Apply</Text>}
				</Button>
			</View>
		);
	}

	public render(): ReactElement {
		return (
			<ScrollView contentContainerStyle={ styles.container }>

				{
					this.state.isChecking ?
						<ActivityIndicator
							animating={ this.state.isChecking }
							color={ Theme.accent }
							size={ 34 }
							style={ styles.spinner }
						/>
						: this.props.applied ?
							<View style={ { backgroundColor: Colours.white, paddingVertical: 40, paddingHorizontal: 20, borderWidth: 0.5, borderColor: '#CCC', borderRadius: 4 } }>
								<Text style={ [ styles.text, { textAlign: 'center' } ] }>
									Thanks for making an application, you will be notified soon
								</Text>
								<Button
									theme={ ContrastTheme }
									mode={ 'outlined' }
									style={ { marginTop: 40 } }
									onPress={ (): boolean => this.props.navigation.navigate('SearchJourneys') }
								>Go Back</Button>
							</View>
							: this._renderApplicationForm()
				}

			</ScrollView>
		);
	}
}

const mapStateToProps = (state: AppState): DriverApplicationState => ({
	...state.driverApplicationReducer
});

export default connect(mapStateToProps, { apply, checkIfApplied })(DriverApplication);
