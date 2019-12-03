import React, { Component, ReactElement } from 'react';
import {
	FlatList,
	ScrollView,
	Text,
	TouchableOpacity,
	View
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { CreateJourney, Props, State } from './interfaces';
import { HomeState } from '../../types/redux-reducer-state-types';
import { AppState } from '../../store';
import MapView, { PROVIDER_GOOGLE, Marker, LatLng } from 'react-native-maps';
import { Container, Form, Item, Input, H1, Label, Button, Icon, Grid, Col } from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { GooglePlace } from '../../types/maps';
import { googlePlacesSearch, googlePlacesSearchClearResults } from '../../redux/actions';
import DatesTimes from '../../services/dates-times';
import FAIcon from 'react-native-vector-icons/FontAwesome5';

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
			isDateTimePickerVisible: false,
			isSearching: false,
			openLocationPanel: false,
			openConfirmPanel: false,
			locationType: 'ORIGIN',
			placesFieldText: '',
			origin: null,
			destination: null,
			totalNoOfSeats: 1,
			pricePerSeat: 0,
			leavingAt: new Date()
		};
	}

	private _searchPlaces = async (query: string): Promise<void> => {
		this.setState({ isSearching: true, placesFieldText: query });
		await this.props.googlePlacesSearch(query);
	}

	private _createJourney = (): void => {
		const { origin, destination, totalNoOfSeats, pricePerSeat, leavingAt } = this.state;
		const journey: CreateJourney = {
			origin,
			destination,
			totalNoOfSeats,
			pricePerSeat,
			times: {
				leavingAt
			}
		};

		console.log(journey);
	}

	private _journeyForm = (): ReactElement => {
		return <Form>
			<TouchableOpacity onPress={ this._chooseOrigin }>
				<Text style={ { fontSize: 20 } }>{ this.state.origin && this.state.origin.structured_formatting.main_text || 'Choose Origin' }</Text>
				<FAIcon name={ 'edit' } size={ 20 } style={ { position: 'absolute', right: 0, color: 'grey' } } />
			</TouchableOpacity>

			<View style={ styles.divider } />

			<TouchableOpacity onPress={ this._chooseDestination }>
				<Text style={ { fontSize: 20 } }>{ this.state.destination && this.state.destination.structured_formatting.main_text || 'Choose Destination' }</Text>
				<FAIcon name={ 'edit' } size={ 20 } style={ { position: 'absolute', right: 0, color: 'grey' } } />
			</TouchableOpacity>

			<View style={ styles.divider } />

			<Text style={ { fontSize: 16, marginBottom: 20 } }>How many seats are available?</Text>
			<Grid>
				<Col>
					<Button block light onPress={ (): void => this._updateNoOfSeats(-1) }>
						<Text>
							<FAIcon name={ 'minus' } />
						</Text>
					</Button>
				</Col>
				<Col style={ { alignItems: 'center' } }>
					<Text style={ { fontSize: 20, fontWeight: 'bold', marginTop: 10 } }>{ this.state.totalNoOfSeats }</Text>
				</Col>
				<Col>
					<Button block light onPress={ (): void => this._updateNoOfSeats(1) }>
						<FAIcon name={ 'plus' } />
					</Button>
				</Col>
			</Grid>

			<View style={ styles.divider } />

			<Text style={ { fontSize: 16, marginVertical: 20 } }>Cost per seat?</Text>
			<Grid>
				<Col>
					<Button block light onPress={ (): void => this._updatePrice(-1) }>
						<Text>
							<FAIcon name={ 'minus' } />
						</Text>
					</Button>
				</Col>
				<Col style={ { alignItems: 'center' } }>
					<Text style={ { fontSize: 20, fontWeight: 'bold', marginTop: 10 } }>{ this.state.pricePerSeat ? `€${this.state.pricePerSeat}` : 'Free' }</Text>
				</Col>
				<Col>
					<Button block light onPress={ (): void => this._updatePrice(1) }>
						<FAIcon name={ 'plus' } />
					</Button>
				</Col>
			</Grid>

			<View style={ styles.divider } />

			<Text style={ { fontSize: 16, marginVertical: 20 } }>What time are you leaving?</Text>

			<TouchableOpacity onPress={ this._showDateTimePicker }>
				<Text style={ { fontSize: 20 } }>{ this._leavingAtString() }</Text>
				<FAIcon name={ 'edit' } size={ 20 } style={ { position: 'absolute', right: 0, color: 'grey' } } />
			</TouchableOpacity>

			<DateTimePicker
				mode={ 'datetime' }
				isVisible={ this.state.isDateTimePickerVisible }
				onConfirm={ this._handleDatePicked }
				onCancel={ this._hideDateTimePicker }
				minimumDate={ new Date() }
				is24Hour={ true }
			/>
		</Form>;
	}

	private _chooseLocationPanel = (locationType: string): ReactElement => {
		return <View>
			<TouchableOpacity onPress={ this._closeLocationPanel }>
				<Icon name='arrow-back' />
			</TouchableOpacity>
			<H1 style={ { alignSelf: 'center' } }>{ locationType }</H1>
			<Item floatingLabel>
				<Label>{ locationType }</Label>
				<Input onChangeText={ (query: string): Promise<void> => this._searchPlaces(query) } />
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

			<FlatList
				data={ this.props.places }
				extraData={ this.state }
				renderItem={ this._renderPlaceRow }
				keyExtractor={ (item: GooglePlace): string => item.id }
				style={ styles.placesList }
			/>
		</View>;
	}

	private _confirmPanel = (): ReactElement => {
		if (!this.state.origin || !this.state.destination) return <View><Text>Origin or Destination is missing</Text></View>;

		return <View>
			<Text>You are travelling from { this.state.origin.structured_formatting.main_text } to { this.state.destination.structured_formatting.main_text }.</Text>
			<Text>There are { this.state.totalNoOfSeats } seats available.</Text>
			<Text>Price per seat: €{ this.state.pricePerSeat }</Text>
			<Text>You will be departing from { this.state.origin.structured_formatting.main_text } at { DatesTimes.hoursMinutes(this.state.leavingAt) } on { DatesTimes.readableDate(this.state.leavingAt)  }</Text>
		</View>;
	}

	private _renderPlaceRow = ({ item, index }: { item: GooglePlace; index: number }): ReactElement<TouchableOpacity> => {
		return (
			<TouchableOpacity style={ styles.placeItem } onPress={ (): void => this._selectPlace(item) }>
				<Text style={ { fontWeight: 'bold', fontSize: 16 } }>{ item.structured_formatting.main_text }</Text>
				<Text style={ { fontSize: 14 } }>{ item.structured_formatting.secondary_text }</Text>
			</TouchableOpacity>
		);
	}

	private _selectPlace = (place: GooglePlace): void => {
		if (this.state.locationType === ORIGIN) this.setState({ origin: place });
		if (this.state.locationType === DESTINATION) this.setState({ destination: place });
		this.setState({ isSearching: false, openLocationPanel: false, placesFieldText: '' });
		this.props.googlePlacesSearchClearResults();
	}

	private _formValid = (): boolean => {
		const { totalNoOfSeats, origin, destination } = this.state;

		if (!totalNoOfSeats || !origin || !destination) return false;
		return true;
	}

	private _leavingAtString = (): string => `${DatesTimes.readableDate(this.state.leavingAt)} at ${DatesTimes.hoursMinutes(this.state.leavingAt)}`;

	private _chooseOrigin = (): void => this.setState({ openLocationPanel: true, locationType: ORIGIN });

	private _closeLocationPanel = (): void => this.setState({ openLocationPanel: false });

	private _chooseDestination = (): void => this.setState({ openLocationPanel: true, locationType: DESTINATION });

	private _showDateTimePicker = (): void => this.setState({ isDateTimePickerVisible: true });

	private _hideDateTimePicker = (): void => this.setState({ isDateTimePickerVisible: false });

	private _showConfirmPanel = (): void => this.setState({ openConfirmPanel: true });

	private _openMap = (): void => this.setState({ formTop: undefined, droppingMarker: true });

	private _closeMap = (): void => this.setState({ formTop: 0, droppingMarker: false });

	private _updateNoOfSeats = (count: number): void => {
		const totalNoOfSeats: number = this.state.totalNoOfSeats + count;
		if (totalNoOfSeats < 1 || totalNoOfSeats > 9) return;
		this.setState({ totalNoOfSeats });
	}

	private _updatePrice = (count: number): void => {
		if (this.state.pricePerSeat + count < 0) return;
		this.setState({ pricePerSeat: this.state.pricePerSeat + count });
	}

	private _handleDatePicked = (date: Date): void => {
		this.setState({ leavingAt: date });
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

				<ScrollView style = { [ styles.form, { top: this.state.formTop } ] }>
					{
						!this.state.droppingMarker &&
							<View>
								{ !this.state.openLocationPanel && !this.state.openConfirmPanel && this._journeyForm() }
								{ this.state.openLocationPanel && !this.state.openConfirmPanel &&
									this._chooseLocationPanel(this.state.locationType === 'ORIGIN' ? 'Origin' : 'Destination') }
								{ this.state.openConfirmPanel && !this.state.openLocationPanel && this._confirmPanel() }
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
				</ScrollView>

				{
					!this.state.droppingMarker && !this.state.openLocationPanel && !this.state.openConfirmPanel &&
						<TouchableOpacity
							style={ [ styles.continueButton, this._formValid() ? styles.buttonValid : styles.buttonInvalid ] }
							onPress={ this._showConfirmPanel }
							disabled={ !this._formValid() }
						>
							<Text>Continue</Text>
						</TouchableOpacity>
				}

				{
					this.state.openConfirmPanel &&
						<TouchableOpacity
							style={ [ styles.continueButton, styles.buttonValid ] }
							onPress={ this._createJourney }
						>
							<Text>Create Journey</Text>
						</TouchableOpacity>
				}
			</Container>
		);
	}
}

const mapStateToProps = (state: AppState): HomeState => ({
	...state.newJourneyReducer
});

export default connect(mapStateToProps, { googlePlacesSearch, googlePlacesSearchClearResults })(NewJourney);
