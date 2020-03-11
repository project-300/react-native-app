import React, { Component, ReactElement } from 'react';
import {
	View,
	Text
} from 'react-native';
import { connect } from 'react-redux';
import { Props, State } from './interfaces';
import { CurrentJourneyState } from '../../types/redux-reducer-state-types';
import { AppState } from '../../store';
import { Journey } from '@project-300/common-types';
import styles from './styles';
import { ActivityIndicator } from 'react-native-paper';
import { Colours } from '../../constants/theme';

export class JourneyRating extends Component<Props, State> {

	public constructor(props: Props) {
		super(props);

		this.state = { };
	}

	public render(): ReactElement {
		const journey: Journey = this.props.currentJourney as Journey;

		if (!journey) return <ActivityIndicator color={ Colours.primary } />;

		const { driver } = journey;

		return (
			<View style={ styles.container }>
				<Text>Rate the journey with your driver { driver.firstName }</Text>
			</View>
		);
	}
}

const mapStateToProps = (state: AppState): CurrentJourneyState => ({
	...state.currentJourneyReducer
});

export default connect(mapStateToProps, { })(JourneyRating);
