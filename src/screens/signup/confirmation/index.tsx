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
import HttpAPI from '../../../api/http';

class Confirmation extends Component<Props, State> {

	constructor(props: Props) {
		super(props);

		this.state = {
			userId: props.navigation.getParam('userId'),
			username: props.navigation.getParam('username'),
			email: props.navigation.getParam('email'),
			codeDeliveryDetails: props.navigation.getParam('codeDeliveryDetails'),
			code: '',
			confirmationText: ''
		};
	}

	componentDidMount(): void {
		this._setConfirmationText();
	}

	_setConfirmationText = (): void => {
		const { email } = this.state;

		if (this.state.codeDeliveryDetails.DeliveryMedium === EMAIL)
			this.setState({
				confirmationText: `A confirmation code has been sent to ${ email }. Please enter it here to complete your signup.`
			});
		if (this.state.codeDeliveryDetails.DeliveryMedium === PHONE)
			this.setState({
				confirmationText: `A confirmation code has been sent to your phone. Please enter it here to complete your signup.`
			});
	}

	_signUp = async (): Promise<void> => {
		const { username, code, userId } = this.state;
		const { navigate } = this.props.navigation;

		if (!code) return this.setState({ error: 'Confirmation Code is missing' });

		try {
			await Auth.confirmSignUp(
				username,
				code
			);

			const apiRes: ConfirmationResult = await HttpAPI.confirmAccount({ userId });

			if (apiRes.success) navigate('Login');
		} catch (e) {
			this.setState({
				error: e.message || e.description
			});
		}
	}

	render() {
		return (
			<View style={ styles.container }>
				<Text style={ styles.text }>{ this.state.confirmationText }</Text>
				<TextInput
					placeholder={ 'Confirmation Code' }
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

export default connect(mapStateToProps, { })(Confirmation);
