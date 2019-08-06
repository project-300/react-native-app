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
import toastr from '../../helpers/toastr';
import { signUp } from '../../actions';
import { Reducer } from 'redux';

// Documentation: /docs/signup.md

class SignUp extends Component<Props, State> {

	constructor(props: Props) {
		super(props);

		this.state = {
			email: '',
			username: '',
			password: ''
		};
	}

	_signUp = async (): Promise<void | boolean> => {
		const { email, username, password } = this.state;
		const { navigate } = this.props.navigation;

		if (!email) return toastr.error('Email is missing');
		if (!username) return toastr.error('Username is missing');
		if (!password) return toastr.error('Password is missing');

		const res = await this.props.signUp(email, username, password);
		if (res && res.confirmationRequired) return navigate('Confirmation');
		if (res && !res.confirmationRequired) return navigate('Login');
	}

	render() {
		return (
			<View style={ styles.container }>
				<TextInput
					autoCapitalize='none'
					placeholder={ 'Email Address' }
					onChangeText={ email => this.setState({ email } ) }
					style={ styles.input } />
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
					disabled={ this.props.isCreatingAccount }
					style={ styles.button }
					onPress={ this._signUp }>
					<Text
						style={ styles.buttonText }
					>Sign Up</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={ () => this.props.navigation.navigate('Login') }>
					<Text style={ styles.loginLink }>
						Already signed up? Login
					</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const mapStateToProps: MapStateToProps<{ }, { }, { signUpReducer: Reducer }> = (state) => {
	return {
		...state.signUpReducer
	};
};

export default connect(mapStateToProps, { signUp })(SignUp);
