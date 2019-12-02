import React, { Component, ReactElement } from 'react';
import {
	Text,
	View
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Props, State, Place } from './interfaces';
import { HomeState } from '../../types/redux-reducer-state-types';
import { AppState } from '../../store';
import MapView, { PROVIDER_GOOGLE, Marker, LatLng } from 'react-native-maps';
import { Container, Form, Item, Input, H1, Label, Button } from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';

const ORIGIN: string = 'ORIGIN';
const DESTINATION: string = 'DESTINATION';

export class NewJourney extends Component<Props, State> {

	public constructor(props: Props) {
		super(props);

		const positionStart: LatLng = {
			latitude: 54.2796206,
			longitude: -8.4634921
		};
		const positionEnd: LatLng = {
			latitude: 53.392075,
			longitude: -6.282735
		};
		const midLatitude: number = (positionStart.latitude + positionEnd.latitude) / 2;
		const midLongitude: number = (positionStart.longitude + positionEnd.longitude) / 2;
		const delta: number =
			Math.sqrt(Math.pow(positionStart.latitude - positionEnd.latitude, 2) +
		  	Math.pow(positionStart.longitude - positionEnd.longitude, 2)) + 0.5;

		this.state = {
			formTop: 0,
			positionStart,
			positionEnd,
			journeyRegion: {
				latitude: midLatitude,
				longitude: midLongitude,
				latitudeDelta: delta,
					longitudeDelta: delta
			},
			places: [],
			isDateTimePickerVisible: false,
			isSearching: false,
			openLocationPanel: false,
			locationType: 'ORIGIN',
			placesFieldText: ''
		};
	}

	private _openMap = (): void => this.setState({ formTop: undefined, droppingMarker: true });

	private _closeMap = (): void => this.setState({ formTop: 0, droppingMarker: false });

	private _journeyForm = (): ReactElement => {
		return <Form>
			<Button block light onPress={ this._chooseOrigin }>
				<Text>Choose Origin</Text>
			</Button>

			<Button block light onPress={ this._chooseDestination }>
				<Text>Choose Destination</Text>
			</Button>

			<View style={ styles.divider } />

			<Text>What time are you leaving?</Text>
			<Item floatingLabel>
				<Label>Departure Time</Label>
				<Input onFocus={ this._showDateTimePicker } />
			</Item>

			<DateTimePicker
				mode={ 'datetime' }
				isVisible={ this.state.isDateTimePickerVisible }
				onConfirm={ this._handleDatePicked }
				onCancel={ this._hideDateTimePicker }
			/>
		</Form>;
	}

	private _chooseLocationPanel = (locationType: string): ReactElement => {
		return <View>
			<H1 style={ { alignSelf: 'center' } }>{ locationType }</H1>
			<Item floatingLabel>
				<Label>{ locationType }</Label>
				<Input onChangeText={ (query: string): Promise<void> => [ ] } />
			</Item>
			{
				!this.state.placesFieldText &&
					<View style={ { alignItems: 'center' } }>
						<Text style={ { marginVertical: 10 } }>OR</Text>
						<Button block light onPress={ this._openMap }>
							<Text>Drop Marker</Text>
						</Button>
					</View>
			}
		</View>;
	}

	private _chooseOrigin = (): void => this.setState({ openLocationPanel: true, locationType: ORIGIN });

	private _chooseDestination = (): void => this.setState({ openLocationPanel: true, locationType: DESTINATION });

	private _showDateTimePicker = (): void => this.setState({ isDateTimePickerVisible: true });

	private _hideDateTimePicker = (): void => this.setState({ isDateTimePickerVisible: false });

	private _handleDatePicked = (date: Date): void => {
		// this.setState({ })
		this._hideDateTimePicker();
	}

	public render(): ReactElement {
		return (
			<Container style={ styles.container }>
				<MapView
					style = { styles.map }
					provider = { PROVIDER_GOOGLE }
					initialRegion = { this.state.journeyRegion }
				>
					<Marker coordinate={ this.state.positionStart } />
				</MapView>

				<View style = { [ styles.form, { top: this.state.formTop } ]}>
					{
						!this.state.droppingMarker &&
							<View>
								{ !this.state.openLocationPanel && this._journeyForm() }
								{ this.state.openLocationPanel && this._chooseLocationPanel(this.state.locationType === 'ORIGIN' ? 'Origin' : 'Destination') }
							</View>
					}

					{
						this.state.droppingMarker &&
							<View style={ { alignItems: 'center' } }>
								<Text style={ { marginBottom: 10 } }>Click on the map to drop a marker</Text>
								<Button light block onPress={ this._closeMap }>
									<Text>Cancel</Text>
								</Button>
							</View>
					}
				</View>
			</Container>
		);
	}
}

const mapStateToProps = (state: AppState): HomeState => ({ });

export default connect(mapStateToProps, { })(NewJourney);
