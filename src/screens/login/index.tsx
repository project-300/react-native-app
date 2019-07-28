import React, { Component } from 'react';
import {
	Text,
	View,
	Button, TextInput
} from 'react-native';
import { connect, MapStateToProps } from 'react-redux';
import { Auth } from 'aws-amplify';
import { signIn } from '../../auth';
import styles from './styles';
import { Props, State } from './interfaces';
import WS from '../../api/websocket';

// Documentation: /docs/login.md

class Login extends Component<Props, State> {

	constructor(props: Props) {
		super(props);

		this.state = {
			username: '',
			password: ''
		};
	}

	_loginAttempt = async (): Promise<void> => {
		const { username, password } = this.state;
		const { navigate } = this.props.navigation;

		if (!username) return this.setState({ error: 'Username is missing' });
		if (!password) return this.setState({ error: 'Password is missing' });

		return Auth.signIn(username, password)
			.then(res => {
				signIn()
					.then(() => {
						this._logCognitoData(res)
							.then(() => navigate('Home'));
					});
			})
			.catch(err => {
				this.setState({ error: err.message });
			});
	}

	_logCognitoData = (res: object): Promise<void> => new Promise(resolve => resolve(WS.login(res)));

	render() {
		return (
			<View style={ styles.container }>
				<TextInput
					placeholder={ 'Username' }
					onChangeText={ username => this.setState({ username } ) }
					style={ styles.input } />
				<TextInput
					secureTextEntry={ true }
					placeholder={ 'Password' }
					onChangeText={ password => this.setState({ password } ) }
					style={ styles.input } />
				<Button
					onPress={ this._loginAttempt }
					title={ 'Sign In' } />
				<Text style={ styles.error }>{ this.state.error }</Text>
			</View>
		);
	}
}

const mapStateToProps: MapStateToProps<{ }, { }, { }> = (state) => {
	return {
		state
	};
};

export default connect(mapStateToProps, { })(Login);
