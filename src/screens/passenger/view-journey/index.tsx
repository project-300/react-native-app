import React, { Component, ReactElement } from 'react';
import { View, Image, Dimensions, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { Props, State, AnimationStyles, AnimationValues } from './interfaces';
import { AppState } from '../../../store';
import { Coords, Journey, Place } from '@project-300/common-types';
import { AllJourneysListState } from '../../../types/redux-reducer-state-types';
import { updateAddUserJourney } from '../../../redux/actions';
import { GoogleMapsAPIKey } from '../../../../environment/env';
import Animated, { Easing } from 'react-native-reanimated';
import { interpolateAnimation } from '../../../animations/animations';
import { Button, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Theme } from '../../../constants/theme';

const { width, height } = Dimensions.get('window');
const { timing } = Animated;

export class ViewJourney extends Component<Props, State> {

	private animatedValues: AnimationValues = {
		map: new Animated.Value(0)
	};

	private animatedStyles: AnimationStyles = {
		mapHeight: 0,
		closeMapIconOpacity: 0,
		expandMapIconOpacity: 0
	};

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
			midpoint: undefined,
			mapImageExpanded: false,
			mapToBeOpened: false
		};

		this.animatedValues = {
			map: new Animated.Value(0)
		};

		this.animatedStyles = {
			mapHeight: interpolateAnimation(this.animatedValues.map, [ 0, 1 ], [ height / 6, height / 2.5 ]),
			closeMapIconOpacity: interpolateAnimation(this.animatedValues.map, [ 0, 1 ], [ 0, 1 ]),
			expandMapIconOpacity: interpolateAnimation(this.animatedValues.map, [ 0, 1 ], [ 1, 0 ])
		};
	}

	private _joinJourney = async (): Promise<void> => {
		const { journey } = this.state;
		await this.props.updateAddUserJourney(journey.journeyId, journey.times.createdAt as string);
		// this.props.navigation.navigate('Home');
	}

	private _expandMap = (): void => {
		this.setState({ mapToBeOpened: !this.state.mapImageExpanded });

		timing(this.animatedValues.map, {
			duration: 500,
			toValue: this.state.mapImageExpanded ? 0 : 1,
			easing: Easing.inOut(Easing.ease)
		}).start(() => this.setState({ mapImageExpanded: !this.state.mapImageExpanded }));
	}

	private _constructImageURL = (width: number, height: number, path: string, origin: Place, destination: Place): string => {
		let url = `https://maps.googleapis.com/maps/api/staticmap`;
		url += `?size=${width}x${height}`;
		url += `&path=color:0x0000ff|weight:3${path}`;
		url += `&markers=color:blue|label:O|${origin.latitude},${origin.longitude}`;
		url += `&markers=color:green|label:D|${destination.latitude},${destination.longitude}`;
		url += `&maptype=roadmap&key=${GoogleMapsAPIKey}`;

		return url;
	}

	public render(): ReactElement {
		const journey: Journey = this.state.journey;

		const { origin, destination, driver, plannedRoute, seatsLeft, pricePerSeat } = journey;

		const path: string = plannedRoute.map((c: Coords) => `|${c.latitude},${c.longitude}`).join('');

		const mapWidth = Math.floor(width);
		const mapHeight = Math.floor(height / 2.5);

		return (
			<View>
				<TouchableWithoutFeedback
					onPress={ this._expandMap }
					style={ { width: mapWidth, height: mapHeight } }
				>
					<Animated.View
						style={ {
							width: mapWidth,
							height: this.animatedStyles.mapHeight,
							overflow: 'hidden',
							justifyContent: 'center'
						} }
					>
						<Image
							style={ {
								width: mapWidth,
								height: mapHeight
							} }
							source={ {
								uri: this._constructImageURL(mapWidth, mapHeight, path, origin, destination) } }
						/>

						{
								<Animated.View style={ { position: 'absolute', top: 15, right: 15, opacity: this.animatedStyles.closeMapIconOpacity } }>
									<Icon
										name='compress'
										size={ 34 }
										color={ Theme.primary }
										onPress={ this._expandMap }
									/>
								</Animated.View>
						}

						{
                            <Animated.View style={ { position: 'absolute', bottom: 15, right: 15, opacity: this.animatedStyles.expandMapIconOpacity } }>
								<Icon
									name='expand'
									size={ 30 }
									color={ Theme.primary }
									onPress={ this._expandMap }
								/>
							</Animated.View>
						}

					</Animated.View>
				</TouchableWithoutFeedback>
				<ScrollView style={ { height: '100%', padding: 20 } }>
					<View style={ { padding: 20, backgroundColor: '#eee', borderRadius: 4 } }>
						<View style={ { marginBottom: 20 } }>
							<Text style={ { fontSize: 16, color: '#555' } }>From</Text>
							<Text style={ { fontSize: 22, marginLeft: 30 } }>{ origin.name }</Text>
						</View>
						<View>
							<Text style={ { fontSize: 16, color: '#555' } }>To</Text>
							<Text style={ { fontSize: 22, marginLeft: 30 } }>{ destination.name }</Text>
						</View>
					</View>

					<Button
						mode='contained'
						style={ { padding: 8, marginVertical: 20 } }
						onPress={ this._joinJourney }
					>Take Lift</Button>

					<Text>{ driver.firstName } { driver.lastName }</Text>
					<Text>{ seatsLeft } seats left</Text>
					<Text>€{ pricePerSeat }</Text>

					{/*<View style={ { ...StyleSheet.absoluteFill, height: '100%', backgroundColor: 'rgba(0,0,0,0.2)' } } />*/}
				</ScrollView>
			</View>
		);
	}
}

const mapStateToProps = (state: AppState): AllJourneysListState => ({
	...state.allJourneysReducer
});

export default connect(mapStateToProps, {
	updateAddUserJourney
})(ViewJourney);
