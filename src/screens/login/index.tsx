import React, { Component, ReactElement } from 'react';
import {
	Text,
	View,
	TextInput,
	TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Props, State } from './interfaces';
import { login } from '../../redux/actions';
import toastr from '../../helpers/toastr';
import { LoginState } from '../../types/redux-reducer-state-types';
import { AppState } from '../../store';
import Icon from 'react-native-vector-icons/FontAwesome5';

// Documentation: /docs/login.md

export class Login extends Component<Props, State> {

	public constructor(props: Props) {
		super(props);

		this.state = {
			username: '',
			password: '',
			hidePassword: true
		};
	}

	private _loginAttempt = async (): Promise<void> => {
		this.setState({ hidePassword: true });

		const { username, password } = this.state;

		if (!username) return toastr.error('Username is missing');
		if (!password) return toastr.error('Password is missing');

		const res: boolean = await this.props.login(username, password);
		res && this.props.navigation.navigate('Home');
	}

	public render(): ReactElement {
		return (
			<View style={ styles.container }>
				<View style={ styles.inputContainer }>
					<TextInput
						placeholder={ 'Username' }
						onChangeText={ (username: string): void => this.setState({ username }) }
						style={ styles.input } />
				</View>
				<View style={ styles.inputContainer }>
					<TextInput
						secureTextEntry={ this.state.hidePassword }
						placeholder={ 'Password' }
						style={ styles.input }
						onChangeText={ (password: string): void => this.setState({ password })}
					/>
					<TouchableOpacity
						style={ styles.showPasswordIconContainer }
						onPress={ (): void => this.setState({ hidePassword: !this.state.hidePassword }) }
					>
						<Icon
							name={ this.state.hidePassword ? 'eye' : 'eye-slash' }
							style={ styles.showPasswordIcon }
						/>
					</TouchableOpacity>
				</View>

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

const mapStateToProps = (state: AppState): LoginState => ({
	...state.loginReducer
});

export default connect(mapStateToProps, { login })(Login);
