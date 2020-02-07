import React, { Component, ReactElement } from 'react';
import {
	Text,
	View,
	TextInput,
	TouchableOpacity, Platform
} from 'react-native';
import { State, Props } from './interfaces';
import toastr from '../../../helpers/toastr';
import formStyles from '../../../styles/forms';

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
		/*
		 	Add bottom margin to form when on Android and keyboard open.
		 	The sign up button is hidden behind keyboard otherwise.
		*/

		return (
			<View style={ { marginBottom: Platform.OS === 'android' && this.props.keyboardOpen ? 80 : 0 } }>
				<TextInput
					placeholder='USERNAME'
					placeholderTextColor='black'
					onChangeText={ (username: string): void => this.setState({ username }) }
					autoCorrect={ false }
					autoCompleteType={ 'off' }
					autoCapitalize='none'
					keyboardType={ 'email-address' }
					style={ formStyles.input } />

				<TextInput
					placeholder='PASSWORD'
					placeholderTextColor='black'
					secureTextEntry={ true }
					autoCapitalize='none'
					onChangeText={ (password: string): void => this.setState({ password })}
					style={ formStyles.input } />

				<TouchableOpacity
					style={ formStyles.largeButton }
					onPress={ this._loginAttempt }
					disabled={ this.props.isLoggingIn || !this.state.username || !this.state.password }>
					<Text style={ formStyles.buttonText }>
						SIGN IN
					</Text>
				</TouchableOpacity>
			</View>
		);
	}
}
