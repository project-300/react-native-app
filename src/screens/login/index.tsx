import React, { Component } from 'react';
import {
	Text,
	View,
	TextInput,
	TouchableOpacity
} from 'react-native';
import { connect, MapStateToProps } from 'react-redux';
import styles from './styles';
import { Props, State } from './interfaces';
import { login } from '../../actions';
import toastr from '../../helpers/toastr';
import { Reducer } from 'redux';

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

		if (!username) return toastr.error('Username is missing');
		if (!password) return toastr.error('Password is missing');

		const res = await this.props.login(username, password);
		res && this.props.navigation.navigate('Home');
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
				<TouchableOpacity
					disabled={ this.props.isLoggingIn }
					style={ styles.button }
					onPress={ this._loginAttempt }>
					<Text
						style={ styles.buttonText }
					>Login</Text>
				</TouchableOpacity>
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

const mapStateToProps: MapStateToProps<{ }, { }, { loginReducer: Reducer }> = (state) => {
	return {
		...state.loginReducer
	};
};

export default connect(mapStateToProps, { login })(Login);
