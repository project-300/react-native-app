import React, { Component, ReactElement } from 'react';
import { connect } from 'react-redux';
import { LocationTrackingState } from '../../types/redux-reducer-state-types';
import { AppState } from '../../store';
import {
	setCurrentLocation
} from '../../redux/actions';
import DriverLocation from '../../services/driver-location';
import { Coords } from '@project-300/common-types';
import { View } from 'react-native';
import { AppActions } from '../../types/redux-action-types';

interface State {
	// routeTravelled: Coords[];
	movementCount: number;
	tracker: number | null;
}

interface Props extends LocationTrackingState {
	driverMovement(journeyId: string, createdAt: string, coords: Coords): Promise<void>;
	setCurrentLocation(): AppActions;
}

export class LocationTracker extends Component<Props, State> {

	public constructor(props: Props) {
		super(props);

		this.state = {
			// routeTravelled: [],
			movementCount: 0, // Current session driver movements
			tracker: null
		};
	}

	public componentDidMount(): void {
		if (this.props.allowTracking) this._trackDriver();
	}

	public componentWillUnmount(): void {
		this._stopTracking();
	}

	public componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>): void {
		console.log(prevProps.allowTracking, this.props.allowTracking);
		if (!prevProps.allowTracking && this.props.allowTracking) this._trackDriver();
		if (prevProps.allowTracking && !this.props.allowTracking) this._stopTracking();
	}

	private _trackDriver = (): void => {
		const tracker: number = navigator.geolocation.watchPosition(async (location: Position) => {
				const coords: Coords = {
					latitude: location.coords.latitude,
					longitude: location.coords.longitude
				};

				console.log('MOVEMENT');
				console.log(coords);

				// const { routeTravelled } = this.state;
				// const length: number = routeTravelled.length;
				// const start: Coords = routeTravelled[length - 2];
				// const end: Coords = routeTravelled[length - 1];
				// const direction: number = ((length >= 2 ?
				// 	MapUtils.direction(start.latitude, start.longitude, end.latitude, end.longitude) :
				// 	0) + 90) % 360;

				// this.setState({
				// 	routeTravelled: this.state.routeTravelled.concat({
				// 		latitude: location.coords.latitude,
				// 		longitude: location.coords.longitude
				// 	})
				// });

				// if (this.props.journey) { // Save movement every 10 movements
				// 	await this._updateSavedLocation(coords);
				// 	await this.props.driverMovement(this.state.journeyKey.journeyId, this.state.journeyKey.createdAt, coords);
				// }

				// 	await this.props.driverMovement(this.state.journeyKey.journeyId, this.state.journeyKey.createdAt, coords);

				await this._updateSavedLocation(coords);
				this.props.setCurrentLocation(coords);
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
	setCurrentLocation
})(LocationTracker);
