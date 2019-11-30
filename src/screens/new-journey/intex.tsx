import React, { Component, ReactElement } from 'react';
import {
	Text,
	ScrollView,
	TouchableOpacity,
	View
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Props, State } from './interfaces';
import { HomeState } from '../../types/redux-reducer-state-types';
import { AppState } from '../../store';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'

export class NewJourney extends Component<Props, State> {

	public constructor(props: Props) {
		super(props);
	}

	public render(): ReactElement {
		return (
			<View style={ styles.container }>
				<MapView
				style= { styles.map }
				provider = {PROVIDER_GOOGLE}
				>
				</MapView>
			</View>
		);
	}
}

const mapStateToProps = (state: AppState): HomeState => ({ });

export default connect(mapStateToProps, { })(NewJourney);

