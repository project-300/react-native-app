import React, { Component, ReactElement } from 'react';
import {
	Text,
	ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Props, State } from './interfaces';
import { HomeState } from '../../../types/redux-reducer-state-types';
import { AppState } from '../../../store';

export class MyJourneys extends Component<Props, State> {

	public constructor(props: Props) {
		super(props);
	}

	public render(): ReactElement {
		return (
			<ScrollView contentContainerStyle={ styles.container }>
				<Text>My Journeys</Text>
			</ScrollView>
		);
	}
}

const mapStateToProps = (state: AppState): HomeState => ({ });

export default connect(mapStateToProps, { })(MyJourneys);
