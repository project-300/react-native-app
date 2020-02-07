import React, { Component, ReactElement } from 'react';
import {
	Text,
	View,
	FlatList,
	TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Props, State } from './interfaces';
import { JourneysState } from '../../../types/redux-reducer-state-types';
import { AppState } from '../../../store';
import { getJourneys, cancelPassengerAcceptedJourney } from '../../../redux/actions';
import { Journey, PassengerBrief } from '@project-300/common-types';
import { NavigationEvents } from 'react-navigation';
import { Container, Tab, Tabs, Content, Spinner, Card, CardItem, Body } from 'native-base';
import DatesTimes from '../../../services/dates-times';
import Icon from 'react-native-vector-icons/FontAwesome5';
import HeaderBar from '../../../headerbar';

export class MyJourneys extends Component<Props, State> {

	public constructor(props: Props) {
		super(props);

		const driverView: boolean = this.props.navigation.getParam('driverView');

		this.state = {
			driverView
		};
	}

	public componentDidMount(): void {
		console.log(this.props);
	}

	private _getJourneys = async (): Promise<void> => await this.props.getJourneys(this.state.driverView);

	private _renderDriverJourneyRow = ({ item, index }: { item: Journey; index: number }): ReactElement => {
		const journey: Journey = item;

		return (
			<Card>
				<CardItem header bordered style={ styles.cardHeader }>
					<Text style={ styles.journeyHeading }>
						<Text style={ styles.bold }>
							{ journey.origin.name }
						</Text> to <Text style={ styles.bold }>
							{ journey.destination.name }
						</Text>
					</Text>
				</CardItem>
				<CardItem bordered>
					<Body>
						<Text style={ styles.textRow }>
							There are <Text style={ styles.bold }>{ journey.seatsLeft }
							</Text> / <Text style={ styles.bold }>
								{ journey.totalNoOfSeats }
							</Text> seats left
						</Text>

						<Text style={ styles.textRow }>
							<Text style={ styles.bold }> €{ journey.pricePerSeat }</Text> euro per seat
						</Text>

						<Text style={ styles.textRow }>Your passengers:
							{
								journey.passengers.length ? journey.passengers.map((p: PassengerBrief) => {
									return <Text>
										<Text style={ styles.bold }>
											<Icon
												name='user'
												size={ 14 }
												style={ { marginLeft: 5, color: 'grey' } }
												solid
											/> { p.firstName } { p.lastName }
										</Text>
									</Text>;
								}) : ' None'
							}
						</Text>
					</Body>
				</CardItem>
				{
					journey.journeyStatus !== 'FINISHED' &&
						<CardItem footer bordered>
							{
								journey.journeyStatus === 'NOT_STARTED' &&
								<TouchableOpacity
									style={ styles.button }
									onPress={ (): boolean => this.props.navigation.navigate('JourneyMap', { journeyId: journey.journeyId }) }
								>
									<Text style={ styles.buttonText }>Start Journey</Text>
								</TouchableOpacity>
							}

							{
								journey.journeyStatus === 'STARTED' &&
								<TouchableOpacity
									style={ styles.button }
									onPress={ (): boolean => this.props.navigation.navigate('JourneyMap', { journeyId: journey.journeyId }) }
								>
									<Text style={ styles.buttonText }>Continue Journey</Text>
								</TouchableOpacity>
							}
						</CardItem>
				}
			</Card>
		);
	}

