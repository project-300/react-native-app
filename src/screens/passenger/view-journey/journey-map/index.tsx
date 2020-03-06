import React, { Component, ReactElement } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Props, State } from './interfaces';
import { AppState } from '../../../../store';
import { Coords, Journey, Place } from '@project-300/common-types';
import { AllJourneysListState } from '../../../../types/redux-reducer-state-types';
import { getDistance } from 'geolib';
import MapView, {
	Marker,
	Polyline,
	PROVIDER_GOOGLE,
	Region,
} from 'react-native-maps';
import { Theme } from '../../../../constants/theme';

export class InteractiveMap extends Component<Props, State> {

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
			midpoint: {
				latitude: 54.2,
				longitude: -8.5,
				latitudeDelta: 1,
				longitudeDelta: 1
			}
		};
	}

	public componentDidMount = async (): Promise<void> => {
		await this._setMidpoint();
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

	private _setMidpoint = async (): Promise<void> => {
		const { origin, destination } = this.state.journey as Journey;

		await this.setState({
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

		this.setState({
			midpoint: {
				...this.state.midpoint as Coords,
				latitudeDelta,
				longitudeDelta
			}
		});
	}

	private _map: MapView = React.createRef<MapView>();

	public render(): ReactElement {
		const journey: Journey = this.state.journey;

		return (
			<View style={ styles.container }>
				<Text>test</Text>
				<View style={ styles.mapContainer }>
					<Text>test</Text>
					<MapView
						provider={ PROVIDER_GOOGLE }
						style={ styles.map}
						region={ this._mapRegion() }
						ref={ (m: MapView): MapView => this._map = m }
					>
						{ journey && this._createMarker(journey.origin) }
						{ journey && this._createMarker(journey.destination) }

						<Polyline
							coordinates={ this.state.journey.plannedRoute }
							strokeColor={ Theme.accent }
							strokeWidth={ 4 }
						/>
					</MapView>
					<Text>test</Text>
				</View>
			</View>
		);
	}
}

const mapStateToProps = (state: AppState): AllJourneysListState => ({
	...state.allJourneysReducer
});

export default connect(mapStateToProps, { })(InteractiveMap);
