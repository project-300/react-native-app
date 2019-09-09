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
import { Props, State } from './interfaces';
import { EMAIL, PHONE } from '../../../constants/cognito-delivery-methods';
import { confirmAccount } from '../../../redux/actions';
import toastr from '../../../helpers/toastr';

class Confirmation extends Component<Props, State> {

	public constructor(props: Props) {
		super(props);

		this.state = {
			code: '',
			confirmationText: ''
		};
	}

	public componentDidMount(): void {
		this._setConfirmationText();
	}

	private _setConfirmationText = (): void => {
		const { email } = this.props;

		if (this.props.codeDeliveryDetails.DeliveryMedium === EMAIL)
			this.setState({
				confirmationText: `A confirmation code has been sent to ${ email }. Please enter it here to complete your signup.`
			});
		if (this.props.codeDeliveryDetails.DeliveryMedium === PHONE)
			this.setState({
				confirmationText: `A confirmation code has been sent to your phone. Please enter it here to complete your signup.`
			});
	}

	private _confirmSignUp = async (): Promise<void> => {
		const { username, userId } = this.props;
		const { code } = this.state;

		if (!code) return toastr.error('Confirmation Code is missing');

		const res = await this.props.confirmAccount(userId, username, code);
		if (res) this.props.navigation.navigate('Login');
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

const mapStateToProps = (state: AppState): AppState => ({
	...state.signUpReducer
});

export default connect(mapStateToProps, { confirmAccount })(Confirmation);
