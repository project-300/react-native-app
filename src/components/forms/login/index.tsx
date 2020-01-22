import React, { Component, ReactElement } from 'react';
import {
	Text,
	View,
	TextInput,
	TouchableOpacity
} from 'react-native';
import styles from './styles';
import { State, Props } from './interfaces';
import toastr from '../../../helpers/toastr';

export class LoginForm extends Component<Props, State> {

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
			<View>
				<TextInput
					placeholder='USERNAME'
					placeholderTextColor='black'
					onChangeText={ (username: string): void => this.setState({ username }) }
					editable={ this.props.usable }
					style={ styles.textInput } />

				<TextInput
					placeholder='PASSWORD'
					placeholderTextColor='black'
					secureTextEntry={ this.state.hidePassword }
					onChangeText={ (password: string): void => this.setState({ password })}
					style={ styles.textInput } />

				<TouchableOpacity
					style={ styles.uiButton }
					onPress={ this._loginAttempt }
					disabled={ this.props.isLoggingIn || !this.state.username || !this.state.password }>
					<Text style={ { fontSize: 20, fontWeight: 'bold' } }>
						SIGN IN
					</Text>
				</TouchableOpacity>
			</View>
		);
	}
}
