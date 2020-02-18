import React, { Component, ReactElement } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Props, State } from './interfaces';
import { AppState } from '../../../store';
import { Coords, Journey, Place } from '@project-300/common-types';
import { Container } from 'native-base';
import { AllJourneysListState } from '../../../types/redux-reducer-state-types';
import { updateAddUserJourney } from '../../../redux/actions';
import Spinner from 'react-native-loading-spinner-overlay';
import ExternalApi from '../../../api/external-api';
import { getDistance } from 'geolib';
import MapView, {
	Marker,
	Polyline,
	PROVIDER_GOOGLE,
	Region,
} from 'react-native-maps';

export class ViewJourney extends Component<Props, State> {

	public constructor(props: Props) {
		super(props);

		const journey: Journey = this.props.navigation.state.params as Journey;

		this.state = {
			journey,
			mapRegion: {
				latitude: 54.2,
				longitude: -8.5,
				latitudeDelta: 1,
				longitudeDelta: 1
			},
			route: [],
			midpoint: undefined
		};
	}

	public componentDidMount = async (): Promise<void> => {
		const { origin, destination } = this.state.journey;
		this.setState({
			route: await ExternalApi.GoogleDirectionsRoute(
			{ longitude: origin.longitude, latitude: origin.latitude },
			{ longitude: destination.longitude, latitude: destination.latitude }
			)
		});

		this._setMidpoint();
		this._zoomToMidpoint();
	}

	private _mapRegion = (): Region | undefined => this.state.midpoint as Region;

	private _createMarker = (loc: Place, color?: string): ReactElement =>
		<Marker
			coordinate={ {
				latitude: loc.latitude,
				longitude: loc.longitude
			} }
			title={ loc.name }
			pinColor={ color || 'red' }
		/>

	private _addPassengerToJourney = async (journeyId: string): Promise<void> => {
		await this.props.updateAddUserJourney(journeyId);
		this.props.navigation.navigate('Home');
	}

	private _setMidpoint = (): void => {
		const { origin, destination } = this.state.journey as Journey;

		console.log(origin, destination);

		this.setState({
			midpoint: {
				latitude: (origin.latitude + destination.latitude) / 2,
				longitude: (origin.longitude + destination.longitude) / 2,
				latitudeDelta: 1,
				longitudeDelta: 1
			}
		});
	}

	private _zoomToMidpoint = (): void => {
		const journey: Journey = this.state.journey as Journey;
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

		console.log({midpoint: {
				...this.state.midpoint as Coords,
				latitudeDelta,
				longitudeDelta
			}});

		this.setState({
			midpoint: {
				...this.state.midpoint as Coords,
				latitudeDelta,
				longitudeDelta
			}
		});
	}

	public render(): ReactElement {
		const journey: Journey = this.state.journey;

		return (
			<Container>
				<Spinner visible={ this.props.isFetching } />
				<View style={ styles.mapContainer }>
					<MapView
						provider={ PROVIDER_GOOGLE }
						style={ styles.map}
						region={ this._mapRegion() }
					>
						{ journey && this._createMarker(journey.origin) }
						{ journey && this._createMarker(journey.destination) }

						<Polyline
							coordinates={ this.state.route }
							strokeColor={ 'blue' }
							strokeWidth={ 4 }
						/>
					</MapView>
				</View>

				<View style={ styles.bottomPanel }>
					<TouchableOpacity
						style={ styles.button }
						onPress={ (): Promise<void> => this._addPassengerToJourney(journey.journeyId) }
					>
						<Text style={ styles.buttonText }>Join</Text>
					</TouchableOpacity>
				</View>
			</Container>
		);
	}
}

const mapStateToProps = (state: AppState): AllJourneysListState => ({
	...state.allJourneysReducer
});

export default connect(mapStateToProps, {
	updateAddUserJourney
})(ViewJourney);
