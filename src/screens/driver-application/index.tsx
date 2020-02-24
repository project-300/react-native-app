import React, { Component, ReactElement } from 'react';
import {
	Text,
	ScrollView,
	TouchableOpacity,
	View
} from 'react-native';
import { Spinner, Picker } from 'native-base';
import { connect } from 'react-redux';
import styles from './styles';
import { Props, State } from './interfaces';
import { apply, checkIfApplied, getVehicleMakes, getVehicleModels } from '../../redux/actions';
import { AppState } from '../../store';
import { DriverApplicationState, VehicleMakesAndModelsState } from '../../types/redux-reducer-state-types';
import ModalFilterPicker, { ModalFilterPickerOption } from 'react-native-modal-filter-picker';

export class DriverApplication extends Component<Props, State> {

	public constructor(props: Props) {
		super(props);
		this.state = {
			modelPickerVisible: false,
			makePickerVisible: false,
			modelPickerItems: []
		};
	}

	public async componentDidMount(): Promise<void> {
		await this.props.checkIfApplied();
		if (this.props.applied) {
			await this.props.getVehicleMakes();
		}
	}

	// private _checkIfApplied = (): ReactElement => {
	// 	return (
	// 		<Text>You have already applied, you will be notified soon</Text>
	// 	);
	// }

	// private _checkIfApplied = async (): Promise<void> => {
	// 	await this.props.checkIfApplied();
	// }

	private _getItemsForMakePicker = (): ModalFilterPickerOption[] => {
		return this.props.vehicleMakes.map((v) => {
			const makeId = v.Make_ID.toString();
			const option: ModalFilterPickerOption = {
				label: v.Make_Name,
				key: makeId
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

	private _apply = async (): Promise<void> => {
		await this.props.apply();
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

	private _onModelPickerSelect = (key: string) => {
		this.setState({
			modelPickerVisible: false
		});
	}

	private _onMakePickerSelect = async (key: string) => {
		console.log(key.key);
		await this.props.getVehicleModels(key.key, '2019');
		console.log(this.props.vehicleModels);
		this.setState({
			makePickerVisible: false,
			modelPickerItems: this.props.vehicleModels
		});
	}

	private _onModelPickerCancel = () => {
		this.setState({
			modelPickerVisible: false
		});
	}

	private _onMakePickerCancel = () => {
		this.setState({
			makePickerVisible: false
		});
	}

	public render(): ReactElement {
		return (
			<ScrollView contentContainerStyle={ styles.container }>
				<View>
					<ModalFilterPicker
					options={ this._getItemsForMakePicker() }
					visible={ this.state.makePickerVisible }
					onSelect={ this._onMakePickerSelect }
					onCancel={ this._onMakePickerCancel }
					/>
					<ModalFilterPicker
					options={ this._getItemsForModelPicker() }
					visible={ this.state.modelPickerVisible }
					onSelect={ this._onModelPickerSelect }
					onCancel={ this._onModelPickerCancel }
					/>
					<TouchableOpacity
					onPress={ this._openVehicleMakePicker }
					style={ styles.button }><Text style={ styles.buttonText }>makes</Text>
					</TouchableOpacity>
					<TouchableOpacity
					onPress={ this._openVehicleModelPicker }
					style={ styles.button }><Text style={ styles.buttonText }>models</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		);
	}
}
{ /*

	{ this.props.applied ?
	<Text style={ styles.text }>Thanks for applying you will be notified soon</Text> :
		<View>
			<Text
				style={ styles.text }>
				Want to become a driver? Apply below.
			</Text>
			<TouchableOpacity
				onPress={ this._apply }
				style={ styles.button }>
				<Text style={ styles.buttonText }>Apply</Text>
			</TouchableOpacity>
			<Picker>
				{ this._getVehicles}
			</Picker>
		</View>
	} */}
const mapStateToProps = (state: AppState): DriverApplicationState & VehicleMakesAndModelsState => ({
	...state.driverApplicationReducer,
	...state.vehicleMakesAndModelsReducer
});

export default connect(mapStateToProps, { apply, checkIfApplied, getVehicleMakes, getVehicleModels })(DriverApplication);
