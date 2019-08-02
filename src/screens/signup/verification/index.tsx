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
import { ConfirmationResult, Props, State } from './interfaces';
import { EMAIL, PHONE } from '../../../constants/cognito-delivery-methods';

class Verification extends Component<Props, State> {

	constructor(props: Props) {
		super(props);

		this.state = {
			userId: props.navigation.getParam('userId'),
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

		try {
			await Auth.confirmSignUp(
				username,
				code
			);

			const apiRes: ConfirmationResult = await this._confirmAccount();

			if (apiRes.success) navigate('Login');
		} catch (e) {
			this.setState({
				error: e.message || e.description
			});
		}
	}

	_confirmAccount = async (): Promise<ConfirmationResult> => {
		const res: Response = await fetch('https://h4q090fyzg.execute-api.eu-west-1.amazonaws.com/dev/account-confirmation', {
			method: 'POST',
			body: JSON.stringify({ userId: this.state.userId }),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
			}
		});

		const ok = res.ok;
		const data: ConfirmationResult = await res.json();

		if (!ok) throw data.error || Error('Unknown Error');
		return data;
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
