import React, { Component } from 'react';
import {
	Text,
	View,
	Button,
	TextInput,
	TouchableOpacity
} from 'react-native';
import { connect, MapStateToProps } from 'react-redux';
import { Auth } from 'aws-amplify';
import styles from './styles';
import { Props, State, SignupResult } from './interfaces';
import HttpAPI from '../../api/http';

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

	_signUp = async (): Promise<void> => {
		const { email, username, password } = this.state;
		const { navigate } = this.props.navigation;

		if (!email) return this.setState({ error: 'Email is missing' });
		if (!username) return this.setState({ error: 'Username is missing' });
		if (!password) return this.setState({ error: 'Password is missing' });

		try {
			const auth = await Auth.signUp({
				username,
				password,
				attributes: {
					email
				}
			});

			const apiRes: SignupResult = await HttpAPI.signUp(auth);

			if (auth.userConfirmed && apiRes.success) navigate('Login');
			else navigate('Confirmation', {
				username,
				email,
				codeDeliveryDetails: auth.codeDeliveryDetails,
				userId: auth.userSub
			});
		} catch (e) {
			this.setState({
				error: e.message || e.description
			});
		}
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
				<Button
					onPress={ this._signUp }
					title={ 'Sign Up' } />
				<Text
					style={ styles.error }>
					{ this.state.error }
				</Text>
				<TouchableOpacity
					onPress={ () => this.props.navigation.navigate('Login') }>
					<Text style={ styles.underline }>
						Already signed up? Login
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

export default connect(mapStateToProps, { })(SignUp);
