import React, { Component, ReactElement } from 'react';
import {
	View,
	TouchableOpacity,
	Text
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Props, State } from './interfaces';
import { JourneyMapState } from '../../../types/redux-reducer-state-types';
import { AppState } from '../../../store';
import { getJourneyDetails, startJourney, endJourney, driverMovement } from '../../../redux/actions';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import DriverLocation from '../../../services/driver-location';
import { Coords, Journey, Place } from '@project-300/common-types';
import { getDistance } from 'geolib';
import { Container } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';

export class JourneyMap extends Component<Props, State> {

	public constructor(props: Props) {
		super(props);

		const journeyId: string = this.props.navigation.getParam('journeyId');

		this.state = {
			journeyId,
			driverRegion: {
				latitude: 37.78825,
				longitude: -122.4324,
				latitudeDelta: 0.015,
				longitudeDelta: 0.0121
			},
			currentPosition: {
				latitude: 37.78825,
				longitude: -122.4324,
				latitudeDelta: 0.015,
				longitudeDelta: 0.0121
			},
			midpoint: {
				latitude: 0,
				longitude: 0
			},
			routeTravelled: [],
			movementCount: 0,
			tracker: null
		};
	}

	public async componentDidMount(): Promise<void> {
		const savedPos = await DriverLocation.getCurrentPosition(); // Get last updated location

		this.setState({
			currentPosition: {
				...savedPos,
				latitudeDelta: 0.015,
				longitudeDelta: 0.0121
			}
		});

		await this._getJourneyDetails();

		if (this.props.journey && this.props.journey.journeyStatus === 'STARTED') {
			this._trackDriver();
			this._setRouteTravelled();
		}
		if (this.props.journey && this.props.journey.journeyStatus === 'NOT_STARTED') {
			this._setMidpoint();
			this._zoomToMidpoint();
		}
	}

	public componentWillUnmount(): void {
		// this._stopTracking();
	}

	private _trackDriver = (): void => {
		const tracker: number = navigator.geolocation.watchPosition(async (location: Position) => {
			console.log('TRACK');
			this.setState({ movementCount: this.state.movementCount + 1 });

			const coords: Coords = {
				latitude: location.coords.latitude,
				longitude: location.coords.longitude
			};
			const region = {
				...coords,
				latitudeDelta: 0.015,
				longitudeDelta: 0.0121
			};

			this.setState({
				currentPosition: region,
				routeTravelled: this.state.routeTravelled.concat({
					latitude: location.coords.latitude,
					longitude: location.coords.longitude
				})
			});

				//  && this.state.movementCount % 10 === 0
			if (this.props.journey) { // Save movement every 10 movements
				await this._updateSavedLocation(coords);
				await this.props.driverMovement(this.props.journey.journeyId, coords);
			}
		},
	 (error: PositionError) => console.log(error.message),
{ enableHighAccuracy: false, timeout: 5000, maximumAge: 10000, distanceFilter: 10 });

		console.log(tracker);
		this.setState({ tracker });
	}

	private _stopTracking = (): void => {
		const tracker: number = this.state.tracker as number;

		navigator.geolocation.clearWatch(tracker);

		this.setState({ tracker: null });
	}

	private _setRouteTravelled = (): void => this.props.journey && this.setState({ routeTravelled: this.props.journey.routeTravelled });

	private _setMidpoint = (): void => {
		const { origin, destination } = this.props.journey as Journey;

		this.setState({
			midpoint: {
				latitude: (origin.latitude + destination.latitude) / 2,
				longitude: (origin.longitude + destination.longitude) / 2
			}
		});
	}

	private _zoomToMidpoint = (): void => {
		const journey: Journey = this.props.journey as Journey;
		const { origin, destination } = journey;

		const distance = getDistance(
			{ latitude: origin.latitude, longitude: origin.longitude },
			{ latitude: destination.latitude, longitude: destination.longitude }
		) / 2;
		const circumference = 40075;
		const oneDegreeOfLatitudeInMeters = 111.32 * 1000;
		const angularDistance = distance / circumference;
		const latitudeDelta = distance / oneDegreeOfLatitudeInMeters;
		const longitudeDelta = Math.abs(
			Math.atan2(
			Math.sin(angularDistance) * Math.cos(this.state.midpoint.latitude),
			Math.cos(angularDistance) - Math.sin(this.state.midpoint.latitude) * Math.sin(this.state.midpoint.latitude)
			)
		);

		this.setState({
			currentPosition: {
				latitude: this.state.midpoint.latitude,
				longitude: this.state.midpoint.longitude,
				latitudeDelta,
				longitudeDelta
			}
		});
	}

