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
import { Props, State } from './interfaces';
import { HomeState } from '../../types/redux-reducer-state-types';
import { AppState } from '../../store';
import MapView, { PROVIDER_GOOGLE, Marker, LatLng, MapEvent, Polyline } from 'react-native-maps';
import { Container, Form, Item, Input, H1, Label, Button, Icon, Grid, Col } from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { GooglePlace } from '../../types/maps';
import {
	googlePlacesSearch,
	getGooglePlaceDetails,
	googlePlacesSearchClearResults,
	selectGooglePlace,
	createJourney,
	clearNewJourneyFormDetails,
	getPlaceByMarker,
	findRoute
} from '../../redux/actions';
import DatesTimes from '../../services/dates-times';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import { Coords, CreateJourney, Place } from '@project-300/common-types';

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
			locationType: ORIGIN,
			placesFieldText: '',
			totalNoOfSeats: 1,
			pricePerSeat: 0,
			leavingAt: new Date()
		};
	}

	public componentWillUnmount(): void {
		this.props.clearNewJourneyFormDetails();
	}

	private _searchPlaces = async (query: string): Promise<void> => {
		this.setState({ isSearching: true, placesFieldText: query });
		await this.props.googlePlacesSearch(query);
	}

	private _createJourney = async (): Promise<void> => {
		const { totalNoOfSeats, pricePerSeat, leavingAt } = this.state;
		const { originPlaceDetails, destinationPlaceDetails, route } = this.props;

		if (!originPlaceDetails) return console.log(1);
		if (!destinationPlaceDetails) return console.log(2);
		if (!originPlaceDetails.geometry || !originPlaceDetails.geometry.location) return console.log(3);

		const origin: Place = {
			latitude: originPlaceDetails.geometry.location.lat,
			longitude: originPlaceDetails.geometry.location.lng,
			name: originPlaceDetails.name
		};

		const destination: Place = {
			latitude: destinationPlaceDetails.geometry.location.lat,
			longitude: destinationPlaceDetails.geometry.location.lng,
			name: destinationPlaceDetails.name
		};

		const journey: CreateJourney = {
			origin,
			destination,
			totalNoOfSeats,
			pricePerSeat,
			plannedRoute: route,
			times: {
				leavingAt
			}
		};

		console.log(journey);

		const created: boolean = await this.props.createJourney(journey);
		if (created) {
			this.props.clearNewJourneyFormDetails();
			this.props.navigation.navigate('Home');
		}
	}

	private _journeyForm = (): ReactElement => {
		return <Form>
			<TouchableOpacity onPress={ this._chooseOrigin }>
				<Text style={ { fontSize: 20 } }>{ this.props.originPlaceDetails && this.props.originPlaceDetails.name || 'Choose Origin' }</Text>
				<FAIcon name={ 'edit' } size={ 20 } style={ { position: 'absolute', right: 0, color: 'grey' } } />
			</TouchableOpacity>

			<View style={ styles.divider } />

			<TouchableOpacity onPress={ this._chooseDestination }>
				<Text style={ { fontSize: 20 } }>{ this.props.destinationPlaceDetails && this.props.destinationPlaceDetails.name || 'Choose Destination' }</Text>
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
				<Input onChangeText={ (query: string): Promise<void> => this._searchPlaces(query) } autoCorrect={ false } />
			</Item>
			{
				!this.state.placesFieldText &&
					<View style={ { alignItems: 'center' } }>
						<Text style={ { marginVertical: 40, fontWeight: 'bold' } }>OR</Text>
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
		if (!this.props.originPlaceDetails || !this.props.destinationPlaceDetails) return <View><Text>Origin or Destination is missing</Text></View>;

		return <View>
			<Text style={ styles.confirmRow }>You are travelling from <Text style={ styles.bold }>{ this.props.originPlaceDetails.name }</Text> to <Text style={ styles.bold }>{ this.props.destinationPlaceDetails.name }</Text>.</Text>
			<Text style={ styles.confirmRow }>There are <Text style={ styles.bold }>{ this.state.totalNoOfSeats }</Text> seats available.</Text>
			<Text style={ styles.confirmRow }>Price per seat: <Text style={ styles.bold }>{ this.state.pricePerSeat ? `€${this.state.pricePerSeat}` : 'Free' }</Text></Text>
			<Text style={ styles.confirmRow }>You will be departing from <Text style={ styles.bold }>{ this.props.originPlaceDetails.name }</Text> at <Text style={ styles.bold }>{ DatesTimes.hoursMinutes(this.state.leavingAt) }</Text> on <Text style={ styles.bold }>{ DatesTimes.readableDate(this.state.leavingAt)  }</Text></Text>
		</View>;
	}

	private _renderPlaceRow = ({ item, index }: { item: GooglePlace; index: number }): ReactElement<TouchableOpacity> => {
		return (
			<TouchableOpacity style={ styles.placeItem } onPress={ async (): Promise<void> => await this._selectPlace(item) }>
				<Text style={ { fontWeight: 'bold', fontSize: 16 } }>{ item.structured_formatting.main_text }</Text>
				<Text style={ { fontSize: 14 } }>{ item.structured_formatting.secondary_text }</Text>
			</TouchableOpacity>
		);
	}

	private _selectPlace = async (place: GooglePlace): Promise<void> => {
		this.setState({ isSearching: false, openLocationPanel: false, placesFieldText: '' });
		this.props.googlePlacesSearchClearResults();
		await this.props.selectGooglePlace(place, this.state.locationType);
		await this.props.getGooglePlaceDetails(place.place_id, this.state.locationType);
		this._plotRoute();
	}

	private _formValid = (): boolean => {
		const { totalNoOfSeats } = this.state;
		const { originPlaceDetails, destinationPlaceDetails } = this.props;

		if (!totalNoOfSeats || !originPlaceDetails || !destinationPlaceDetails) return false;
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

	private _dropMarker = async (coords: Coords): Promise<void> => {
		await this.props.getPlaceByMarker(coords, this.state.locationType);
		this._plotRoute();
	}

	private _plotRoute = async (): Promise<void> => {
		if (!this.props.originMarkerCoords || !this.props.destinationMarkerCoords) return;
		await this.props.findRoute(this.props.originMarkerCoords, this.props.destinationMarkerCoords);
	}

	private _confirmMarkerDrop = (): void => {
		this._closeMap();
		this._closeLocationPanel();
	}

	public render(): ReactElement {
		const { openLocationPanel, openConfirmPanel, droppingMarker, locationType } = this.state;
		const { originMarkerCoords, destinationMarkerCoords, originPlaceDetails, destinationPlaceDetails } = this.props;

		return (
			<Container style={ styles.container }>
				{
					droppingMarker &&
						<View style={ styles.locationNameHeader }>
							<Text style={ { fontWeight: 'bold', fontSize: 16, color: 'white' } }>{
								(locationType === ORIGIN && originPlaceDetails && originPlaceDetails.name) ||
								(locationType === DESTINATION && destinationPlaceDetails && destinationPlaceDetails.name)
							}</Text>
						</View>
				}

				<MapView
					style = { styles.map }
					provider = { PROVIDER_GOOGLE }
					initialRegion = { this.state.journeyRegion }
					onPress={ (e: MapEvent): Promise<void> => this._dropMarker(e.nativeEvent.coordinate) }
				>
					{
						originMarkerCoords &&
							<Marker
								coordinate={ originMarkerCoords }
								title={ originPlaceDetails && originPlaceDetails.name }
								draggable
							/>
					}
					{
						destinationMarkerCoords &&
							<Marker
								coordinate={ destinationMarkerCoords }
								title={ destinationPlaceDetails && destinationPlaceDetails.name }
								draggable
							/>
					}

					<Polyline
						coordinates={ this.props.route }
						strokeColor={ 'green' }
						strokeWidth={ 4 }
					/>
				</MapView>

				<ScrollView style = { [ styles.form, { top: this.state.formTop } ] }>
					{
						!droppingMarker &&
							<View>
								{ !openLocationPanel && !openConfirmPanel && this._journeyForm() }
								{
									openLocationPanel && !openConfirmPanel &&
									this._chooseLocationPanel(locationType === ORIGIN ? 'Origin' : 'Destination')
								}
								{ openConfirmPanel && !openLocationPanel && this._confirmPanel() }
							</View>
					}

					{
						droppingMarker &&
							<View style={ { alignItems: 'center' } }>
								<Text style={ { marginBottom: 20 } }>Click on the map to drop a marker</Text>

								<Button light block onPress={ this._confirmMarkerDrop }>
									<Text>Confirm</Text>
								</Button>

								<Text style={ { alignSelf: 'center', marginTop: 20 } } onPress={ this._closeMap }>
									<Text>Cancel</Text>
								</Text>
							</View>
					}
				</ScrollView>

				{
					!droppingMarker && !openLocationPanel && !openConfirmPanel &&
						<TouchableOpacity
							style={ [ styles.continueButton, this._formValid() ? styles.buttonValid : styles.buttonInvalid ] }
							onPress={ this._showConfirmPanel }
							disabled={ !this._formValid() }
						>
							<Text style={ { color: 'white', fontWeight: 'bold' } }>Continue</Text>
						</TouchableOpacity>
				}

				{
					openConfirmPanel &&
						<TouchableOpacity
							style={ [ styles.continueButton, styles.buttonValid ] }
							onPress={ this._createJourney }
						>
							<Text style={ { color: 'white', fontWeight: 'bold' } }>Create Journey</Text>
						</TouchableOpacity>
				}
			</Container>
		);
	}
}

const mapStateToProps = (state: AppState): HomeState => ({
	...state.newJourneyReducer
});

export default connect(mapStateToProps, {
	googlePlacesSearch,
	getGooglePlaceDetails,
	googlePlacesSearchClearResults,
	selectGooglePlace,
	createJourney,
	clearNewJourneyFormDetails,
	getPlaceByMarker,
	findRoute
})(NewJourney);
