import React, { Component, ReactElement } from 'react';
import {
	ScrollView,
	FlatList,
	View,
	NativeScrollEvent,
	TouchableOpacity,
	RefreshControl,
	KeyboardAvoidingView,
	Platform, StatusBarIOS, NativeModules, EmitterSubscription
} from 'react-native';
import { connect } from 'react-redux';
import styles, { priceBadgeText } from './styles';
import { Props, State } from './interfaces';
import { AppState } from '../../store';
import { AllJourneysListState } from '../../types/redux-reducer-state-types';
import { Journey, FormatMoney } from '@project-300/common-types';
import { getAllJourneys, searchJourneys, clearJourneys } from '../../redux/actions';
import DatesTimes from '../../services/dates-times';
import { ActivityIndicator, Text, TextInput } from 'react-native-paper';
import { NavigationEvents } from 'react-navigation';
import _ from 'lodash';
import { Colours, ContrastTheme, Theme } from '../../constants/theme';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { NoticeBanner } from '../../components/miscellaneous/notice-banner';

const { StatusBarManager } = NativeModules;

class SearchJourneys extends Component<Props, State> {

	private _statusBarListener: EmitterSubscription;

	public constructor(props: Props) {
		super(props);

		this.state = this.initialState;
	}

	private initialState: State = {
		searchText: '',
		statusBarHeight: 0
	};

	private _mountScreen = async (): Promise<void> => { // Triggered when this screen renders (navigated to)
		await this.props.getAllJourneys(true);

		if (Platform.OS === 'ios') {
			StatusBarManager.getHeight((statusBarFrameData: any) => {
				this.setState({ statusBarHeight: statusBarFrameData.height });
			});
		}

		this._statusBarListener = StatusBarIOS.addListener('statusBarFrameWillChange', (statusBarData: any) => {
			this.setState({ statusBarHeight: statusBarData.frame.height });
		});
	}

	private _unmountScreen = (): void => { // Triggered when the screen is navigated away from
		this.setState(this.initialState); // Reset the state of the component for next mount
	}

	private _getPriceFontSize = (price: number): number => {
		const length: number = FormatMoney(price).length;
		if (length <= 2) return 18;
		return 14;
	}

	private _getBorderColour = (userJoined: boolean, isOwnedByUser: boolean): string => {
		// if (isOwnedByUser) return 'orange';
		if (userJoined) return Colours.green;
		return Colours.lighterGrey;
	}

	private _renderRow = ({ item, index }: { item: Journey; index: number }): ReactElement => {
		const journey: Journey = item;
		const { userJoined, isOwnedByUser } = journey;

		return (
			<View>
				<TouchableOpacity
					style={ { ...styles.liftRowContainer, borderColor: this._getBorderColour(!!userJoined, !!isOwnedByUser) } }
					onPress={ (): boolean => this.props.navigation.navigate('ViewJourney', { journey }) }
				>
					{
						journey.userJoined &&
							<NoticeBanner
								icon={ 'check' }
								text={ 'You have accepted this lift' }
								backgroundColor={ Colours.green }
								color={ Colours.white }
							/>
					}

					<View>
						<Text style={ styles.placeNames }>
							{ journey.origin.name } - { journey.destination.name }
						</Text>

						<Text style={ styles.seatsLeft }>
							{ journey.seatsLeft } seats left
						</Text>
					</View>

					<View style={ styles.generalInfoContainer }>
						<Text style={ styles.journeyDate }>
							{ DatesTimes.dayAndTime(journey.times.leavingAt) }
						</Text>

						<View
							style={ styles.priceBadge }
						>
							<Text style={ priceBadgeText(journey.pricePerSeat ? this._getPriceFontSize(journey.pricePerSeat) : 16) }>
								{ journey.pricePerSeat ? `€${ FormatMoney(journey.pricePerSeat) }` : 'Free' }
							</Text>
						</View>
					</View>
				</TouchableOpacity>
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
			<KeyboardAvoidingView style={ styles.container } behavior={ Platform.OS === 'ios' ? 'height' : undefined }
				keyboardVerticalOffset={ this.state.statusBarHeight + 70 }
			>
				{ this._renderNavigationEvents() }

				<View>
					<TextInput
						mode='outlined'
						placeholder='Quick Search'
						onChangeText={ async (query: string): Promise<void> => {
							await this.setState({ searchText: query.trim() });
							this._searchJourneys();
						}}
						style={ styles.searchField }
						theme={ ContrastTheme }
						autoCompleteType='off'
						autoCorrect={ false }
					/>

					{
						this.props.isSearching ?
							<ActivityIndicator
								animating={ true }
								color={ Theme.accent }
								size={ 34 }
								style={ styles.searchFieldSpinner }
							/> :
							<Icon
								name='search'
								size={ 22 }
								color={ Theme.accent }
								style={ styles.searchFieldIcon }
							/>
					}
				</View>
				<ScrollView
					onScroll={
						({ nativeEvent }: { nativeEvent: NativeScrollEvent }): Promise<void> =>
							this._scrollResultsEvent(nativeEvent)
					}
					refreshControl={
						<RefreshControl refreshing={ this.props.isFetching && !this.props.isSearching } onRefresh={ async (): Promise<void> => {
							await this.props.getAllJourneys(true);
						} } />
					}
				>
					<FlatList
						data={ this.props.journeys }
						renderItem={ this._renderRow }
						keyExtractor={ (item: Journey): string => item.journeyId }
					/>

					{
						!this.props.journeys.length &&
							<View style={ styles.centerItems }>
								<Text style={ styles.noLifts }>{ this.props.isFetching ? 'Fetching lifts..' : 'No lifts available' }</Text>
							</View>
					}

					{
						!this.props.isFetching && !this.props.isFullList &&
							<Icon
								name='redo-alt'
								size={ 34 }
								color={ Theme.accent }
								style={ styles.reloadIcon }
							/>
					}

					{
						this.props.isFetching && !this.props.isSearching &&
							<ActivityIndicator
								animating={ true }
								color={ Theme.accent }
								size={ 34 }
								style={ styles.reloadSpinner }
							/>
					}
				</ScrollView>
			</KeyboardAvoidingView>
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
})(SearchJourneys);
