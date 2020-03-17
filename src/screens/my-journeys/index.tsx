import React, { Component, ReactElement } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	ScrollView,
	RefreshControl,
	Dimensions,
	Image
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { AnimationStyles, AnimationValues, Props, State } from './interfaces';
import { JourneysState } from '../../types/redux-reducer-state-types';
import { AppState } from '../../store';
import { getJourneys, cancelPassengerAcceptedJourney } from '../../redux/actions';
import { Journey, UserBrief } from '@project-300/common-types';
import { NavigationEvents } from 'react-navigation';
import DatesTimes from '../../services/dates-times';
import moment from 'moment';
import { Button, FAB } from 'react-native-paper';
import { userType } from '../../auth';
import { AnimatedStyles } from '../../animations/styles';
import Animated, { Easing } from 'react-native-reanimated';
import { interpolateAnimation } from '../../animations/animations';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colours, ContrastTheme } from '../../constants/theme';
import formStyles from '../../styles/forms';

const { height } = Dimensions.get('window');
const { timing } = Animated;

export class MyJourneys extends Component<Props, State> {

	private animatedValues: AnimationValues = {
		panelOpen: new Animated.Value(1)
	};

	private animatedStyles: AnimationStyles = {
		panelHeight: 0
	};

	public constructor(props: Props) {
		super(props);

		this.state = {
			driverView: false,
			renderTrigger: 0,
			userType: 'Passenger', // Default until it is set on mount
			selectedJourney: undefined
		};

		this.animatedValues = {
			panelOpen: new Animated.Value(0)
		};

		this.animatedStyles = {
			panelHeight: interpolateAnimation(this.animatedValues.panelOpen, [ 0, 1 ], [ 0, height ])
		};
	}

	public async componentDidMount(): Promise<void> {
		setInterval(() =>
				this.setState({ renderTrigger: Math.random() }),
			5000
		); // Cause list of journey (times) to update once per minute

		const uType: string | null = await userType();
		if (uType) this.setState({ userType: uType });
	}

	private _getJourneys = async (driverView: boolean): Promise<void> => await this.props.getJourneys(driverView);

	private _switchUserTypeView = async (driverView: boolean): Promise<void> => {
		this.setState({ driverView });
		this._setHeaderTitle(driverView);
		await this._getJourneys(driverView);
	}

	private _setHeaderTitle = (driverView: boolean): void => {
		this.props.navigation.setParams({
			headerDetails: {
				title: driverView ? 'My Posted Journeys' : 'My Accepted Lifts'
			}
		});
	}

	private _openPassengerPanel = async (journey: Journey): Promise<void> => {
		await this.setState({ selectedJourney: journey });
		timing(this.animatedValues.panelOpen, {
			duration: 500,
			toValue: 1,
			easing: Easing.inOut(Easing.ease)
		}).start();
	}

	private _closePassengerPanel = (): void => {
		timing(this.animatedValues.panelOpen, {
			duration: 500,
			toValue: 0,
			easing: Easing.inOut(Easing.ease)
		}).start(() => this.setState({ selectedJourney: undefined }));
	}

	private _15MinutesOrLess = (time: string): boolean => moment(time).subtract(15, 'minutes') <= moment();

	private _6hoursOrLess = (time: string): boolean => moment(time).subtract(6, 'hours') <= moment();

	private _isLateBy = (time: string): number => DatesTimes.minutesSince(time);

