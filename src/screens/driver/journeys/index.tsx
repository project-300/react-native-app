import React, { Component, ReactElement } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Props, State } from './interfaces';
import { JourneysState } from '../../../types/redux-reducer-state-types';
import { AppState } from '../../../store';
import { getJourneys, cancelPassengerAcceptedJourney } from '../../../redux/actions';
import { Journey } from '@project-300/common-types';
import { NavigationEvents } from 'react-navigation';
import DatesTimes from '../../../services/dates-times';
import moment from 'moment';

export class MyJourneys extends Component<Props, State> {

	public constructor(props: Props) {
		super(props);

		//const driverView: boolean = this.props.navigation.getParam('driverView');

		this.state = {
			driverView: true,
			renderTrigger: 0
		};
	}

	public componentDidMount(): void {
		console.log(this.props);

			// Cause list of journey (times) to update once per minute
		setInterval(() => this.setState({ renderTrigger: Math.random() }), 5000);
	}

	private _getJourneys = async (): Promise<void> => await this.props.getJourneys(this.state.driverView);

	private _15MinutesOrLess = (time: string): boolean => moment(time).subtract(15, 'minutes') <= moment();

	private _6hoursOrLess = (time: string): boolean => moment(time).subtract(6, 'hours') <= moment();

	private _isLateBy = (time: string): number => DatesTimes.minutesSince(time);

	private _renderDriverJourneyRow = (journey: Journey): ReactElement => {
		const { journeyId, origin, destination, journeyStatus, times } = journey;
		const lateBy: number = this._isLateBy(times.leavingAt);

		return (
			<View style={ [ styles.journeyCard, journeyStatus === 'STARTED' && { borderColor: 'green' } ] } key={ journey.journeyId }>
				<View style={ [ styles.journeyCardHeader, journeyStatus === 'STARTED' && { backgroundColor: 'green' } ] }>
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
								journeyStatus === 'NOT_STARTED' && lateBy &&
									<Text style={ [ styles.journeyInfoText, { color: 'red' } ] }>
										You are running over schedule by <Text style={ styles.bold }>{ lateBy }</Text> minute{ lateBy !== 1 && 's' }
									</Text>
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
						</View>
					</View>

					{ this._renderDriverOptions(journeyId, journeyStatus, times.leavingAt) }
				</View>
			</View>
		);
	}

	private _renderDriverOptions = (journeyId: string, journeyStatus: string, leavingAt: string): ReactElement => {
		return (
			<View style={ styles.journeyOptions }>
				{
					journeyStatus === 'NOT_STARTED' && !this._15MinutesOrLess(leavingAt) &&
						<TouchableOpacity
							onPress={ (): boolean => this.props.navigation.navigate('JourneyMap', { journeyId }) }
						>
							<Text style={ styles.cardLink }>VIEW</Text>
						</TouchableOpacity>
				}

				{
					journeyStatus === 'NOT_STARTED' && this._15MinutesOrLess(leavingAt) &&
						<TouchableOpacity
							onPress={ (): boolean => this.props.navigation.navigate('JourneyMap', { journeyId }) }
						>
							<Text style={ styles.cardLink }>START</Text>
						</TouchableOpacity>
				}

				{
					journeyStatus === 'STARTED' &&
						<TouchableOpacity
							onPress={ (): boolean => this.props.navigation.navigate('JourneyMap', { journeyId }) }
						>
							<Text style={ styles.cardLink }>CONTINUE</Text>
						</TouchableOpacity>
				}

				<TouchableOpacity
					onPress={ (): boolean => this.props.navigation.navigate('JourneyMap', { journeyId }) }
				>
					<Text style={ styles.cardLink }>PASSENGERS</Text>
				</TouchableOpacity>
			</View>
		);
	}

	private _renderPassengerJourneyRow = (journey: Journey): ReactElement => {
		const { origin, destination, journeyStatus } = journey;

		return (
			<View style={ [ styles.journeyCard, journeyStatus === 'STARTED' ? { borderColor: 'green' } : { } ] } key={ journey.journeyId }>
				<View style={ [ styles.passengerJourneyCardHeader, journeyStatus === 'STARTED' ? { backgroundColor: 'green' } : { } ] }>
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
										Scheduled for { DatesTimes.dayAndTime(journey.times.leavingAt) }
									</Text>
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
					</View>

					{ this._renderPassengerOptions(journey) }
				</View>
			</View>
		);
	}

	private _renderPassengerOptions = (journey: Journey): ReactElement => {
		const { journeyId, journeyStatus } = journey;

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
					journeyStatus === 'STARTED' &&
						<TouchableOpacity
							onPress={ (): boolean => this.props.navigation.navigate('DriverTrackingMap', { journeyId }) }
						>
							<Text style={ styles.cardLink }>TRACK DRIVER</Text>
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
		return (
			<ScrollView style={ styles.container }>
				<NavigationEvents onDidFocus={ this._getJourneys } />

				{
					this.props.journeys.current.length ?
						this._journeyList(this.props.journeys.current) :
						<View>
							<Text style={ styles.centerText }>
								{
									this.props.isRequesting ?
										'Retrieving current journeys.' :
										'You have no current journeys.'
								}
							</Text>
						</View>
				}
			</ScrollView>
		);
	}
}

const mapStateToProps = (state: AppState): JourneysState => ({
	...state.driverJourneysReducer
});

export default connect(mapStateToProps, { getJourneys, cancelPassengerAcceptedJourney })(MyJourneys);
