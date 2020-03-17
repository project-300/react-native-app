import React, { Component, ReactElement } from 'react';
import { connect } from 'react-redux';
import { LocationTrackingState } from '../../types/redux-reducer-state-types';
import { AppState } from '../../store';
import {
	setCurrentLocation,
	updateCurrentLocation
} from '../../redux/actions';
import DriverLocation from '../../services/driver-location';
import { Coords } from '@project-300/common-types';
import { View, PermissionsAndroid } from 'react-native';
import { AppActions } from '../../types/redux-action-types';

interface State {
	movementCount: number;
	tracker: number | null;
	allowedTracking: boolean;
}

interface Props extends LocationTrackingState {
	driverMovement(journeyId: string, createdAt: string, coords: Coords): Promise<void>;
	setCurrentLocation(coords: Coords): Promise<void>;
	updateCurrentLocation(coords: Coords): AppActions;
}

export class LocationTracker extends Component<Props, State> {

	public constructor(props: Props) {
		super(props);

		this.state = {
			movementCount: 0, // Current session driver movements
			tracker: null,
			allowedTracking: false
		};
	}

	public async componentDidMount(): Promise<void> {
		await this._requestLocationPermission();
		if (this.state.allowedTracking) if (this.props.allowTracking) this._trackDriver();
	}

	public componentWillUnmount(): void {
		this._stopTracking();
	}

	public componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>): void {
		console.log(prevProps.allowTracking, this.props.allowTracking);
		if (!prevProps.allowTracking && this.props.allowTracking) this._trackDriver();
		if (prevProps.allowTracking && !this.props.allowTracking) this._stopTracking();
	}

	private _requestLocationPermission = async (): Promise<void> => {
		try {
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
				{
					title: 'Location Acess',
					message: 'DRYVE wants to access to your location',
					buttonPositive: 'Ok',
					buttonNegative: 'Deny'
				}
			)
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				this.setState({ allowedTracking: true });
				console.log('Location Permission Granted');
			} else {
				this.setState({ allowedTracking: false });
				console.log('Location Permission Denied');
			}
		} catch (err) {
			console.warn(err);
		}
	}

	private _trackDriver = (): void => {
		const tracker: number = navigator.geolocation.watchPosition(async (location: Position) => {
				const coords: Coords = {
					latitude: location.coords.latitude,
					longitude: location.coords.longitude
				};

				console.log('MOVEMENT');
				console.log(coords);

				await this._updateSavedLocation(coords);
				if (this.props.publishLocation) await this.props.setCurrentLocation(coords);
				else this.props.updateCurrentLocation(coords);
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

	private _updateSavedLocation = async (coords: Coords): Promise<void> => await DriverLocation.setCurrentPosition(coords);

	public render(): ReactElement {
		return <View />;
	}

}

const mapStateToProps = (state: AppState): LocationTrackingState => ({
	...state.locationTrackingReducer
});

export default connect(mapStateToProps, {
	setCurrentLocation,
	updateCurrentLocation
})(LocationTracker);