	private _renderDriverJourneyRow = (journey: Journey): ReactElement => {
		const { journeyId, origin, destination, journeyStatus, times } = journey;
		const lateBy: number = this._isLateBy(times.leavingAt);
		const lastAction: { description: string; time: string } | false =
			!!journey.actionLogs && !!journey.actionLogs.length && journey.actionLogs[journey.actionLogs.length - 1];

		return (
			<View style={ [ styles.journeyCard ] } key={ journey.journeyId }>
				<View style={ [ styles.journeyCardHeader, journeyStatus === 'STARTED' && { backgroundColor: '#7BD981' } ] }>
					<Text style={ styles.journeyLocations }>
						<Text style={ styles.bold }>
							{ origin.name }
						</Text> to <Text style={ styles.bold }>
						{ destination.name }
					</Text>
					</Text>

					<View style={ styles.triangle } />
				</View>

				<View style={ styles.journeyContent }>
					<View style={ styles.journeyInfo }>
						<View style={ styles.journeyInfoTextContainer }>
							{
								journeyStatus === 'NOT_STARTED' &&
									<Text style={ [ styles.journeyInfoText, { marginBottom: 10 } ] }>
										Scheduled for { DatesTimes.dayAndTime(journey.times.leavingAt) }
									</Text>
							}

							{
								journeyStatus === 'NOT_STARTED' && this._6hoursOrLess(journey.times.leavingAt) && !this._15MinutesOrLess(journey.times.leavingAt) &&
									<Text style={ [ styles.journeyInfoText ] }>
										You can begin your journey at { moment(journey.times.leavingAt).subtract(15, 'minutes').format('HH:mm A') }
									</Text>
							}

							{
								journeyStatus === 'NOT_STARTED' && !lateBy && this._15MinutesOrLess(journey.times.leavingAt) &&
									<Text style={ [ styles.journeyInfoText, { color: 'green' } ] }>
										You can begin your journey now
									</Text>
							}

							{
								(journeyStatus === 'NOT_STARTED' || journeyStatus === 'PICKUP' || journeyStatus === 'WAITING') && lateBy > 0 &&
									<Text style={ [ styles.journeyInfoText, { color: 'red' } ] }>
										You are running over schedule by <Text style={ styles.bold }>{ lateBy }</Text> minute{ lateBy !== 1 && 's' }
									</Text>
							}

							{
								journeyStatus === 'PICKUP' &&
									<View style={ styles.journeyInfoTextContainer }>
										<Text style={ [ styles.journeyInfoText, { marginBottom: 10 } ] }>You are currently picking up Passengers.</Text>
										<Text style={ [ styles.journeyInfoText ] }>
											Started Pickup { DatesTimes.dayAndTime(journey.times.startedPickupAt) }
										</Text>
									</View>
							}

							{
								journeyStatus === 'WAITING' &&
									<View style={ styles.journeyInfoTextContainer }>
										<Text style={ [ styles.journeyInfoText, { marginBottom: 10 } ] }>You are currently waiting to Start.</Text>
									</View>
							}

							{
								journeyStatus === 'STARTED' &&
									<View style={ styles.journeyInfoTextContainer }>
										<Text style={ [ styles.journeyInfoText, { marginBottom: 10 } ] }>This journey is currently taking place.</Text>
										<Text style={ [ styles.journeyInfoText ] }>
											Started { DatesTimes.dayAndTime(journey.times.startedAt) }
										</Text>
									</View>
							}

							{
								journeyStatus === 'PAUSED' &&
									<View style={ styles.journeyInfoTextContainer }>
										<Text style={ [ styles.journeyInfoText, { marginBottom: 10 } ] }>You have currently paused this journey.</Text>
										<Text style={ [ styles.journeyInfoText ] }>
											Started { DatesTimes.dayAndTime(journey.times.pausedAt) }
										</Text>
									</View>
							}

							{
								journeyStatus === 'CANCELLED' &&
									<View style={ styles.journeyInfoTextContainer }>
										<Text style={ [ styles.journeyInfoText, { marginBottom: 10 } ] }>This journey was Cancelled.</Text>
										<Text style={ [ styles.journeyInfoText ] }>
											Cancelled { DatesTimes.dayAndTime(journey.times.cancelledAt) }
										</Text>
                                </View>
							}

							{
								journeyStatus === 'FINISHED' &&
									<View style={ styles.journeyInfoTextContainer }>
										<Text style={ [ styles.journeyInfoText, { marginBottom: 10 } ] }>Journey Complete.</Text>
										<Text style={ [ styles.journeyInfoText ] }>
											Ended { DatesTimes.dayAndTime(journey.times.endedAt) }
										</Text>
									</View>
							}
						</View>
					</View>

					{ this._renderDriverOptions(journey) }
				</View>
			</View>
		);
	}

