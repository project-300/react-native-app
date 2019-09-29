import React, { Component, ReactElement } from 'react';
import {
	Text,
	View,
	TextInput,
	TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Props, State } from './interfaces';
import { EMAIL, PHONE } from '../../../constants/cognito-delivery-methods';
import { confirmAccount } from '../../../redux/actions';
import toastr from '../../../helpers/toastr';
import { ConfirmState } from '../../../types/redux-reducer-state-types';
import { AppState } from '../../../store';

class Confirmation extends Component<Props, State> {

	public constructor(props: Props) {
		super(props);

		const { getParam } = this.props.navigation;

		this.state = {
			code: '',
			confirmationText: '',
			username: getParam('username', ''),
			email: getParam('email', ''),
			codeDeliveryDetails: getParam('codeDeliveryDetails', { }),
			userId: getParam('userId', ''),
			isSignUp: getParam('isSignUp', false)
		};
	}

	public componentDidMount(): void {
		this._setConfirmationText();
	}

	private _setConfirmationText = (): void => {
		const { email, codeDeliveryDetails } = this.state;
		const { DeliveryMedium } = codeDeliveryDetails;

		if (DeliveryMedium === EMAIL)
			this.setState({
				confirmationText: `A confirmation code has been sent to ${ email }. Please enter it here to complete your signup.`
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
		if (res && isSignUp) this.props.navigation.navigate('Login');
		else if (res) this.props.navigation.navigate('Profile');
	}

	public render(): ReactElement {
		return (
			<View style={ styles.container }>
				<Text style={ styles.text }>{ this.state.confirmationText }</Text>
				<TextInput
					placeholder={ 'Confirmation Code' }
					onChangeText={ (code: string): void => this.setState({ code }) }
					style={ styles.input } />
				<TouchableOpacity
					disabled={ this.props.isConfirmingAccount }
					style={ styles.button }
					onPress={ this._confirmSignUp }>
					<Text
						style={ styles.buttonText }
					>Confirm</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const mapStateToProps = (state: AppState): ConfirmState => ({
	...state.confirmReducer
});

export default connect(mapStateToProps, { confirmAccount })(Confirmation);
