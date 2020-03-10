import React, { Component, ReactElement } from 'react';
import {
	View,
	Text, ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { Props, State } from './interfaces';
import { CurrentJourneyState } from '../../types/redux-reducer-state-types';
import { AppState } from '../../store';
import { Journey, JourneyAction } from '@project-300/common-types';
import styles from './styles';
import { ActivityIndicator } from 'react-native-paper';
import { Colours } from '../../constants/theme';
import DatesTimes from '../../services/dates-times';

export class JourneyOverview extends Component<Props, State> {

	public constructor(props: Props) {
		super(props);

		this.state = { };
	}

	public componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>): void {
		if (
			prevProps.currentJourney && this.props.currentJourney &&
			prevProps.currentJourney.journeyStatus !== this.props.currentJourney.journeyStatus &&
			this.props.currentJourney.journeyStatus === 'FINISHED'
		) console.log('test');

			// this.props.navigation.navigate('JourneyRating');
	}

	private _renderTitleText = (): ReactElement => {
		const journey: Journey = this.props.currentJourney as Journey;
		const { driver } = journey;
		let lines: string[] = [];

		switch (journey.journeyStatus) {
			case 'NOT_STARTED':
				lines = [ 'Waiting for Driver' ];
				break;
			case 'PICKUP':
				lines = [ `${ driver.firstName } is Picking up Passengers` ];
				break;
			case 'WAITING':
				lines = [ 'All Passengers Picked Up', 'Journey Starting Soon' ];
				break;
			case 'PAUSED':
				lines = [ `${driver.firstName} has Paused the Journey` ];
				break;
			case 'STARTED':
				lines = [ `${driver.firstName} has Started the Journey` ];
				break;
			case 'ARRIVED':
				lines = [ 'You have Arrived at the Destination' ];
				break;
			case 'FINISHED':
				lines = [ 'The Journey has Ended' ];
				break;
			case 'CANCELLED':
				lines = [ 'The Journey has been Cancelled' ];
				break;
			default:
				lines = [ 'Unknown Information' ];
		}

		return <View style={ styles.title }>{ lines.map((line: string) => {
			return lines.length === 1 || line === lines[lines.length - 1] ?
				<Text style={ styles.titleLine }>{ line }</Text> :
				<View>
					<Text style={ styles.titleLine }>{ line }</Text>
					<Text style={ styles.titleLine }>-</Text>
				</View>;
		}) }</View>;
	}

	public render(): ReactElement {
		const journey: Journey = this.props.currentJourney as Journey;

		if (!journey) return <ActivityIndicator color={ Colours.primary } />;

		const { origin, destination } = journey;

		return (
			<View style={ styles.container }>
				<View style={ styles.contentContainer }>
					<View style={ styles.content }>
						{ this._renderTitleText() }
						<Text style={ styles.locations }>Travelling from { origin.name } to { destination.name }</Text>
					</View>
				</View>

				<ScrollView style={ styles.actionLogList }>
					{
						journey.actionLogs.map((log: JourneyAction) => <View style={ styles.actionLog }>
							<Text style={ styles.actionLogText }>{ log.description }</Text>
							<Text style={ styles.actionLogTime }>{ DatesTimes.hoursMinutes(log.time) }</Text>
						</View>).reverse()
					}
				</ScrollView>
			</View>
		);
	}
}

const mapStateToProps = (state: AppState): CurrentJourneyState => ({
	...state.currentJourneyReducer
});

export default connect(mapStateToProps, { })(JourneyOverview);
