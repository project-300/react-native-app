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
import { Journey } from '@project-300/common-types';
import { NavigationEvents } from 'react-navigation';
import { Container, Tab, Tabs, Content, Spinner, Card, CardItem, Body } from 'native-base';

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
						<Text>
							{ journey.seatsLeft } / { journey.totalNoOfSeats } seats left
						</Text>
						<Text>
							{ journey.pricePerSeat } euro per seat
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
						<Text>The journey begins at { journey.times.leavingAt }</Text>
						<Text>
							{ journey.seatsLeft } / { journey.totalNoOfSeats } seats left
						</Text>
						<Text>
							{ journey.pricePerSeat } euro per seat
						</Text>
					</Body>
				</CardItem>
				<CardItem footer bordered>
					{
						journey.journeyStatus === 'NOT_STARTED' &&
							<TouchableOpacity
								style={ styles.button }
								onPress={ (): Promise<void> => this.props.cancelPassengerAcceptedJourney(item.journeyId) }
							>
								<Text style={ styles.buttonText }>Cancel Journey { this.props.isCancelling && 'CANCELLING' }</Text>
							</TouchableOpacity>
					}
					{
						journey.journeyStatus === 'STARTED' &&
							<TouchableOpacity
								style={ styles.button }
								onPress={ (): boolean => this.props.navigation.navigate('DriverTrackingMap', { journeyId: journey.journeyId }) }
							>
								<Text style={ styles.buttonText }>View Map</Text>
							</TouchableOpacity>
					}
				</CardItem>
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
				<NavigationEvents onDidFocus={ this._getJourneys } />
					<Tabs>
						<Tab heading='Current'>
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
						<Tab heading='Previous'>
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
