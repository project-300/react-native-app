import React, { Component, ReactElement } from 'react';
import {
	Text,
	View,
	TextInput,
	TouchableOpacity
} from 'react-native';
import styles from './styles';
import { Props, State } from './interfaces';
import { EMAIL, PHONE } from '../../../constants/cognito-delivery-methods';
import toastr from '../../../helpers/toastr';
import formStyles from '../../../styles/forms';

export default class ConfirmationForm extends Component<Props, State> {

	public constructor(props: Props) {
		super(props);

		const {
			username,
			userId,
			isSignUp,
			codeDeliveryDetails
		} = this.props;

		this.state = {
			code: '',
			confirmationText: '',
			username,
			codeDeliveryDetails,
			userId,
			isSignUp
		};
	}

	public componentDidMount(): void {
		this._setConfirmationText();
	}

	private _setConfirmationText = (): void => {
		const { username, codeDeliveryDetails } = this.state;
		const { DeliveryMedium } = codeDeliveryDetails;

		if (DeliveryMedium === EMAIL)
			this.setState({
				confirmationText: `A confirmation code has been sent to ${ username }. Please enter it here to complete your signup.`
			});
		if (DeliveryMedium === PHONE)
			this.setState({
				confirmationText: `A confirmation code has been sent to your phone. Please enter it here to complete your signup.`
			});
	}

	private _confirmSignUp = async (): Promise<void> => {
		const { username, userId, code, isSignUp } = this.state;

		if (!code) return toastr.error('Confirmation Code is missing');

		const res = await this.props.confirmAccount(userId, code, isSignUp, username);
		console.log(res);
		if (res && isSignUp) this.props.navigation.navigate('Login');
		else if (res) this.props.navigation.navigate('Profile');
	}

	public render(): ReactElement {
		return (
			<View>
				<Text style={ styles.text }>{ this.state.confirmationText }</Text>

				<TextInput
					placeholder={ 'CONFIRMATION CODE' }
					placeholderTextColor='black'
					onChangeText={ (code: string): void => this.setState({ code }) }
					autoCorrect={ false }
					autoCompleteType={ 'off' }
					autoCapitalize='none'
					keyboardType={ 'numeric' }
					style={ formStyles.input } />

				<TouchableOpacity
					disabled={ this.props.isConfirmingAccount }
					style={ formStyles.largeButton }
					onPress={ this._confirmSignUp }>
					<Text style={ formStyles.buttonText }>CONFIRM</Text>
				</TouchableOpacity>
			</View>
		);
	}
}
