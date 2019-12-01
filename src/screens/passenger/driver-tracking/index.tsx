import React, { Component, ReactElement } from 'react';
import {
	View,
	TouchableOpacity,
	Text
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Props, State } from './interfaces';
import { DriverTrackingState } from '../../../types/redux-reducer-state-types';
import { AppState } from '../../../store';
import { getPassengerJourneyDetails } from '../../../redux/actions';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { Coords, Journey, Place } from '@project-300/common-types';
import { Container } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';

export class DriverTracking extends Component<Props, State> {

	public constructor(props: Props) {
		super(props);

		const journeyId: string = this.props.navigation.getParam('journeyId');

		this.state = {
			journeyId,
			driverRouteTravelled: [],
			mapRegion: {
				latitude: 54.2,
				longitude: -8.5,
				latitudeDelta: 0.5,
				longitudeDelta: 0.5
			}
		};
	}

	public async componentDidMount(): Promise<void> {
		 await this.props.getPassengerJourneyDetails(this.state.journeyId);
	}

	private _createMarker = (loc: Place, color?: string): ReactElement =>
		<Marker
			coordinate={ {
				latitude: loc.latitude,
				longitude: loc.longitude
			} }
			title={ loc.name }
			pinColor={ color || 'red' }
		/>

	private _map: MapView = React.createRef<MapView>();

	public render(): ReactElement {
		const journey: Journey = this.props.journey as Journey;
		const { driverLocation, passengerLocation } = this.props;

		console.log(this.props);

		return (
			<Container>
				<Spinner
					visible={ this.props.isRequesting }
					textContent={ 'Gathering Information...' }
					textStyle={ styles.spinnerTextStyle }
				/>
				<View style={ styles.mapContainer }>
					<MapView
						provider={ PROVIDER_GOOGLE }
						style={ styles.map }
						region={ this.state.mapRegion }
						ref={ (m: MapView): MapView => this._map = m }
					>
						{ journey && this._createMarker(journey.origin) }
						{ journey && this._createMarker(journey.destination) }
						{ driverLocation && this._createMarker({ ...driverLocation, name: 'Driver' }, 'green') }
						{ passengerLocation && this._createMarker({ ...passengerLocation, name: 'You' }) }
					</MapView>
				</View>

				<View style={ { ...styles.bottomPanel } }>
					<TouchableOpacity style={ styles.button } onPress={ (): boolean => this.props.navigation.goBack() }>
						<Text style={ styles.buttonText }>Done</Text>
					</TouchableOpacity>
				</View>
			</Container>
		);
	}
}

const mapStateToProps = (state: AppState): DriverTrackingState => ({
	...state.driverTrackingReducer
});

export default connect(mapStateToProps, { getPassengerJourneyDetails })(DriverTracking);