	private _renderDriverOptions = (journey: Journey): ReactElement => {
		const { journeyId, journeyStatus, times: { createdAt, leavingAt }  } = journey;

		return (
			<View style={ styles.journeyOptions }>
				{
					journeyStatus === 'NOT_STARTED' && !this._15MinutesOrLess(leavingAt) &&
						<TouchableOpacity
							onPress={ (): boolean => this.props.navigation.navigate('ViewJourney', { journey }) }
						>
							<Text style={ styles.cardLink }>VIEW</Text>
						</TouchableOpacity>
				}

				{
					journeyStatus === 'NOT_STARTED' && this._15MinutesOrLess(leavingAt) &&
						<TouchableOpacity
							onPress={ (): boolean => this.props.navigation.navigate('PassengerPickup', { journeyKey: { journeyId, createdAt } }) }
						>
							<Text style={ styles.cardLink }>PICKUP</Text>
						</TouchableOpacity>
				}

				{
					journeyStatus === 'PICKUP' &&
						<TouchableOpacity
							onPress={ (): boolean => this.props.navigation.navigate('PassengerPickup', { journeyKey: { journeyId, createdAt } }) }
						>
							<Text style={ styles.cardLink }>PICKUP</Text>
						</TouchableOpacity>
				}

				{
					journeyStatus === 'WAITING' &&
						<TouchableOpacity
							onPress={ (): boolean => this.props.navigation.navigate('JourneyMap', { journeyKey: { journeyId, createdAt } }) }
						>
							<Text style={ styles.cardLink }>CONTINUE</Text>
						</TouchableOpacity>
				}

				{
					journeyStatus === 'STARTED' &&
						<TouchableOpacity
							onPress={ (): boolean => this.props.navigation.navigate('JourneyMap', { journeyKey: { journeyId, createdAt } }) }
						>
							<Text style={ styles.cardLink }>CONTINUE</Text>
						</TouchableOpacity>
				}

				{
					journeyStatus === 'PAUSED' &&
						<TouchableOpacity
							onPress={ (): boolean => this.props.navigation.navigate('JourneyMap', { journeyKey: { journeyId, createdAt } }) }
						>
							<Text style={ styles.cardLink }>RESUME</Text>
						</TouchableOpacity>
				}

				<TouchableOpacity
					onPress={ (): Promise<void> => this._openPassengerPanel(journey) }
				>
					<Text style={ styles.cardLink }>PASSENGERS</Text>
				</TouchableOpacity>
			</View>
		);
	}

