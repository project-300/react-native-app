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
			email: '',
			password: '',
			hidePassword: true
		};
	}

	private _loginAttempt = async (): Promise<void> => {
		this.setState({ hidePassword: true });

		const { email, password } = this.state;

		if (!email) return toastr.error('Username is missing');
		if (!password) return toastr.error('Password is missing');

		const res: boolean = await this.props.login(email, password);
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
					placeholder='EMAIL ADDRESS'
					placeholderTextColor='black'
					onChangeText={ (email: string): void => this.setState({ email }) }
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
					disabled={ this.props.isLoggingIn || !this.state.email || !this.state.password }>
					<Text style={ formStyles.buttonText }>
						SIGN IN
					</Text>
				</TouchableOpacity>
			</View>
		);
	}
}
