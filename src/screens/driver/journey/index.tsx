import React, { Component, ReactElement } from 'react';
import {
	View,
	Alert,
	TouchableOpacity,
	Text, Platform
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Props, State } from './interfaces';
import { JourneyMapState } from '../../../types/redux-reducer-state-types';
import { AppState } from '../../../store';
import { getJourneyDetails, startJourney, endJourney } from '../../../redux/actions';
import MapView, { AnimatedRegion, Marker, Polyline, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import DriverLocation from '../../../services/driver-location';
import { Journey } from '@project-300/common-types';
import MapBoxPolyline from '@mapbox/polyline';
import toastr from '../../../helpers/toastr';
import { GoogleMapsAPIKey } from '../../../../environment/env';
import { getDistance } from 'geolib';
import { Coords } from '../../../types/common';
import { Directions } from '../../../types/maps';
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
			route: null,
			routeTravelled: [],
			midpoint: {
				latitude: 0,
				longitude: 0
			}
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

		this._mapRoute().then(() => {
			this._setMidpoint();
			this._zoomToMidpoint();

				// Zoom into driver position if continuing journey
			if (this.props.journey && this.props.journey.journeyStatus === 'STARTED') {
				this._trackDriver();
				// setTimeout(this._zoomToDriverPosition, 1000);
			}
		});
	}

	private _trackDriver = (): void => {
		navigator.geolocation.watchPosition(async (location: Position) => {
			const coords = {
				latitude: location.coords.latitude,
				longitude: location.coords.longitude,
				latitudeDelta: 0.015,
				longitudeDelta: 0.0121
			};

			this.setState({
				currentPosition: coords,
				routeTravelled: this.state.routeTravelled.concat({
					latitude: location.coords.latitude,
					longitude: location.coords.longitude
				})
			});

			console.log(this.state.routeTravelled);

			await this._updateSavedLocation(location.coords);
		},
	 (error: PositionError) => console.log(error.message),
{ enableHighAccuracy: false, timeout: 5000, maximumAge: 10000 }
		);
	}

	private _mapRoute = async (): Promise<void> => {
		const directions: Directions = await this._getDirections() as Directions;

		if (!directions) return;

		// Ignore type error - Interface must be out of date
		const points: number[][] = MapBoxPolyline.decode(directions.routes[0].overview_polyline.points);

		const coords: Coords[] = points.map((point: number[]) => { // Each point is an array of 2 numbers, eg. [ 53.29165, -9.01906 ]
			return ({
				latitude: point[0],
				longitude: point[1]
			});
		});

		this.setState({ route: coords });
	}

	private _getDirections = async (): Promise<void | Directions> => {
		if (!this.props.journey) return toastr.error('No Journey Set');

		const origin = `${this.props.journey.origin.lat},${this.props.journey.origin.long}`;
		const destination = `${this.props.journey.destination.lat},${this.props.journey.destination.long}`;

		const res = await fetch(
			`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${GoogleMapsAPIKey}`, {
			method: 'GET'
		});

		if (!res.ok) return toastr.error('Error Retrieving Directions');

		const data: Directions = await res.json();
		return data;
	}

	private _setMidpoint = (): void => {
		const { origin, destination } = this.props.journey as Journey;

		this.setState({
			midpoint: {
				latitude: (origin.lat + destination.lat) / 2,
				longitude: (origin.long + destination.long) / 2
			}
		});
	}

	private _zoomToMidpoint = (): void => {
		const journey: Journey = this.props.journey as Journey;

		const distance = getDistance(
			{ latitude: journey.origin.lat, longitude: journey.origin.long },
			{ latitude: journey.destination.lat, longitude: journey.destination.long }
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
			driverRegion: {
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

	private _updateSavedLocation = async (coords: Coordinates): Promise<void> => {
		await DriverLocation.setCurrentPosition({
			latitude: coords.latitude,
			longitude: coords.longitude
		});
	}

	private _startJourney = async (): Promise<void> => {
		await this.props.startJourney(this.state.journeyId);
		// this._zoomToDriverPosition();
		this._trackDriver();
	}

	private _endJourney = async (): Promise<void> => await this.props.endJourney(this.state.journeyId);

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

	private _createMarker = (loc: { lat: number; long: number; name: string }): ReactElement => {
		return <Marker
			coordinate={ {
				latitude: loc.lat,
				longitude: loc.long
			} }
			title={ loc.name }
		/>;
	}

	private _getMapRegion = (): Region => ({
		latitude: this.state.currentPosition.latitude,
		longitude: this.state.currentPosition.longitude,
		latitudeDelta: this.state.currentPosition.latitudeDelta,
		longitudeDelta: this.state.currentPosition.longitudeDelta
	});

	private _map: MapView = React.createRef<MapView>();

	private _driverMarker: Marker = React.createRef<Marker>();

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
							this.state.route &&
							<Polyline
								coordinates={ this.state.route }
								strokeColor={ 'red' }
								strokeWidth={ 4 }
							/>
						}

						<Marker
							// ref={ (marker: Marker): void => {
							// 	this._driverMarker = marker;
							// }}
							coordinate={ this.state.currentPosition }
						/>
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
	endJourney
})(JourneyMap);
