import React, { Component, ReactElement } from 'react';
import { ScrollView, FlatList, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Props, State } from './interfaces';
import { AppState } from '../../store';
import { AllJourneysListState } from '../../types/redux-reducer-state-types';
import { Journey } from '@project-300/common-types';
import { getAllJourneys } from '../../redux/actions';
import { Container, Content, Card, CardItem, Body } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import DatesTimes from '../../services/dates-times';

class AllJourneys extends Component<Props, State> {

	public constructor(props: Props) {
		super(props);
	}

	public async componentDidMount(): Promise<void> {
		await this.props.getAllJourneys();
	}

	private _renderRow = ({ item, index }: { item: Journey; index: number }): ReactElement => {
		const journey: Journey = item;

		return (
			<Card>
				<CardItem header bordered style={ styles.cardHeader }>
					<Text style={ styles.journeyHeading }>
						<Text style={ styles.bold }>{ journey.origin.name }</Text> to{ ' ' }
						<Text style={ styles.bold }>{ journey.destination.name }</Text>
					</Text>
				</CardItem>
				<CardItem bordered>
					<Body>
						<Text style={ styles.textRow }>The journey begins at <Text style={ styles.bold }>
								{ DatesTimes.hoursMinutes(journey.times.leavingAt) }
							</Text> on <Text style={ styles.bold }>
								{ DatesTimes.readableDate(journey.times.leavingAt) }
							</Text>
						</Text>

						<Text style={ styles.textRow }>
							There are <Text style={ styles.bold }>{ journey.seatsLeft }
						</Text> / <Text style={ styles.bold }>
							{ journey.totalNoOfSeats }
						</Text> seats left
						</Text>

						<Text style={ styles.textRow }>
							<Text style={ styles.bold }> €{ journey.pricePerSeat }</Text> euro per seat
						</Text>

						<Text style={ styles.textRow }>
							Driver Name: <Text style={ styles.bold }> { journey.driver.firstName } { journey.driver.lastName }</Text>
						</Text>
					</Body>
				</CardItem>
				<CardItem footer bordered>
					<TouchableOpacity
						style={ styles.button }
						onPress={ (): boolean => this.props.navigation.navigate('ViewJourney', journey) }
					>
						<Text style={ styles.buttonText }>View</Text>
					</TouchableOpacity>
				</CardItem>
			</Card>
		);
	}

	public render(): ReactElement {
		return (
			<Container>
				<Content>
					<Spinner visible={ this.props.isFetching } />
					<ScrollView style={ styles.container }>
						<FlatList
							data={ this.props.journeys }
							renderItem={ this._renderRow }
							keyExtractor={ (item: Journey): string => item.journeyId }
						/>
					</ScrollView>
				</Content>
			</Container>
		);
	}

}

const mapStateToProps = (state: AppState): AllJourneysListState => ({
	...state.allJourneysReducer
});

export default connect(mapStateToProps, {
	getAllJourneys
})(AllJourneys);
