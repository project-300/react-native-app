import React, { Component, ReactElement } from 'react';
import { ScrollView, FlatList, View, TouchableWithoutFeedback, NativeScrollEvent } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Props, State } from './interfaces';
import { AppState } from '../../store';
import { AllJourneysListState } from '../../types/redux-reducer-state-types';
import { Journey } from '@project-300/common-types';
import { getAllJourneys, searchJourneys, clearJourneys } from '../../redux/actions';
import Spinner from 'react-native-loading-spinner-overlay';
import DatesTimes from '../../services/dates-times';
import { ActivityIndicator, Avatar, Card, Searchbar, Text, TextInput } from 'react-native-paper';
import { NavigationEvents } from 'react-navigation';
import _ from 'lodash';
import { Theme } from '../../constants/theme';
import Icon from 'react-native-vector-icons/FontAwesome5';

class AllJourneys extends Component<Props, State> {

	public constructor(props: Props) {
		super(props);

		this.state = this.initialState;
	}

	private initialState: State = {
		searchText: ''
	};

	private _mountScreen = async (): Promise<void> => { // Triggered when this screen renders (navigated to)
		await this.props.getAllJourneys(true, this.props.lastEvaluatedKey);
	}

	private _unmountScreen = (): void => { // Triggered when the screen is navigated away from
		this.setState(this.initialState); // Reset the state of the component for next mount
	}

	// public async componentDidMount(): Promise<void> {
	// 	await this.props.getAllJourneys(this.props.lastEvaluatedKey);
	// }

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
					<Text>{ journey.times.createdAt }</Text>
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

	private _searchJourneys = async (): Promise<void> => {
		const debounce = _.debounce(async () => {
			this.state.searchText ?
				await this.props.searchJourneys(this.state.searchText, true) :
				await this.props.getAllJourneys(true);
		}, 500, { maxWait: 1000 });
		await debounce(); // Debounce may need to be revisited using Hooks
	}

	private _scrollResultsEvent = async ({ layoutMeasurement, contentOffset, contentSize }: NativeScrollEvent): Promise<void> => {
		console.log('searching ', this.props.showingSearchResults);
		if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 20 && !this.props.isFullList) { // Only query when list isn't full
			this.props.showingSearchResults ?
				await this.props.searchJourneys(this.state.searchText, false, this.props.lastEvaluatedKey) :
				await this.props.getAllJourneys(false, this.props.lastEvaluatedKey);
		}
	}

	private _renderNavigationEvents = (): ReactElement =>
		<NavigationEvents onWillFocus={ this._mountScreen } onDidBlur={ this._unmountScreen } />

	public render(): ReactElement {
		return (
			<View style={ styles.container }>
				{ this._renderNavigationEvents() }

				<View>
					<TextInput
						mode='outlined'
						placeholder='Search'
						onChangeText={ async (query: string): Promise<void> => {
							await this.setState({ searchText: query });
							this._searchJourneys();
						}}
						style={ { margin: 10 } }
					/>
					<Text>Last Key: { this.props.lastEvaluatedKey && this.props.lastEvaluatedKey.pk }</Text>
					<Text>{ this.props.journeys.length } Journeys</Text>

					{
						this.props.isSearching ?
							<ActivityIndicator
								animating={ true }
								color={ Theme.primary }
								size={ 34 }
								style={ { position: 'absolute', right: 20, top: 28 } }
							/> :
							<Icon
								name='search'
								size={ 22 }
								color='black'
								style={ { position: 'absolute', right: 25, top: 35 } }
							/>
					}
				</View>
				<ScrollView
					onScroll={ ({ nativeEvent }: { nativeEvent: NativeScrollEvent }): Promise<void> => this._scrollResultsEvent(nativeEvent) }
				>
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
	getAllJourneys,
	searchJourneys,
	clearJourneys
})(AllJourneys);
