import React, { Component, ReactElement } from 'react';
import {
	Text,
	ScrollView,
	View,
	FlatList,
	TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Props, State } from './interfaces';
import { DriverJourneysState } from '../../../types/redux-reducer-state-types';
import { AppState } from '../../../store';
import { getJourneys } from '../../../redux/actions';
import { Journey } from '@project-300/common-types';
import { NavigationEvents } from 'react-navigation';

export class MyJourneys extends Component<Props, State> {

	public constructor(props: Props) {
		super(props);
	}

	public componentDidMount(): void {
		console.log(this.props);
	}

	private _getJourneys = async (): Promise<void> => await this.props.getJourneys();

	private _renderRow = ({ item, index }: { item: Journey; index: number }): ReactElement => {
		return (
			<View style={ styles.applicationRow }>
				<Text>
					From { item.origin.name } to { item.destination.name }
				</Text>
				<Text>
					{ item.seatsLeft } / { item.totalNoOfSeats } seats left
				</Text>
				<Text>
					{ item.pricePerSeat } euro per seat
				</Text>

				{
					item.journeyStatus === 'NOT_STARTED' &&
						<TouchableOpacity
							style={ styles.button }
							onPress={ (): boolean => this.props.navigation.navigate('JourneyMap', { journeyId: item.journeyId }) }
						>
							<Text style={ styles.buttonText }>Start Journey</Text>
						</TouchableOpacity>
				}

				{
					item.journeyStatus === 'STARTED' &&
						<TouchableOpacity
							style={ styles.button }
							onPress={ (): boolean => this.props.navigation.navigate('JourneyMap', { journeyId: item.journeyId }) }
						>
							<Text style={ styles.buttonText }>Continue Journey</Text>
						</TouchableOpacity>
				}
			</View>
		);
	}

	public render(): ReactElement {
		return (
			<ScrollView contentContainerStyle={ styles.container }>
				<NavigationEvents onDidFocus={ this._getJourneys } />

				<FlatList
					data={ this.props.journeys }
					extraData={ this.props }
					renderItem={ this._renderRow }
					keyExtractor={ (item: Journey): string => item.journeyId }
				/>
			</ScrollView>
		);
	}
}

const mapStateToProps = (state: AppState): DriverJourneysState => ({
	...state.driverJourneysReducer
});

export default connect(mapStateToProps, { getJourneys })(MyJourneys);
