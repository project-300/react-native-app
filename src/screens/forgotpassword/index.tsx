import React, { Component, ReactElement } from 'react';
import {
	StyleSheet,
	KeyboardAvoidingView,
	EmitterSubscription,
	Keyboard,
	View,
	TextInput,
	TouchableOpacity,
	Text
} from 'react-native';
import { connect } from 'react-redux';
import styles, { imageStyle } from './styles';
import { Props, State } from './interfaces';
import { forgotPassword, forgotPasswordSubmit } from '../../redux/actions';
import { SignUpState, ForgotPasswordState } from '../../types/redux-reducer-state-types';
import { AppState } from '../../store';
import Background from '../../assets/svg/signup-bg.svg';
import Logo from '../../assets/svg/mini.svg';
import Animated, { Easing } from 'react-native-reanimated';
import toastr from '../../helpers/toastr';
import * as EmailValidator from 'email-validator';
import { Auth } from 'aws-amplify';
import formStyles from '../../styles/forms';

const {
	Value,
	timing,
	interpolate,
	Extrapolate
} = Animated;

let _keyboardDidShowSubscription: EmitterSubscription | undefined;
let _keyboardDidHideSubscription: EmitterSubscription | undefined;

export class ForgotPassword extends Component<Props, State> {

	private readonly loadImage: Animated.Value<number>;
	private readonly background: Animated.Value<number>;
	private readonly imageOpacity: Animated.Node<number>;
	private readonly backgroundPosition: Animated.Node<number>;

	public constructor(props: Props) {
		super(props);

		this.state = {
			code: '',
			password: '',
			keyboardOpen: false,
			isConfirming: false,
			email: '',
			confirmed: false,
			codeSent: false,
			isSendingCode: false,
			confirmPassword: ''
		};

		this.loadImage = new Value(0);
		this.background = new Value(0);

		this.imageOpacity = interpolate(this.loadImage, {
			inputRange: [ 0, 1 ],
			outputRange: [ 0, 1 ],
			extrapolate: Extrapolate.CLAMP
		});

		this.backgroundPosition = interpolate(this.background, {
			inputRange: [ 0, 1 ],
			outputRange: [ 0, -1000 ],
			extrapolate: Extrapolate.CLAMP
		});
	}

	public componentDidMount(): void {
		_keyboardDidShowSubscription = Keyboard.addListener('keyboardDidShow', this.keyboardOpen);
		_keyboardDidHideSubscription = Keyboard.addListener('keyboardDidHide', this.keyboardClose);

		this.showImage(1000);
	}

	public componentWillUnmount(): void {
		if (_keyboardDidShowSubscription) _keyboardDidShowSubscription.remove();
		if (_keyboardDidHideSubscription) _keyboardDidHideSubscription.remove();
	}

	private _validateCodeForm() {
		return this.state.email.length > 0;
	  }

	private _validateResetForm() {
		return (
			this.state.code.length > 0 &&
			this.state.password.length > 0 &&
			this.state.password === this.state.confirmPassword
		);
	}

	private keyboardOpen = (): void => this.hideImage(500);

	private keyboardClose = (): void => this.showImage(800);

	private showImage = (duration: number): void => {
		timing(this.loadImage, {
			duration,
			toValue: 1,
			easing: Easing.inOut(Easing.ease)
		}).start();
	}

	private hideImage = (duration: number): void => {
		timing(this.loadImage, {
			duration,
			toValue: 0,
			easing: Easing.inOut(Easing.ease)
		}).start();
	}

	private swipeBackground = (direction: string): void => { // Background SVG image swipes across the screen
		timing(this.background, {
			duration: 1000,
			toValue: direction === 'LEFT' ? 1 : 0,
			easing: Easing.inOut(Easing.circle)
		}).start();
	}

	private _handleSendCodeClick = async (): Promise<void> => {
		await this.props.forgotPassword(this.state.email);
	  }

	private _handleConfirmClick = async (): Promise<void> => {
		await this.props.forgotPasswordSubmit(
			this.state.email,
			this.state.code,
			this.state.password
		);
	}

	private _renderRequestCodeForm(): ReactElement {
		return (
			<View>
				<TextInput
					placeholder={ 'EMAIL' }
					placeholderTextColor='black'
					onChangeText={ (email: string): void => this.setState({ email }) }
					autoCorrect={ false }
					autoCompleteType={ 'off' }
					autoCapitalize='none'
					style={ formStyles.input } />
				<TouchableOpacity
					disabled={ !this._validateCodeForm() }
					style={ formStyles.largeButton }
					onPress={ this._handleSendCodeClick }>
					<Text style={ formStyles.buttonText }>Send Confirmation</Text>
				</TouchableOpacity>
			</View>
		);
	}

	private _renderConfirmationForm(): ReactElement {
		return (
			<View>
				<TextInput
					placeholder={ 'CONFIRMATION CODE' }
					placeholderTextColor='black'
					onChangeText={ (code: string): void => this.setState({ code }) }
					autoCorrect={ false }
					autoCompleteType={ 'off' }
					autoCapitalize='none'
					style={ formStyles.input } />
				<Text>Please check your email ({ this.state.email }) for the confirmation code.</Text>
				<TextInput
					placeholder={ 'PASSWORD' }
					placeholderTextColor='black'
					onChangeText={ (password: string): void => this.setState({ password }) }
					autoCorrect={ false }
					autoCompleteType={ 'off' }
					autoCapitalize='none'
					style={ formStyles.input } />
				<TextInput
					placeholder={ 'CONFIRM PASSWORD' }
					placeholderTextColor='black'
					onChangeText={ (confirmPassword: string): void => this.setState({ confirmPassword }) }
					autoCorrect={ false }
					autoCompleteType={ 'off' }
					autoCapitalize='none'
					style={ formStyles.input } />
				<TouchableOpacity
					disabled={ !this._validateResetForm() }
					style={ formStyles.largeButton }
					onPress={ this._handleConfirmClick }>
					<Text style={ formStyles.buttonText }>Submit</Text>
				</TouchableOpacity>
			</View>
		);
	}

	private _renderSuccessMessage(): ReactElement {
		return (
			<View>
				<Text>Your password has been reset</Text>
				<TouchableOpacity
					onPress={ (): boolean => this.props.navigation.navigate('Login') }>
					<Text style={ styles.loginLink }>
						Click here to login with your new credentials
					</Text>
				</TouchableOpacity>
			</View>
		);
	}

	public render(): ReactElement {
		return (
			<KeyboardAvoidingView behavior='padding' style={ styles.container }>
				<Animated.View style={ [ StyleSheet.absoluteFill, { right: this.backgroundPosition } ] }>
					<Background preserveAspectRatio='xMaxYMid slice' />
				</Animated.View>
				{
					!this.state.keyboardOpen &&
						<Animated.View style={ imageStyle(this.imageOpacity) }>
							<Logo style={ styles.logo } />
						</Animated.View>
				}

				{
					!this.props.codeSent
						? this._renderRequestCodeForm()
						: !this.props.confirmed
							? this._renderConfirmationForm()
							: this._renderSuccessMessage()
				}
			</KeyboardAvoidingView>
		);
	}
}

const mapStateToProps = (state: AppState): ForgotPasswordState => ({
	...state.forgotPasswordReducer
});

export default connect(mapStateToProps, { forgotPassword, forgotPasswordSubmit })(ForgotPassword);
