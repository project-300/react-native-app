import React, { Component, ReactElement } from 'react';
import { ScrollView, FlatList, View, NativeScrollEvent, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Props, State } from './interfaces';
import { AppState } from '../../store';
import { AllJourneysListState } from '../../types/redux-reducer-state-types';
import { Journey } from '@project-300/common-types';
import { getAllJourneys, searchJourneys, clearJourneys } from '../../redux/actions';
import DatesTimes from '../../services/dates-times';
import { ActivityIndicator, Divider, Text, TextInput, Card } from 'react-native-paper';
import { NavigationEvents } from 'react-navigation';
import _ from 'lodash';
import { Theme } from '../../constants/theme';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { GoogleMapsAPIKey } from '../../../environment/env';

class AllJourneys extends Component<Props, State> {

	public constructor(props: Props) {
		super(props);

		this.state = this.initialState;
	}

	private initialState: State = {
		searchText: ''
	};

	private _mountScreen = async (): Promise<void> => { // Triggered when this screen renders (navigated to)
		await this.props.getAllJourneys(true);
	}

	private _unmountScreen = (): void => { // Triggered when the screen is navigated away from
		this.setState(this.initialState); // Reset the state of the component for next mount
	}

	private _priceFormat = (price: number): string => {
		return price % 1 === 0 ? price.toString() : price.toFixed(2).toString();
	}

	private _getPriceFontSize = (price: number): number => {
		const length: number = this._priceFormat(price).length;
		if (length <= 2) return 18;
		return 14;
	}

	private _renderRow = ({ item, index }: { item: Journey; index: number }): ReactElement => {
		const journey: Journey = item;

		return (
			<View>
				<TouchableOpacity
					style={ { padding: 20, backgroundColor: 'white' } }
					onPress={ (): boolean => this.props.navigation.navigate('ViewJourney', journey) }
				>
					<View>
						<Text style={ { fontSize: 22 } }>
							{ journey.origin.name } - { journey.destination.name }
						</Text>

						<Text style={ { fontSize: 14, color: '#555' } }>
							{ journey.seatsLeft } seats left
						</Text>
					</View>

					<View style={ { paddingTop: 20 } }>
						<Text>
							{ DatesTimes.hoursMinutes(journey.times.leavingAt) }
						</Text>
						<Text>
							{ DatesTimes.readableDate(journey.times.leavingAt) }
						</Text>

						<View
							style={ {
								backgroundColor: Theme.accent,
								padding: 5,
								width: 64,
								height: 64,
								borderRadius: 32,
								alignItems: 'center',
								justifyContent: 'center',
								position: 'absolute',
								right: 0,
								bottom: 0,
								shadowOffset: {
									width: 0,
									height: 4
								},
								shadowOpacity: 0.4,
								shadowRadius: 6,
								elevation: 12
							} }
						>
							<Text style={ {
								color: '#333',
								fontWeight: 'bold',
								fontSize: journey.pricePerSeat ? this._getPriceFontSize(journey.pricePerSeat) : 16
							} }>
								{ journey.pricePerSeat ? `€${ this._priceFormat(journey.pricePerSeat) }` : 'Free' }
							</Text>
						</View>
					</View>
				</TouchableOpacity>

				<Divider />
			</View>
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
		if (
			layoutMeasurement.height + contentOffset.y >= contentSize.height - 20
			&& !this.props.isFetching
			&& !this.props.isFullList // Only query when list isn't full
		) {
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
						placeholder='Quick Search'
						onChangeText={ async (query: string): Promise<void> => {
							await this.setState({ searchText: query.trim() });
							this._searchJourneys();
						}}
						style={ { margin: 10, backgroundColor: 'white' } }
					/>

					{/*<Text>Last Key: { this.props.lastEvaluatedKey && this.props.lastEvaluatedKey.pk }</Text>*/}
					{/*<Text>{ this.props.journeys.length } Journeys</Text>*/}

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
								color={ Theme.primary }
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

					{
						!this.props.isFetching && !this.props.isFullList &&
							<Icon
								name='redo-alt'
								size={ 34 }
								color={ Theme.primary }
								style={ { alignSelf: 'center', margin: 10 } }
							/>
					}

					{
						this.props.isFetching &&
							<ActivityIndicator
								animating={ true }
								color={ Theme.primary }
								size={ 34 }
								style={ { margin: 10 } }
							/>
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