	private _renderPassengerJourneyRow = ({ item, index }: { item: Journey; index: number }): ReactElement => {
		const journey: Journey = item;
		const journeyStatus: string = journey.journeyStatus;

		return (
			<Card>
				<CardItem header bordered style={ styles.cardHeader }>
					<Text style={ styles.journeyHeading }>
						<Text style={ styles.bold }>
							{ journey.origin.name }
						</Text> to <Text style={ styles.bold }>
							{ journey.destination.name }
						</Text>
					</Text>
				</CardItem>
				<CardItem bordered>
					<Body>
						{
							journeyStatus === 'FINISHED' ?
								<Text style={ styles.textRow }>The journey began at <Text style={ styles.bold }>
										{ DatesTimes.hoursMinutes(journey.times.leavingAt) }
									</Text> on <Text style={ styles.bold }>
										{ DatesTimes.readableDate(journey.times.leavingAt) }
									</Text> and ended at <Text style={ styles.bold }>
										{ DatesTimes.hoursMinutes(journey.times.endedAt) }
									</Text> on <Text style={ styles.bold }>
										{ DatesTimes.readableDate(journey.times.endedAt) }
									</Text>
								</Text> :
								<Text style={ styles.textRow }>The journey begins at <Text style={ styles.bold }>
										{ DatesTimes.hoursMinutes(journey.times.leavingAt) }
									</Text> on <Text style={ styles.bold }>
										{ DatesTimes.readableDate(journey.times.leavingAt) }
									</Text>
								</Text>
						}

						<Text style={ styles.textRow }>
							Your driver is <Text style={ styles.bold }>{ journey.driver && journey.driver.firstName } { journey.driver && journey.driver.lastName }</Text>
						</Text>
					</Body>
				</CardItem>
				{
					journeyStatus !== 'FINISHED' &&
						<CardItem footer bordered>
							{
								journeyStatus === 'NOT_STARTED' &&
									<TouchableOpacity
										style={ styles.button }
										onPress={ (): Promise<void> => this.props.cancelPassengerAcceptedJourney(item.journeyId) }
									>
										<Text style={ styles.buttonText }>Cancel Journey</Text>
									</TouchableOpacity>
							}
							{
								journeyStatus === 'STARTED' &&
									<TouchableOpacity
										style={ styles.button }
										onPress={ (): boolean => this.props.navigation.navigate('DriverTrackingMap', { journeyId: journey.journeyId }) }
									>
										<Text style={ styles.buttonText }>View Map</Text>
									</TouchableOpacity>
							}
						</CardItem>
				}
			</Card>
		);
	}

	private _driverJourneyList = (journeys: Journey[]): ReactElement => {
		return <FlatList
			data={ journeys }
			extraData={ this.props }
			renderItem={ this._renderDriverJourneyRow }
			keyExtractor={ (j: Journey): string => j.journeyId }
		/>;
	}

	private _passengerJourneyList = (journeys: Journey[]): ReactElement => {
		return <FlatList
			data={ journeys }
			extraData={ this.props }
			renderItem={ this._renderPassengerJourneyRow }
			keyExtractor={ (j: Journey): string => j.journeyId }
		/>;
	}

	private _journeyList = (journeys: Journey[]): ReactElement =>
		this.state.driverView ?
			this._driverJourneyList(journeys) :
			this._passengerJourneyList(journeys);

	public render(): ReactElement {
		return (
			<Container>
				{/*<HeaderBar navigation={ this.props.navigation } backButton={ true } />*/}
				<NavigationEvents onDidFocus={ this._getJourneys } />
				<Tabs>
					<Tab heading='Current' textStyle={ { color: 'grey' } } tabStyle={ { backgroundColor: 'white' } } activeTabStyle={ { backgroundColor: '#eee' } } activeTextStyle={ { color: '#194781' } }>
						<Content padder>
							{
								this.props.isRequesting && <Spinner />
							}
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
						</Content>
					</Tab>
					<Tab heading='Previous' textStyle={ { color: 'grey' } } tabStyle={ { backgroundColor: 'white' } } activeTabStyle={ { backgroundColor: '#eee' } } activeTextStyle={ { color: '#194781' } }>
						<Content padder>
							{
								this.props.journeys.previous.length ?
									this._journeyList(this.props.journeys.previous) :
									<View>
										<Text style={ styles.centerText }>
											{
												this.props.isRequesting ?
													'Retrieving previous journeys.' :
													'You have no previous journeys.'
											}
										</Text>
									</View>
							}
						</Content>
					</Tab>
				</Tabs>
			</Container>
		);
	}
}

const mapStateToProps = (state: AppState): JourneysState => ({
	...state.driverJourneysReducer
});

export default connect(mapStateToProps, { getJourneys, cancelPassengerAcceptedJourney })(MyJourneys);
