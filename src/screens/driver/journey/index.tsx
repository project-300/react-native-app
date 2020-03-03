import React, { Component, ReactElement } from 'react';
import {
	View,
	Text, Dimensions, SafeAreaView, NativeModules, Platform,
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Props, State, AnimationValues, AnimationStyles } from './interfaces';
import { JourneyMapState } from '../../../types/redux-reducer-state-types';
import { AppState } from '../../../store';
import { getJourneyDetails, startJourney, endJourney, driverMovement } from '../../../redux/actions';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import DriverLocation from '../../../services/driver-location';
import { Coords, Journey, Place } from '@project-300/common-types';
import { getDistance } from 'geolib';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Animated, { Easing } from 'react-native-reanimated';
import { interpolateAnimation } from '../../../animations/animations';
import { TapGestureHandler } from 'react-native-gesture-handler';
import { FAB, Portal } from 'react-native-paper';

const { width } = Dimensions.get('window');
const { timing } = Animated;
const { StatusBarManager } = NativeModules;

export class JourneyMap extends Component<Props, State> {

	private animatedValues: AnimationValues = {
		infoOpen: new Animated.Value(0)
	};

	private animatedStyles: AnimationStyles = {
		infoHeight: 0,
		infoWidth: 0,
		infoPadding: 0,
		infoOpacity: 0
	};