	private _renderPassengerJourneyRow = (journey: Journey): ReactElement => {
		const { origin, destination, journeyStatus, times: { leavingAt, startedAt, cancelledAt, startedPickupAt, endedAt, pausedAt } } = journey;

		return (
			<View style={ [ styles.journeyCard ] } key={ journey.journeyId }>
				<View style={ [ styles.passengerJourneyCardHeader, journeyStatus === 'STARTED' ? { backgroundColor: '#7BD981' } : { } ] }>
					<Text style={ styles.passengerJourneyLocations }>
						<Text style={ styles.bold }>
							{ origin.name }
						</Text> to <Text style={ styles.bold }>
						{ destination.name }
					</Text>
					</Text>

					<View style={ styles.passengerTriangle } />
				</View>

				<View style={ styles.journeyContent }>
					<View style={ styles.journeyInfo }>
						{
							journeyStatus === 'NOT_STARTED' &&
								<View style={ styles.journeyInfoTextContainer }>
									<Text style={ [ styles.journeyInfoText ] }>
										Scheduled for { DatesTimes.dayAndTime(leavingAt) }
									</Text>
								</View>
						}

						{
							journeyStatus === 'PICKUP' &&
								<View style={ styles.journeyInfoTextContainer }>
									<Text style={ [ styles.journeyInfoText ] }>
										Driver has Started Pickup { DatesTimes.dayAndTime(startedPickupAt) }
									</Text>
								</View>
						}

						{
							journeyStatus === 'WAITING' &&
								<View style={ styles.journeyInfoTextContainer }>
									<Text style={ [ styles.journeyInfoText ] }>
										Driver is waiting to Start Journey
									</Text>
								</View>
						}

						{
							journeyStatus === 'PAUSED' &&
								<View style={ styles.journeyInfoTextContainer }>
									<Text style={ [ styles.journeyInfoText ] }>
										Driver has Paused the Journey { DatesTimes.dayAndTime(pausedAt) }
									</Text>
								</View>
						}

						{
							journeyStatus === 'STARTED' &&
								<View style={ styles.journeyInfoTextContainer }>
									<Text style={ [ styles.journeyInfoText, { marginBottom: 10 } ] }>This journey is currently taking place.</Text>
									<Text style={ [ styles.journeyInfoText ] }>
										Started { DatesTimes.dayAndTime(startedAt) }
									</Text>
								</View>
						}

						{
							journeyStatus === 'CANCELLED' &&
								<View style={ styles.journeyInfoTextContainer }>
									<Text style={ [ styles.journeyInfoText ] }>
										Journey was Cancelled { DatesTimes.dayAndTime(cancelledAt) }
									</Text>
								</View>
						}

						{
							journeyStatus === 'FINISHED' &&
								<View style={ styles.journeyInfoTextContainer }>
									<Text style={ [ styles.journeyInfoText ] }>
										Journey Complete { DatesTimes.dayAndTime(endedAt) }
									</Text>
								</View>
						}
					</View>

					{ this._renderPassengerOptions(journey) }
				</View>
			</View>
		);
	}

	private _renderPassengerOptions = (journey: Journey): ReactElement => {
		const { journeyId, journeyStatus, times: { createdAt } } = journey;

		return(
			<View style={ styles.journeyOptions }>
				{
					journeyStatus === 'NOT_STARTED' &&
						<TouchableOpacity
							onPress={ (): boolean => this.props.navigation.navigate('PassengerViewJourney', { journey }) }
						>
							<Text style={ styles.cardLink }>VIEW</Text>
						</TouchableOpacity>
				}

				{
					journeyStatus === 'PICKUP' &&
						<TouchableOpacity
							onPress={ (): boolean => this.props.navigation.navigate('DriverTrackingMap', { journeyKey: { journeyId, createdAt } }) }
						>
							<Text style={ styles.cardLink }>TRACK DRIVER</Text>
						</TouchableOpacity>
				}

				{
					journeyStatus === 'WAITING' || journeyStatus === 'STARTED' || journeyStatus === 'PAUSED' &&
						<TouchableOpacity
							onPress={ (): boolean => this.props.navigation.navigate('PassengerJourneyOverview') }
						>
							<Text style={ styles.cardLink }>VIEW</Text>
						</TouchableOpacity>
				}

				{
					journeyStatus === 'FINISHED' &&
						<TouchableOpacity
							onPress={ (): boolean => this.props.navigation.navigate('PassengerJourneyOverview') }
						>
							<Text style={ styles.cardLink }>RATE</Text>
						</TouchableOpacity>
				}

				<TouchableOpacity
					onPress={ (): boolean => this.props.navigation.navigate('Chat', { otherUserId: journey.driver.userId }) }
				>
					<Text style={ styles.cardLink }>CONTACT DRIVER</Text>
				</TouchableOpacity>
			</View>
		);
	}

	private _driverJourneyList = (journeys: Journey[]): ReactElement[] => {
		return journeys.map((j: Journey) => this._renderDriverJourneyRow(j));
	}

	private _passengerJourneyList = (journeys: Journey[]): ReactElement[] => {
		return journeys.map((j: Journey) => this._renderPassengerJourneyRow(j));

	}

	private _journeyList = (journeys: Journey[]): ReactElement[] | ReactElement =>
		this.state.driverView ?
			this._driverJourneyList(journeys) :
			this._passengerJourneyList(journeys);

