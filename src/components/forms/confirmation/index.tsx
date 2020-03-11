import React, { Component, ReactElement } from 'react';
import {
	Text,
	View,
	TextInput,
	Dimensions
} from 'react-native';
import styles from './styles';
import { Props, State } from './interfaces';
import { EMAIL, PHONE } from '../../../constants/cognito-delivery-methods';
import toastr from '../../../helpers/toastr';
import formStyles from '../../../styles/forms';
import { Colours, ContrastTheme, Theme } from '../../../constants/theme';
import { Button } from 'react-native-paper';

const { width } = Dimensions.get('window');

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
		const { username, userId, isSignUp, password } = this.props;
		const { code } = this.state;

		if (!code) return toastr.error('Confirmation Code is missing');

		const res = await this.props.confirmAccount(userId, code, isSignUp, username);
		console.log(username, password);
		if (res) {
			const result: boolean = await this.props.login(username, password);
			result && this.props.navigation.navigate('SearchJourneys');
		} else toastr.error('Confirmation Code is incorrect');
	}

	public render(): ReactElement {
		return (
			<View>
				<Text style={ styles.text }>{ this.state.confirmationText }</Text>

				<TextInput
					placeholder={ 'Confirmation Code' }
					placeholderTextColor={ Colours.middleGrey }
					style={ { padding: 16, borderWidth: 0.2, borderColor: '#BBB', backgroundColor: 'white', borderRadius: 4, width: width * 0.8, alignSelf: 'center' } }
					onChangeText={ (code: string): void => this.setState({ code }) }
					autoCorrect={ false }
					autoCompleteType={ 'off' }
					autoCapitalize='none'
					keyboardType={ 'numeric' }
				/>

				<Button
					disabled={ this.props.isConfirmingAccount }
					style={ [ formStyles.button, { backgroundColor: 'white', marginTop: 20, width: width * 0.8, alignSelf: 'center' } ] }
					theme={ ContrastTheme }
					mode={ 'outlined' }
					labelStyle={ { color: Theme.accent } }
					onPress={ this._confirmSignUp }>
					CONFIRM
				</Button>
			</View>
		);
	}
}
