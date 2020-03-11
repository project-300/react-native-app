import React, { Component, ReactElement } from 'react';
import {
	View,
	Platform, TextInput
} from 'react-native';
import { State, Props } from './interfaces';
import toastr from '../../../helpers/toastr';
import { AuthTheme, Colours, ContrastTheme, Theme } from '../../../constants/theme';
import { Button } from 'react-native-paper';
import styles from './styles';
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
		res && this.props.navigation.navigate('SearchJourneys');
	}

	public render(): ReactElement {
		/*
		 	Add bottom margin to form when on Android and keyboard open.
		 	The sign up button is hidden behind keyboard otherwise.
		*/

		return (
			<View style={ [ styles.container, { marginBottom: Platform.OS === 'android' && this.props.keyboardOpen ? 80 : 0 } ] }>
				<TextInput
					placeholder='Email Address'
					placeholderTextColor={ Colours.middleGrey }
					// theme={ ContrastTheme }
					// mode={ 'outlined' }
					style={ { padding: 16, borderWidth: 0.2, borderColor: '#BBB', backgroundColor: 'white', borderRadius: 4, marginBottom: 10 } }
					onChangeText={ (email: string): void => this.setState({ email }) }
					autoCorrect={ false }
					autoCompleteType={ 'off' }
					autoCapitalize='none'
					keyboardType={ 'email-address' }
				/>

				<TextInput
					placeholder='Password'
					placeholderTextColor={ Colours.middleGrey }
					// theme={ AuthTheme }
					// mode={ 'outlined' }
					style={ { padding: 16, borderWidth: 0.2, borderColor: '#BBB', backgroundColor: 'white', borderRadius: 4 } }
					secureTextEntry={ true }
					autoCapitalize='none'
					onChangeText={ (password: string): void => this.setState({ password })}
				/>

				<Button
					mode={ 'outlined' }
					theme={ ContrastTheme }
					style={ [ formStyles.button, { backgroundColor: 'white', marginTop: 20 } ] }
					onPress={ this._loginAttempt }
					labelStyle={ { color: Theme.accent } }
					disabled={ this.props.isLoggingIn || !this.state.email || !this.state.password }>
						Sign In
				</Button>
			</View>
		);
	}
}