	private _getJourneyDetails = async (): Promise<void> => {
		await this.props.getJourneyDetails(this.state.journeyId);
	}

	private _updateSavedLocation = async (coords: Coords): Promise<void> => await DriverLocation.setCurrentPosition(coords);

	private _startJourney = async (): Promise<void> => {
		await this.props.startJourney(this.state.journeyId);
		// this._zoomToDriverPosition();
		this._trackDriver();
	}

	private _endJourney = async (): Promise<void> => {
		await this.props.endJourney(this.state.journeyId);
		this._stopTracking();
	}

	private _zoomToDriverPosition = (): void => {
		const currentPosition = this.state.currentPosition;

		this._map.animateCamera({
			center: {
				latitude: Number(currentPosition.latitude),
				longitude: Number(currentPosition.longitude)
			},
			pitch: 0,
			heading: 0,
			altitude: 200,
			zoom: 15
		}, {
			duration: 2000
		});
	}

	private _createMarker = (loc: Place): ReactElement => {
		return <Marker
			coordinate={ {
				latitude: loc.latitude,
				longitude: loc.longitude
			} }
			title={ loc.name }
		/>;
	}

	private _getMapRegion = (): Region => this.state.currentPosition;

	private _map: MapView = React.createRef<MapView>();

	public render(): ReactElement {
		const journey: Journey = this.props.journey as Journey;
		let spinnerText: string = '';
		if (this.props.isStarting) spinnerText = 'Starting...';
		if (this.props.isEnding) spinnerText = 'Ending...';

		return (
			<Container>
				<Spinner
					visible={ this.props.isStarting || this.props.isEnding }
					textContent={ spinnerText }
					textStyle={ styles.spinnerTextStyle }
				/>
				<View style={ styles.mapContainer }>
					<MapView
						provider={ PROVIDER_GOOGLE }
						style={ styles.map }
						region={ this._getMapRegion() }
						ref={ (m: MapView): MapView => this._map = m }
					>
						{ journey && this._createMarker(journey.origin) }
						{ journey && this._createMarker(journey.destination) }

						{
							journey && journey.plannedRoute &&
								<Polyline
									coordinates={ journey.plannedRoute }
									strokeColor={ 'red' }
									strokeWidth={ 4 }
								/>
						}

						{
							journey && journey.journeyStatus === 'STARTED' &&
								<Polyline
									coordinates={ this.state.routeTravelled }
									strokeColor={ 'green' }
									strokeWidth={ 4 }
								/>
						}

						{
							this.props.isStarted &&
								<Marker
									coordinate={ this.state.currentPosition }
								/>
						}
					</MapView>
				</View>

				{
					journey &&
						<View style={ { ...styles.bottomPanel } }>
							{
								journey.journeyStatus === 'NOT_STARTED' &&
								<TouchableOpacity style={ styles.button } onPress={ this._startJourney }>
									<Text style={ styles.buttonText }>Start </Text>
								</TouchableOpacity>
							}

							{
								journey.journeyStatus === 'STARTED' &&
								<TouchableOpacity style={ styles.button } onPress={ this._endJourney }>
									<Text style={ styles.buttonText }>End</Text>
								</TouchableOpacity>
							}

							{
								journey.journeyStatus === 'FINISHED' &&
								<TouchableOpacity style={ styles.button } onPress={ (): void => {
									this.props.navigation.goBack();
								} }>
									<Text style={ styles.buttonText }>Done</Text>
								</TouchableOpacity>
							}
						</View>
				}
			</Container>
		);
	}
}

const mapStateToProps = (state: AppState): JourneyMapState => ({
	...state.journeyDetailsReducer
});

export default connect(mapStateToProps, {
	getJourneyDetails,
	startJourney,
	endJourney,
	driverMovement
})(JourneyMap);
