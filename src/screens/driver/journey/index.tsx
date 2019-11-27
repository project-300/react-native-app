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
				{/*<View style={ { ...styles.start, ...this.locationSearchHeight() } }>*/}
				{/*	<TouchableOpacity onPress={ () => this.setState({ searching: !this.state.searching }) } style={styles.welcome}>*/}
				{/*		<Text>Search</Text>*/}
				{/*	</TouchableOpacity>*/}

				{/*	{ this.state.searching ?*/}
				{/*		<View>*/}
				{/*			<TextInput*/}
				{/*				style={ { backgroundColor: 'lightgrey', borderRadius: 4, marginBottom: 20 } }*/}
				{/*				placeholder={ 'Destination...' }*/}
				{/*				onChangeText={ (place) => {*/}
				{/*					this.setState({ place })*/}
				{/*					this.onChangeTextDelayed()*/}
				{/*				} } />*/}
				{/*			<FlatList*/}
				{/*				data={ this.state.places }*/}
				{/*				extraData={ this.state }*/}
				{/*				renderItem={ this.renderPlaceRow }*/}
				{/*				keyExtractor={ item => item.id }*/}
				{/*			/>*/}
				{/*		</View> :*/}
				{/*		null }*/}
				{/*</View>*/}
			</View>
		);
	}
}

const mapStateToProps = (state: AppState): DriverJourneysState => ({
	...state.driverJourneysReducer
});

export default connect(mapStateToProps, { })(JourneyMap);
