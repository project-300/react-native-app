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
// import { getJourneys } from '../../../redux/actions';
import { Journey } from '@project-300/common-types';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

export class JourneyMap extends Component<Props, State> {

	public constructor(props: Props) {
		super(props);
	}

	// public async componentDidMount(): Promise<void> {
	// 	await this.props.getJourneys();
	// }

	public render(): ReactElement {
		return (
			<View style={ styles.container }>
				<MapView
					provider={ PROVIDER_GOOGLE }
					style={ styles.map }
					// region={ this.state.region }
					// onPress={ (e) => this.addWayPoint(e.nativeEvent.coordinate) }
				>
				</MapView>
			</View>
		);
	}
}

const mapStateToProps = (state: AppState): DriverJourneysState => ({
	...state.driverJourneysReducer
});

export default connect(mapStateToProps, { })(JourneyMap);