	public constructor(props: Props) {
		super(props);

		const journeyKey: { journeyId: string; createdAt: string } = this.props.navigation.getParam('journeyKey');

		this.state = {
			journeyKey,
			driverRegion: {
				latitude: 54.27661,
				longitude: -8.47609,
				latitudeDelta: 0.015,
				longitudeDelta: 0.0121
			},
			currentPosition: {
				latitude: 54.27661,
				longitude: -8.47609,
				latitudeDelta: 0.015,
				longitudeDelta: 0.0121
			},
			midpoint: {
				latitude: 0,
				longitude: 0
			},
			routeTravelled: [],
			movementCount: 0, // Current session driver movements
			tracker: null,
			infoOpen: false,
			isTogglingInfo: false,
			statusBarHeight: 0
		};

		this.animatedValues = {
			infoOpen: new Animated.Value(0)
		};

		this.animatedStyles = {
			infoHeight: interpolateAnimation(this.animatedValues.infoOpen, [ 0, 1 ], [ 30, 120 ]),
			infoWidth: interpolateAnimation(this.animatedValues.infoOpen, [ 0, 1 ], [ 30, width * 0.25 ]),
			infoPadding: interpolateAnimation(this.animatedValues.infoOpen, [ 0, 1 ], [ 0, 10 ]),
			infoOpacity: interpolateAnimation(this.animatedValues.infoOpen, [ 0, 1 ], [ 0.5, 0.9 ])
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

		if (Platform.OS === 'ios') {
			StatusBarManager.getHeight((statusBarFrameData: any) => {
				this.setState({ statusBarHeight: statusBarFrameData.height });
			});
		}
	}

	public componentWillUnmount(): void {
		this._stopTracking();
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
				await this.props.driverMovement(this.state.journeyKey.journeyId, this.state.journeyKey.createdAt, coords);
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
		await this.props.getJourneyDetails(this.state.journeyKey.journeyId, this.state.journeyKey.createdAt);
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

	private _toggleInfo = async (): Promise<void> => {
		if (this.state.isTogglingInfo) return;

		await this.setState({ isTogglingInfo: true });

		timing(this.animatedValues.infoOpen, {
			duration: 500,
			toValue: this.state.infoOpen ? 0 : 1,
			easing: Easing.inOut(Easing.ease)
		}).start(() => this.setState({ infoOpen: !this.state.infoOpen, isTogglingInfo: false }));
	}

	private _goBack = (): void => {
		console.log('GO BACK');
		this.props.navigation.navigate('MyJourneys');
	}

	public render(): ReactElement {
		const journey: Journey = this.props.journey as Journey;
		let spinnerText: string = '';
		if (this.props.isStarting) spinnerText = 'Starting...';
		if (this.props.isEnding) spinnerText = 'Ending...';

		return (
			<SafeAreaView style={ { flex: 1 } }>
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
							//journey && journey.journeyStatus === 'STARTED' &&
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

						<Marker
							coordinate={ this.state.currentPosition }
						/>
					</MapView>

					<TapGestureHandler onHandlerStateChange={ this._goBack }>
						<Icon name={ 'angle-left' } size={ 40 } color={ 'black' } style={ [ styles.backButton, { marginTop: this.state.statusBarHeight + 4 } ] } />
					</TapGestureHandler>

					<TapGestureHandler
						onHandlerStateChange={ this._toggleInfo }
					>
						<Animated.View
							style={ [ styles.infoBox, {
								height: this.animatedStyles.infoHeight,
								width: this.animatedStyles.infoWidth,
								padding: this.animatedStyles.infoPadding,
								marginTop: this.state.statusBarHeight + 10
							} ] }
						>
							{
								this.state.infoOpen && !this.state.isTogglingInfo &&
									<View style={ { flex: 1 } }>
										<View style={ styles.infoRow }>
											<Icon name={ 'road' } size={ 18 } style={ styles.infoIcon } />
											<Text style={ styles.infoText }>{ this.props.distance }2.5 KM</Text>
										</View>
										<View style={ styles.infoRow }>
											<Icon name={ 'clock' } size={ 18 } style={ styles.infoIcon } />
											<Text style={ styles.infoText }>{ this.props.travelTime }00:27</Text>
										</View>
									</View>
							}

							{
								!this.state.infoOpen && !this.state.isTogglingInfo &&
									<View style={ { alignSelf: 'center', justifyContent: 'center', flex: 1 } }>
                                		<Icon name={ 'info' } size={ 16 } color={ 'white' } />
									</View>
							}
						</Animated.View>
					</TapGestureHandler>
				</View>

				{/*{*/}
				{/*	journey &&*/}
				{/*		<View style={ { ...styles.bottomPanel } }>*/}
				{/*			{*/}
				{/*				journey.journeyStatus === 'NOT_STARTED' &&*/}
				{/*				<TouchableOpacity style={ styles.button } onPress={ this._startJourney }>*/}
				{/*					<Text style={ styles.buttonText }>Start </Text>*/}
				{/*				</TouchableOpacity>*/}
				{/*			}*/}

				{/*			{*/}
				{/*				journey.journeyStatus === 'STARTED' &&*/}
				{/*				<TouchableOpacity style={ styles.button } onPress={ this._endJourney }>*/}
				{/*					<Text style={ styles.buttonText }>End</Text>*/}
				{/*				</TouchableOpacity>*/}
				{/*			}*/}

				{/*			{*/}
				{/*				journey.journeyStatus === 'FINISHED' &&*/}
				{/*				<TouchableOpacity style={ styles.button } onPress={ (): void => {*/}
				{/*					this.props.navigation.goBack();*/}
				{/*				} }>*/}
				{/*					<Text style={ styles.buttonText }>Done</Text>*/}
				{/*				</TouchableOpacity>*/}
				{/*			}*/}
				{/*		</View>*/}
				{/*}*/}

				{/*<FAB*/}
				{/*	style={ styles.fab }*/}
				{/*	icon={ 'car' }*/}
				{/*	// onPress={ (): Promise<void> => this._switchUserTypeView(!this.state.driverView) }*/}
				{/*/>*/}

				<Portal>
					<FAB.Group
						fabStyle={ styles.fab }
						open={ this.state.fabOpen }
						icon={ 'car' }
						actions={ [
							{ icon: 'email', label: 'Start Journey', onPress: this._startJourney }
						] }
						onStateChange={ ({ open }: { open: boolean }): void => this.setState({ fabOpen: open }) }
						onPress={ (): void => {
							if (this.state.fabOpen) {
								// do something if the speed dial is open
							}
						} }
					/>
				</Portal>

			</SafeAreaView>
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
