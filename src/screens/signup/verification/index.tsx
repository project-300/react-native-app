import React, { Component } from 'react';
import {
	Text,
	View,
	Button,
	TextInput
} from 'react-native';
import { connect, MapStateToProps } from 'react-redux';
import { Auth } from 'aws-amplify';
import styles from './styles';
import { Props, State } from './interfaces';
import { EMAIL, PHONE } from '../../../constants/cognito-delivery-methods';

class Verification extends Component<Props, State> {

	constructor(props: Props) {
		super(props);

		this.state = {
			username: props.navigation.getParam('username'),
			email: props.navigation.getParam('email'),
			codeDeliveryDetails: props.navigation.getParam('codeDeliveryDetails'),
			code: '',
			verificationText: ''
		};
	}

	componentDidMount(): void {
		this._setVerificationText();
	}

	_setVerificationText = (): void => {
		const { email } = this.state;

		if (this.state.codeDeliveryDetails.DeliveryMedium === EMAIL)
			this.setState({
				verificationText: `A verification code has been sent to ${ email }. Please enter it here to complete your signup.`
			});
		if (this.state.codeDeliveryDetails.DeliveryMedium === PHONE)
			this.setState({
				verificationText: `A verification code has been sent to your phone. Please enter it here to complete your signup.`
			});
	}

	_signUp = async (): Promise<void> => {
		const { username, code } = this.state;
		const { navigate } = this.props.navigation;

		if (!code) return this.setState({ error: 'Verification Code is missing' });

		return Auth.confirmSignUp(
			username,
			code
		)
			.then(() => {
				navigate('Login');
			})
			.catch(err => this.setState({
				error: err.message
			}));
	}

	render() {
		return (
			<View style={ styles.container }>
				<Text style={ styles.text }>{ this.state.verificationText }</Text>
				<TextInput
					placeholder={ 'Verification Code' }
					onChangeText={ code => this.setState({ code } ) }
					style={ styles.input } />
				<Button
					onPress={ this._signUp }
					title={ 'Confirm' } />
				<Text
					style={ styles.error }>
					{ this.state.error }
				</Text>
			</View>
		);
	}
}

const mapStateToProps: MapStateToProps<{ }, { }, { }> = (state) => {
	return {
		state
	};
};

export default connect(mapStateToProps, { })(Verification);
