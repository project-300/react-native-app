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
import { Colours, ContrastTheme, Theme } from '../../../constants/theme';
import { NavigationEvents } from 'react-navigation';
import {
	getViewJourney,
	updateAddUserJourney,
	cancelLiftAcceptance,
	contentReloadOff,
	contentReloadOn,
	clearJourneyInfo
} from '../../../redux/actions';
import { NoticeBanner } from '../../../components/miscellaneous/notice-banner';
import styles from './styles';
import { DarkMode } from '../../../helpers/dark-mode';
import { AnimatedStyles } from '../../../animations/styles';
import DatesTimes from '../../../services/dates-times';
import formStyles from '../../../styles/forms';
import { priceBadgeText } from '../../all-journeys/styles';

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

		this._setHeaderTitle();

		await this._getJourney(false);
		this.setState({ journeyLoaded: true });
		this._setHeaderTitle();
	}

	private _setHeaderTitle = (): void => {
		const { journey } = this.props;

		this.props.navigation.setParams({
			headerDetails: {
				title: journey ? `${journey.origin.name} to ${journey.destination.name}` : 'Journey Details'
			}
		});
	}

	private _showClickMapMessage = (prepping: boolean): void => {
		timing(this.animatedValues.prepping, {
			duration: 500,
			toValue: prepping ? 1 : 0,
			easing: Easing.inOut(Easing.ease)
		}).start();
	}

	private _unmountScreen = (): void => { // Triggered when the screen is navigated away from
		this.props.clearJourneyInfo();
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

	private _getPriceFontSize = (price: number): number => {
		const length: number = FormatMoney(price).length;
		if (length <= 2) return 18;
		return 14;
	}

	private _constructImageURL = (path: string, origin: Place, destination: Place): string => {
		let url = `https://maps.googleapis.com/maps/api/staticmap`;
		url += `?size=${width}x${height / 2}`;
		url += `&path=color:0x0000ff|weight:3${path}`;
		url += `&markers=color:blue|label:O|${origin.latitude},${origin.longitude}`;
		url += `&markers=color:green|label:D|${destination.latitude},${destination.longitude}`;
		url += `&maptype=roadmap&key=${GoogleMapsAPIKey}`;

		return url;
	}

	private _renderNavigationEvents = (): ReactElement =>
		<NavigationEvents onWillFocus={ this._mountScreen } onDidBlur={ this._unmountScreen } />

	public render(): ReactElement {
		const journey: Journey = this.props.journey || this.state.journey;

		const { origin, destination, driver, plannedRoute, seatsLeft, pricePerSeat, userJoined } = journey;

		const path: string = plannedRoute.map((c: Coords) => `|${c.latitude},${c.longitude}`).join('');

		const { DARK_MODE } = this.props;

		return (
			<View style={ styles.container }>
				{ this._renderNavigationEvents() }

				<TouchableWithoutFeedback
					onPress={ this._toggleMap }
					style={ styles.mapImageTouchable }
				>
					<Animated.View
						style={ [
							styles.mapImageContainer,
							AnimatedStyles.height(this.animatedStyles.mapHeight)
						] }
					>
						<Animated.Image
							style={ [
								styles.mapImage,
								AnimatedStyles.opacity(this.animatedStyles.mapOpacity)
							] }
							source={ { uri: this._constructImageURL(path, origin, destination) } }
						/>

						{
								<Animated.View style={ [
									styles.mapImageTopIcon,
									AnimatedStyles.opacity(this.animatedStyles.closeMapIconOpacity)
								] }>
									<Icon
										name='compress'
										size={ 34 }
										color={ Theme.accent }
										onPress={ this._toggleMap }
									/>
								</Animated.View>
						}

						{
							<Animated.View style={ [
								styles.mapImageBottomIcon,
								AnimatedStyles.opacity(this.animatedStyles.expandMapIconOpacity)
							] }>
								<Icon
									name='expand'
									size={ 30 }
									color={ Theme.accent }
									onPress={ this._toggleMap }
								/>
							</Animated.View>
						}

						<Animated.Text
							style={ [
								styles.clickToExpandText,
								AnimatedStyles.opacity(this.animatedStyles.showClickMapMessageOpacity)
							] }
						>Click To Expand</Animated.Text>
					</Animated.View>
				</TouchableWithoutFeedback>

				<ScrollView
					style={ styles.content }
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
								backgroundColor={ Colours.green }
								color={ Colours.white }
							/>
					}

					<View style={ styles.infoBlock }>
						<View
							style={ styles.priceBadge }
						>
							<Text style={ priceBadgeText(journey.pricePerSeat ? this._getPriceFontSize(journey.pricePerSeat) : 16) }>
								{ journey.pricePerSeat ? `€${ FormatMoney(journey.pricePerSeat) }` : 'Free' }
							</Text>
						</View>

						<Text style={ styles.placeText }>
							<Text style={ styles.bold }>{ origin.name }</Text> - <Text style={ styles.bold }>{ destination.name }</Text>
						</Text>

						<Text style={ styles.infoRow }>
							Seats Available:
							<Text style={ [
								styles.bold,
								DarkMode.bwTextColorSwitch(DARK_MODE)
							] }>
								{ ` ${seatsLeft}` }
							</Text>
						</Text>

						<Text style={ [
							styles.infoRow,
							DarkMode.bwTextColorSwitch(DARK_MODE)
						] }>
							Cost:
							<Text style={ styles.bold }>
								{ pricePerSeat ? ` €${FormatMoney(pricePerSeat)}` : ' Free' }
							</Text>
						</Text>

						{
							!!driver.firstName || !!driver.lastName &&
								<Text style={ [
									styles.infoRow,
									DarkMode.bwTextColorSwitch(DARK_MODE)
								] }>
									Driver:
									<Text style={ [
										styles.bold,
										DarkMode.bwTextColorSwitch(DARK_MODE)
									] }>
										{ ` ${driver.firstName} ${driver.lastName}` }
									</Text>
								</Text>
						}

						<Text style={ [
							styles.infoRow,
							DarkMode.bwTextColorSwitch(DARK_MODE)
						] }>
							Posted:
							<Text style={ [
								styles.bold,
								DarkMode.bwTextColorSwitch(DARK_MODE)
							] }>
								{ ` ${DatesTimes.dayAndTime(journey.times.createdAt)}` }
							</Text>
						</Text>

						<Text style={ [
							styles.infoRow,
							DarkMode.bwTextColorSwitch(DARK_MODE)
						] }>
							Scheduled For:
							<Text style={ [
								styles.bold,
								DarkMode.bwTextColorSwitch(DARK_MODE)
							] }>
								{ ` ${DatesTimes.dayAndTime(journey.times.leavingAt)}` }
							</Text>
						</Text>

						<View style={ { marginTop: 20 } }>
							{
								!journey.userJoined &&
									<Button
										mode={ 'contained' }
										style={ [
											styles.actionButton,
											formStyles.button
										] }
										onPress={ this._joinJourney }
										loading={ this.state.journeyLoaded && this.props.isUpdating }
										disabled={ this.props.isUpdating }
										theme={ ContrastTheme }
									>Take Lift</Button>
							}

							{
								journey.userJoined &&
									<Button
										mode={ 'contained' }
										style={ [
											styles.actionButton,
											formStyles.button
										] }
										onPress={ this._cancelLiftAcceptance }
										loading={ this.state.journeyLoaded && this.props.isUpdating }
										disabled={ this.props.isUpdating }
										theme={ ContrastTheme }
									>Cancel Lift</Button>
							}

							<Button
								mode={ 'outlined' }
								style={ [ styles.actionButton, formStyles.button ] }
								theme={ ContrastTheme }
								onPress={ (): boolean => this.props.navigation.navigate('OtherProfile', { userId: driver.userId }) }
							>View Driver Profile</Button>
						</View>
					</View>

					{
						this.state.mapToBeOpened &&
							<Animated.View
								style={ [
									styles.overlay,
									AnimatedStyles.opacity(this.animatedStyles.overlayOpacity)
								] }
							/>
					}

					{
						this.state.mapToBeOpened &&
							<Animated.View
								style={ [
									styles.overlayButtonContainer,
									AnimatedStyles.opacity(this.animatedStyles.overlayButtonOpacity)
								] }
							>
								<Button
									mode={ 'outlined' }
									style={ styles.overlayButton }
									onPress={ (): void => {
										this.props.navigation.navigate('InteractiveMap', journey);
										this._toggleMap();
									} }
									theme={ ContrastTheme }
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
