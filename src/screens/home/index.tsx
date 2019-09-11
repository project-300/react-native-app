import React, { Component, ReactElement } from 'react';
import {
	Text,
	ScrollView,
	AppState,
	TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { storeLogout } from '../../auth';
import styles from './styles';
import { Props, State } from './interfaces';

class Home extends Component<Props, State> {

	public constructor(props: Props) {
		super(props);
	}

	private _logout = (): Promise<boolean> => storeLogout().then(() => this.props.navigation.navigate('Login'));

	public render(): ReactElement {
		return (
			<ScrollView contentContainerStyle={ styles.container }>
				<TouchableOpacity
					onPress={ (): boolean => this.props.navigation.navigate('Applications') }
					style={ styles.button }>
					<Text style={ styles.buttonText }>Applications (Testing only)</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={ (): boolean => this.props.navigation.navigate('DriverApplication') }
					style={ styles.button }>
					<Text style={ styles.buttonText }>Want to become a driver?</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={ this._logout }
					style={ styles.button }>
					<Text style={ styles.buttonText }>Logout</Text>
				</TouchableOpacity>
			</ScrollView>
		);
	}
}

const mapStateToProps = (state: AppState): AppState => ({
	state
});

export default connect(mapStateToProps, { })(Home);
