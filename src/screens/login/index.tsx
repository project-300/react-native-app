import React, { Component } from 'react';
import {
	Text,
	View,
	Button, TextInput, TouchableOpacity
} from 'react-native';
import { connect, MapStateToProps } from 'react-redux';
import { Auth } from 'aws-amplify';
import { signIn } from '../../auth';
import styles from './styles';
import { LoginResult, Props, State } from './interfaces';

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

		try {
			const auth = await Auth.signIn(username, password);
			await signIn();

			const apiRes: LoginResult = await this._logCognitoData(auth);
			if (apiRes.success) navigate('Home');
		} catch (e) {
			this.setState({
				error: e.message || e.description
			});
		}
	}

	_logCognitoData = async (authData: object): Promise<LoginResult> => {
		const res: Response = await fetch('https://h4q090fyzg.execute-api.eu-west-1.amazonaws.com/dev/login', {
			method: 'POST',
			body: JSON.stringify(authData),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
			}
		});

		const ok = res.ok;
		const data: LoginResult = await res.json();

		if (!ok) throw data.error || Error('Unknown Error');
		return data;
	}

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
				<Text
					style={ styles.error }>
					{ this.state.error }
				</Text>
				<TouchableOpacity
					onPress={ () => this.props.navigation.navigate('SignUp') }>
					<Text style={ styles.underline }>
						Not registered yet? Sign Up
					</Text>
				</TouchableOpacity>
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
