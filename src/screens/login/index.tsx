import React, { Component, ReactElement } from 'react';
import {
	Text,
	View,
	TextInput,
	TouchableOpacity,
	AppState
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Props, State } from './interfaces';
import { login } from '../../redux/actions';
import toastr from '../../helpers/toastr';

// Documentation: /docs/login.md

class Login extends Component<Props, State> {

	public constructor(props: Props) {
		super(props);

		this.state = {
			username: '',
			password: ''
		};
	}

	private _loginAttempt = async (): Promise<void> => {
		const { username, password } = this.state;

		if (!username) return toastr.error('Username is missing');
		if (!password) return toastr.error('Password is missing');

		const res: boolean = await this.props.login(username, password);
		res && this.props.navigation.navigate('Home');
	}

	public render(): ReactElement {
		return (
			<View style={ styles.container }>
				<TextInput
					placeholder={ 'Username' }
					onChangeText={ (username: string): void => this.setState({ username }) }
					style={ styles.input } />
				<TextInput
					secureTextEntry={ true }
					placeholder={ 'Password' }
					onChangeText={ (password: string): void => this.setState({ password }) }
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
					onPress={ (): boolean => this.props.navigation.navigate('SignUp') }>
					<Text style={ styles.signUpLink }>
						Not registered yet? Sign Up
					</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const mapStateToProps = (state: AppState): AppState => ({
	...state.loginReducer
});

export default connect(mapStateToProps, { login })(Login);
