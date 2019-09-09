import React, { Component, ReactElement } from 'react';
import {
	Text,
	ScrollView,
	AppState,
	TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Props, State } from './interfaces';
import { apply } from '../../redux/actions';

class DriverApplication extends Component<Props, State> {

	public constructor(props: Props) {
		super(props);
	}

	private _apply = async (): Promise<void> => {
		await this.props.apply();
	}

	public render(): ReactElement {
		return (
			<ScrollView contentContainerStyle={ styles.container }>
				<Text
					style={ styles.text }>
					Want to become a driver? Apply below.
				</Text>
				<TouchableOpacity
					onPress={ this._apply }
					style={ styles.button }>
					<Text style={ styles.buttonText }>Apply</Text>
				</TouchableOpacity>
			</ScrollView>
		);
	}
}

const mapStateToProps = (state: AppState): AppState => ({
	...state.driverApplicationReducer
});

export default connect(mapStateToProps, { apply })(DriverApplication);
