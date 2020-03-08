import React, { Component, ReactElement } from 'react';
import {
	View,
	TouchableOpacity,
	Text
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Props, State } from './interfaces';
import { DriverTrackingState } from '../../types/redux-reducer-state-types';
import { AppState } from '../../store';
import {
	getPassengerJourneyDetails,
	subscribeDriverLocation,
	unsubscribeDriverLocation
} from '../../redux/actions';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { Journey, Place } from '@project-300/common-types';
import { Container } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';

export class DriverTracking extends Component<Props, State> {

	public constructor(props: Props) {
		super(props);

		const journeyKey: { journeyId: string; createdAt: string } = this.props.navigation.getParam('journeyKey');

		console.log(journeyKey);

		this.state = {
			journeyKey,
			driverRouteTravelled: [],
			mapRegion: {
				latitude: 54.2,
				longitude: -8.5,
				latitudeDelta: 0.5,
				longitudeDelta: 0.5
			},
			forceTracking: true
		};
	}

	public async componentDidMount(): Promise<void> {
		await this.props.getPassengerJourneyDetails(this.state.journeyKey.journeyId);
		await this.props.subscribeDriverLocation(this.state.journeyKey.journeyId, this.state.journeyKey.createdAt);
	}

	public async componentWillUnmount(): Promise<void> {
		await this.props.unsubscribeDriverLocation(this.state.journeyKey.journeyId);
	}

	private _mapRegion = (): Region | undefined => {
		return this.props.driverLocation ? ({
			...this.props.driverLocation,
			latitudeDelta: 0.015,
			longitudeDelta: 0.0121
		}) : this.state.mapRegion;
	}

	private _createMarker = (loc: Place, color?: string): ReactElement =>
		<Marker
			coordinate={ {
				latitude: loc.latitude,
				longitude: loc.longitude
			} }
			title={ loc.name }
			pinColor={ color || 'red' }
		>
		</Marker>

	public render(): ReactElement {
		const journey: Journey = this.props.journey as Journey;
		const { driverLocation, passengerLocation } = this.props;

		return (
			<Container>
				<Spinner
					visible={ this.props.isRequesting }
					textContent={ 'Waiting for driver location...' }
					textStyle={ styles.spinnerTextStyle }
				/>
				<View style={ styles.mapContainer }>
					<MapView
						provider={ PROVIDER_GOOGLE }
						style={ styles.map }
						region={ this._mapRegion() }
					>
						{ journey && this._createMarker(journey.origin) }
						{ journey && this._createMarker(journey.destination) }
						{ driverLocation && this._createMarker({ ...driverLocation, name: 'Driver' }, 'green') }
						{ passengerLocation && this._createMarker({ ...passengerLocation, name: 'You' }) }

						<Polyline
							coordinates={ this.props.routeTravelled }
							strokeColor={ 'green' }
							strokeWidth={ 4 }
						/>
					</MapView>
				</View>

				{
					this.props.ended &&
						<View style={ { ...styles.topPanel } }>
							<Text style={ { color: 'white', fontWeight: 'bold', fontSize: 20 } }>The journey has ended</Text>
						</View>
				}

				{
					this.props.ended &&
						<View style={ { ...styles.bottomPanel } }>
							<TouchableOpacity style={ styles.button } onPress={ (): void => {
								this.props.navigation.goBack();
							} }>
								<Text style={ styles.buttonText }>Done</Text>
							</TouchableOpacity>
						</View>
				}
			</Container>
		);
	}
}

const mapStateToProps = (state: AppState): DriverTrackingState => ({
	...state.driverTrackingReducer
});

export default connect(mapStateToProps, {
	getPassengerJourneyDetails,
	subscribeDriverLocation,
	unsubscribeDriverLocation
})(DriverTracking);