	public render(): ReactElement {
		const { selectedJourney } = this.state;

		return (
			<View style={ { flex: 1 } }>
				<NavigationEvents onDidFocus={ (): Promise<void> => this._getJourneys(this.state.driverView) } />

				{
					this.state.userType === 'Driver' &&
						<View style={ styles.switchView }>
							<Button
								theme={ ContrastTheme }
								mode={ 'contained' }
								onPress={ (): Promise<void> => this._switchUserTypeView(!this.state.driverView) }
							>Switch to { this.state.driverView ? 'Passenger' : 'Driver' } View</Button>
						</View>
				}

				<ScrollView
					style={ styles.container }
					refreshControl={
						<RefreshControl refreshing={ this.props.isRequesting } onRefresh={ async (): Promise<void> => {
							await this._getJourneys(this.state.driverView);
						} } />
					}
				>

					{
						this.state.driverView && this.state.userType === 'Driver' && !!this.props.journeys.driver.length &&
							this._journeyList(this.props.journeys.driver)
					}

					{
						!this.state.driverView && !!this.props.journeys.passenger.length &&
							this._journeyList(this.props.journeys.passenger)
					}

					{
						this.state.driverView && !this.props.isRequesting && !this.props.journeys.driver.length &&
							<View>
								<Text style={ styles.centerText }>
									You have not posted any lifts yet
								</Text>
							</View>
					}

					{
						!this.state.driverView && !this.props.isRequesting && !this.props.journeys.passenger.length &&
							<View style={ styles.noResults }>
								<Text style={ styles.centerText }>
									You have not accepted any lifts
								</Text>

								<Button
									style={ [ formStyles.button, styles.noResultsButton ] }
									theme={ ContrastTheme }
									mode={ 'outlined' }
									onPress={ (): boolean => this.props.navigation.navigate('SearchJourneys') }
								>Search For One</Button>
							</View>
					}
				</ScrollView>

				{
					selectedJourney &&
						<Animated.View
							style={ [
								styles.passengerPanel,
								AnimatedStyles.height(this.animatedStyles.panelHeight)
							] }>

							<View style={ { margin: 10 } }>
								<Icon
									name={ 'times' }
									size={ 34 }
									color={ Colours.primary }
									onPress={ this._closePassengerPanel }
								/>

								<View style={ styles.passengerListInfo }>
									<Text style={ styles.centerText }>There { selectedJourney.passengers.length === 1 ? 'is' : 'are' } { selectedJourney.passengers.length } passenger{ selectedJourney.passengers.length !== 1 && 's' } who { selectedJourney.passengers.length === 1 ? 'has' : 'have' } accepted a seat on this journey.</Text>

									{
										selectedJourney.seatsLeft === 0 ?
											<Text style={ styles.centerText }>All { selectedJourney.totalNoOfSeats } seats have been taken.</Text> :
											<Text style={ styles.centerText }>There are { selectedJourney.seatsLeft } out of { selectedJourney.totalNoOfSeats } seats still available.</Text>
									}
								</View>

								<View style={ styles.passengerListContainer }>

									{
										selectedJourney.passengers.map((passenger: UserBrief): ReactElement => {
											return (
												<TouchableOpacity onPress={ (): boolean => this.props.navigation.navigate('PassengerOtherProfile', { userId: passenger.userId }) }>
													<View style={ styles.passengerListItem }>
														<View
															style={ styles.passengerListAvatarContainer }
														>
															<Image
																source={ passenger.avatar ? { uri: passenger.avatar } : require('../../assets/images/no-avatar.jpg') }
																style={ styles.passengerListAvatar }
															/>
														</View>

														<Text style={ styles.passengerListName }>{ passenger.firstName } { passenger.lastName }</Text>

														<Icon
															style={ styles.passengerArrowIcon }
															name={ 'angle-right' }
															size={ 30 }
														/>
													</View>
												</TouchableOpacity>
											);
										})
									}
								</View>
							</View>
						</Animated.View>
				}
			</View>
		);
	}
}

const mapStateToProps = (state: AppState): JourneysState => ({
	...state.driverJourneysReducer
});

export default connect(mapStateToProps, { getJourneys, cancelPassengerAcceptedJourney })(MyJourneys);
