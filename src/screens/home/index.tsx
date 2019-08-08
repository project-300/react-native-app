import React, { Component, ReactElement } from 'react';
import {
	Text,
	ScrollView,
	Button, AppState
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
			<ScrollView style={ styles.container }>
				<Text
					style={ styles.text }>
					Home Screen
				</Text>
				<Button
					onPress={ this._logout }
					title={ 'Logout' } />
			</ScrollView>
		);
	}
}

const mapStateToProps = (state: AppState): AppState => ({
	state
});

export default connect(mapStateToProps, { })(Home);
