import React, { Component, ReactElement } from 'react';
import { View, Dimensions, ScrollView, TouchableWithoutFeedback, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { Props, State, AnimationStyles, AnimationValues } from './interfaces';
import { AppState } from '../../../store';
import { Coords, Journey, Place, FormatMoney } from '@project-300/common-types';
import { ViewJourneyState } from '../../../types/redux-reducer-state-types';
import { GoogleMapsAPIKey } from '../../../../environment/env';
import Animated, { Easing } from 'react-native-reanimated';
import { interpolateAnimation } from '../../../animations/animations';
import { Button, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Theme } from '../../../constants/theme';
import { NavigationEvents } from 'react-navigation';
import {
	getViewJourney,
	updateAddUserJourney,
	cancelLiftAcceptance,
	contentReloadOff,
	contentReloadOn,
	clearJourneyInfo
} from '../../../redux/actions';
import moment, { Duration, Moment } from 'moment';
import { NoticeBanner } from '../../../components/miscellaneous/notice-banner';

const { width, height } = Dimensions.get('window');
const { timing } = Animated;

export class ViewJourney extends Component<Props, State> {

	private animatedValues: AnimationValues = {
		map: new Animated.Value(0),
		prepping: new Animated.Value(0)
	};

	private animatedStyles: AnimationStyles = {
		mapHeight: 0,
		closeMapIconOpacity: 0,
		expandMapIconOpacity: 0,
		overlayOpacity: 0,
		overlayButtonOpacity: 0,
		showClickMapMessageOpacity: 0,
		mapOpacity: 0
	};

	public constructor(props: Props) {
		super(props);

		const journey: Journey = this.props.navigation.getParam('journey');

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
			mapToBeOpened: false,
			prepping: false,
			journeyLoaded: false
	};

		this.animatedValues = {
			map: new Animated.Value(0),
			prepping: new Animated.Value(0)
		};

		this.animatedStyles = {
			mapHeight: interpolateAnimation(this.animatedValues.map, [ 0, 1 ], [ height / 6, height / 2 ]),
			closeMapIconOpacity: interpolateAnimation(this.animatedValues.map, [ 0, 1 ], [ 0, 1 ]),
			expandMapIconOpacity: interpolateAnimation(this.animatedValues.map, [ 0, 1 ], [ 1, 0 ]),
			overlayOpacity: interpolateAnimation(this.animatedValues.map, [ 0, 1 ], [ 0, 0.8 ]),
			overlayButtonOpacity: interpolateAnimation(this.animatedValues.map, [ 0, 1 ], [ 0, 1 ]),
			showClickMapMessageOpacity: interpolateAnimation(this.animatedValues.prepping, [ 0, 1 ], [ 0, 1 ]),
			mapOpacity: interpolateAnimation(this.animatedValues.prepping, [ 0, 1 ], [ 1, 0.7 ])
		};
	}

	private _mountScreen = async (): Promise<void> => { // Triggered when this screen renders (navigated to)
		setTimeout(() => {
			this._showClickMapMessage(true);
		}, 500);

		setTimeout(() => {
			this._showClickMapMessage(false);
		}, 2500);

		await this._getJourney(false);
		this.setState({ journeyLoaded: true });
	}

	private _showClickMapMessage = (prepping: boolean): void => {
		timing(this.animatedValues.prepping, {
			duration: 500,
			toValue: prepping ? 1 : 0,
			easing: Easing.inOut(Easing.ease)
		}).start();
	}

	private _unmountScreen = (): void => { // Triggered when the screen is navigated away from
		console.log('unmount');
		this.props.clearJourneyInfo();
		// this.setState(this.initialState); // Reset the state of the component for next mount
	}

	private _getJourney = async (reload: boolean): Promise<void> => {
		if (reload) this.props.contentReloadOn();
		await this.props.getViewJourney(this.state.journey.journeyId, this.state.journey.times.createdAt as string);
		this.props.contentReloadOff();
	}

	private _joinJourney = async (): Promise<void> => {
		const { journey } = this.state;
		await this.props.updateAddUserJourney(journey.journeyId, journey.times.createdAt as string);
	}

	private _cancelLiftAcceptance = async (): Promise<void> => {
		const { journey } = this.state;
		await this.props.cancelLiftAcceptance(journey.journeyId, journey.times.createdAt as string);
	}

	private _toggleMap = (): void => {
		if (this.state.mapImageExpanded) this._collapseMap();
		else this._expandMap();
	}

	private _expandMap = (): void => {
		this.setState({ mapToBeOpened: true });

		timing(this.animatedValues.map, {
			duration: 500,
			toValue: 1,
			easing: Easing.inOut(Easing.ease)
		}).start(() => this.setState({ mapImageExpanded: !this.state.mapImageExpanded }));
	}

	private _collapseMap = (): void => {
		timing(this.animatedValues.map, {
			duration: 500,
			toValue: 0,
			easing: Easing.inOut(Easing.ease)
		}).start(() => this.setState({ mapImageExpanded: !this.state.mapImageExpanded, mapToBeOpened: false }));
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

	private _formatLeavingTime = (leavingAt: string): string => {
		const date: Moment = moment(leavingAt);
		const duration: Duration = moment.duration(moment(date).diff(moment()));

		if (duration.asDays() > 6) return moment().format('dddd MMMM Do YYYY, h:mm A');
		return moment(leavingAt).calendar();
	}

	private _renderNavigationEvents = (): ReactElement =>
		<NavigationEvents onWillFocus={ this._mountScreen } onDidBlur={ this._unmountScreen } />

	public render(): ReactElement {
		const journey: Journey = this.props.journey || this.state.journey;

		const { origin, destination, driver, plannedRoute, seatsLeft, pricePerSeat, userJoined } = journey;

		const path: string = plannedRoute.map((c: Coords) => `|${c.latitude},${c.longitude}`).join('');

		const mapWidth = Math.floor(width);
		const mapHeight = Math.floor(height / 2);

		return (
			<View style={ { backgroundColor: this.props.DARK_MODE ? '#222' : 'white' } }>
				{ this._renderNavigationEvents() }

				<TouchableWithoutFeedback
					onPress={ this._toggleMap }
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
						<Animated.Image
							style={ {
								width: mapWidth,
								height: mapHeight,
								opacity: this.animatedStyles.mapOpacity
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
										onPress={ this._toggleMap }
									/>
								</Animated.View>
						}

						{
                            <Animated.View style={ {
                            	position: 'absolute',
								bottom: 15,
								right: 15,
								opacity: this.animatedStyles.expandMapIconOpacity
                            } }>
								<Icon
									name='expand'
									size={ 30 }
									color={ Theme.primary }
									onPress={ this._toggleMap }
								/>
							</Animated.View>
						}

						<Animated.Text
							style={ {
								position: 'absolute',
								alignSelf: 'center',
								fontWeight: 'bold',
								fontSize: 20,
								color: '#222',
								opacity: this.animatedStyles.showClickMapMessageOpacity
							} }
						>Click To Expand</Animated.Text>
					</Animated.View>
				</TouchableWithoutFeedback>
				<ScrollView
					style={ { height: '100%', padding: 20 } }
					refreshControl={
						<RefreshControl refreshing={ this.props.contentReloading } onRefresh={ async (): Promise<void> => {
							await this._getJourney(true);
						} } />
					}
				>

					{
						userJoined &&
							<NoticeBanner
								icon='check'
								text='You have accepted this lift'
								backgroundColor='#69ff6b'
								color='#555'
							/>
					}

					<View style={ { padding: 20, backgroundColor: this.props.DARK_MODE ? '#333' : '#eee', borderRadius: 4, marginBottom: 10, alignItems: 'center' } }>
						<View style={ { marginBottom: 20 } }>
							<Text style={ { fontSize: 22, color: this.props.DARK_MODE ? 'white' : 'black' } }>From: { origin.name }</Text>
						</View>
						<View>
							<Text style={ { fontSize: 22, color: this.props.DARK_MODE ? 'white' : 'black' } }>To: { destination.name }</Text>
						</View>
					</View>

					<View style={ { alignItems: 'center' } }>
						<Text style={ { fontSize: 18, marginVertical: 10, color: this.props.DARK_MODE ? 'white' : 'black' } }>Seats Available: <Text style={ { fontWeight: 'bold', color: this.props.DARK_MODE ? 'white' : 'black' } }>{ seatsLeft }</Text></Text>
						<Text style={ { fontSize: 18, marginVertical: 10, color: this.props.DARK_MODE ? 'white' : 'black' } }>Cost: <Text style={ { fontWeight: 'bold', color: this.props.DARK_MODE ? 'white' : 'black' } }>€{ FormatMoney(pricePerSeat) }</Text></Text>
						<Text style={ { fontSize: 18, marginVertical: 10, color: this.props.DARK_MODE ? 'white' : 'black' } }>Driver: <Text style={ { fontWeight: 'bold', color: this.props.DARK_MODE ? 'white' : 'black' } }>{ driver.firstName } { driver.lastName }</Text></Text>
						<Text style={ { fontSize: 18, marginVertical: 10, color: this.props.DARK_MODE ? 'white' : 'black' } }>Posted: <Text style={ { fontWeight: 'bold', color: this.props.DARK_MODE ? 'white' : 'black' } }>{ journey.readableDurations.createdAt }</Text></Text>
						<Text style={ { fontSize: 18, marginVertical: 10, color: this.props.DARK_MODE ? 'white' : 'black' } }>Scheduled For: <Text style={ { fontWeight: 'bold', color: this.props.DARK_MODE ? 'white' : 'black' } }>{ this._formatLeavingTime(journey.times.leavingAt) }</Text></Text>
					</View>

					{
						!journey.userJoined &&
							<Button
								mode={ this.props.DARK_MODE ? 'outlined' : 'contained' }
								style={ { padding: 8, marginVertical: 10, backgroundColor: this.props.DARK_MODE ? 'white' : Theme.accent } }
								onPress={ this._joinJourney }
								color={ this.props.DARK_MODE ? 'black' : 'white' }
								loading={ this.state.journeyLoaded && this.props.isUpdating }
                                disabled={ this.props.isUpdating }
                            >Take Lift</Button>
					}

					{
						journey.userJoined &&
							<Button
								mode={ this.props.DARK_MODE ? 'outlined' : 'contained' }
								style={ { padding: 8, marginVertical: 10, backgroundColor: this.props.DARK_MODE ? 'white' : Theme.accent } }
								onPress={ this._cancelLiftAcceptance }
								color={ this.props.DARK_MODE ? 'black' : 'white' }
                                loading={ this.state.journeyLoaded && this.props.isUpdating }
								disabled={ this.props.isUpdating }
                            >Cancel Lift</Button>
					}

					<Button
						mode={ this.props.DARK_MODE ? 'contained' : 'outlined' }
						style={ { padding: 8, marginVertical: 10, backgroundColor: this.props.DARK_MODE ? 'black' : 'white' } }
						color={ this.props.DARK_MODE ? 'white' : Theme.accent }
						onPress={ (): boolean => this.props.navigation.navigate('OtherProfile', { userId: driver.userId }) }
					>View Driver Profile</Button>

					{
						this.state.mapToBeOpened &&
							<Animated.View
								style={ {
									position: 'absolute',
									left: -20,
									top: -20,
									right: -20,
									bottom: -height,
									backgroundColor: 'black',
									padding: 20,
									opacity: this.animatedStyles.overlayOpacity
								} }
							>
							</Animated.View>
					}

					{
						this.state.mapToBeOpened &&
							<Animated.View
								style={ {
									position: 'absolute',
									left: 0,
									right: 0,
									top: height / 10,
									opacity: this.animatedStyles.overlayButtonOpacity
								} }
							>
								<Button
									mode={ this.props.DARK_MODE ? 'contained' : 'outlined' }
									style={ { padding: 8, backgroundColor: 'white' } }
                                    color={ this.props.DARK_MODE ? 'white' : Theme.accent }
                                    onPress={ (): void => {
                                    	this.props.navigation.navigate('InteractiveMap', journey);
										this._toggleMap();
									} }
								>View Interactive Map</Button>
							</Animated.View>
					}
				</ScrollView>
			</View>
		);
	}
}

const mapStateToProps = (state: AppState): ViewJourneyState => ({
	...state.viewJourneyReducer,
	...state.darkModeReducer,
	...state.contentReloadReducer
});

export default connect(mapStateToProps, {
	updateAddUserJourney,
	cancelLiftAcceptance,
	getViewJourney,
	contentReloadOn,
	contentReloadOff,
	clearJourneyInfo
})(ViewJourney);
