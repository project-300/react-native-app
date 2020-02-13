import React, { Component, ReactElement } from 'react';
import { ScrollView, FlatList, TouchableOpacity, View, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Props, State } from './interfaces';
import { AppState } from '../../store';
import { AllJourneysListState } from '../../types/redux-reducer-state-types';
import { Journey } from '@project-300/common-types';
import { getAllJourneys } from '../../redux/actions';
// import { Container, Content, Card, CardItem, Body } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import DatesTimes from '../../services/dates-times';
import { Avatar, Button, Card, Title, Paragraph, Searchbar, Text } from 'react-native-paper';

class AllJourneys extends Component<Props, State> {

	public constructor(props: Props) {
		super(props);

		this.state = {
			searchText: ''
		};
	}

	public async componentDidMount(): Promise<void> {
		await this.props.getAllJourneys();
	}

	private _renderRow = ({ item, index }: { item: Journey; index: number }): ReactElement => {
		const journey: Journey = item;

		return (
			<Card onPress={ (): boolean => this.props.navigation.navigate('ViewJourney', journey) }>
				<Card.Title
					title={ `${journey.origin.name} - ${journey.destination.name}` }
					subtitle={ `${ DatesTimes.hoursMinutes(journey.times.leavingAt) } on ${ DatesTimes.readableDate(journey.times.leavingAt) }` }
					left={ (props) => <Avatar.Icon { ...props } icon='map-marker' /> }
				/>
				<Card.Cover source={ { uri: 'https://maps.googleapis.com/maps/api/staticmap?center=40.714728,-73.998672&zoom=12&size=800x200&key=AIzaSyB76C0HSXw5v52cyaP-nToaJOtBSi2T_bM' } } />
				<Card.Content style={ { paddingTop: 20 } }>
					<TouchableWithoutFeedback onPress={ (): boolean => this.props.navigation.navigate('OtherProfile', { userId: journey.driver.userId }) }>
						<Text style={ styles.textRow }>
							Driver Name: <Text style={ styles.bold }> { journey.driver.firstName } { journey.driver.lastName }</Text>
						</Text>
					</TouchableWithoutFeedback>

					<Text style={ styles.textRow }>
							There are <Text style={ styles.bold }>{ journey.seatsLeft }
						</Text> / <Text style={ styles.bold }>
							{ journey.totalNoOfSeats }
						</Text> seats left
					</Text>

					<Text style={ styles.textRow }>
						<Text style={ styles.bold }> €{ journey.pricePerSeat }</Text> euro per seat
					</Text>
				</Card.Content>
				{/*<Card.Actions>*/}
				{/*	<Button*/}
				{/*		onPress={ (): boolean => this.props.navigation.navigate('ViewJourney', journey) }*/}
				{/*	>View</Button>*/}
				{/*</Card.Actions>*/}
			</Card>
		);
	}

	public render(): ReactElement {
		return (
			<View style={ styles.container }>
				<Searchbar
					placeholder="Search"
					onChangeText={query => { this.setState({ searchText: query }); }}
					value={ this.state.searchText }
					style={ { margin: 10 } }
				/>
				<ScrollView>
					<Spinner visible={ this.props.isFetching } />

					<FlatList
						data={ this.props.journeys }
						renderItem={ this._renderRow }
						keyExtractor={ (item: Journey): string => item.journeyId }
					/>

					{
						!this.props.journeys.length &&
							<View style={ { alignItems: 'center' } }>
								<Text style={ { fontWeight: 'bold', fontSize: 20, marginTop: 20 } }>No lifts available</Text>
							</View>
					}
				</ScrollView>
			</View>
		);
	}

}

const mapStateToProps = (state: AppState): AllJourneysListState => ({
	...state.allJourneysReducer
});

export default connect(mapStateToProps, {
	getAllJourneys
})(AllJourneys);
