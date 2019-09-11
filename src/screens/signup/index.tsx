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
import { Props, ReduxSuccessResponse, State } from './interfaces';
import toastr from '../../helpers/toastr';
import { signUp } from '../../redux/actions';

// Documentation: /docs/signup.md

class SignUp extends Component<Props, State> {

	public constructor(props: Props) {
		super(props);

		this.state = {
			email: '',
			username: '',
			password: ''
		};
	}

	private _signUp = async (): Promise<void | boolean> => {
		const { email, username, password } = this.state;
		const { navigate } = this.props.navigation;

		if (!email) return toastr.error('Email is missing');
		if (!username) return toastr.error('Username is missing');
		if (!password) return toastr.error('Password is missing');

		const res: ReduxSuccessResponse = await this.props.signUp(email, username, password);
		if (!res) return;
		if (res.ok && res.confirmationRequired) return navigate('Confirmation');
		if (res.ok && !res.confirmationRequired) return navigate('Login');
	}

	public render(): ReactElement {
		return (
			<View style={ styles.container }>
				<TextInput
					autoCapitalize='none'
					placeholder={ 'Email Address' }
					onChangeText={ (email: string): void => this.setState({ email }) }
					style={ styles.input } />
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
					disabled={ this.props.isCreatingAccount }
					style={ styles.button }
					onPress={ this._signUp }>
					<Text
						style={ styles.buttonText }
					>Sign Up</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={ (): boolean => this.props.navigation.navigate('Login') }>
					<Text style={ styles.loginLink }>
						Already signed up? Login
					</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const mapStateToProps = (state: AppState): AppState => ({
	...state.signUpReducer
});

export default connect(mapStateToProps, { signUp })(SignUp);
