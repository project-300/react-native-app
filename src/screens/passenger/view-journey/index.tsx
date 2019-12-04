import React, { Component, ReactElement } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Props, State } from './interfaces';
import { AppState } from '../../../store';
import MapView, {
	Marker,
	Polyline,
	PROVIDER_GOOGLE,
	Region,
} from 'react-native-maps';
import { Journey, Place } from '@project-300/common-types';
import { Container } from 'native-base';
import { AllJourneysListState } from '../../../types/redux-reducer-state-types';
import { updateAddUserJourney } from '../../../redux/actions/journey';
import Spinner from 'react-native-loading-spinner-overlay';
import ExternalApi from '../../../api/external-api';

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
			route: []
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
	}

	private _mapRegion = (): Region | undefined => this.state.mapRegion;

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
