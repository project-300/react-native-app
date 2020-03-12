import React, { Component, ReactElement } from 'react';
import {
	KeyboardAvoidingView,
	EmitterSubscription,
	Keyboard,
	View,
	TextInput,
	TouchableOpacity,
	Text, Image
} from 'react-native';
import { connect } from 'react-redux';
import styles, { imageStyle } from './styles';
import { Props, State } from './interfaces';
import { forgotPassword, forgotPasswordSubmit } from '../../redux/actions';
import { ForgotPasswordState } from '../../types/redux-reducer-state-types';
import { AppState } from '../../store';
import Animated, { Easing } from 'react-native-reanimated';
import formStyles from '../../styles/forms';
import { Colours, ContrastTheme, Theme } from '../../constants/theme';
import { Button } from 'react-native-paper';

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
			email: '',
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
					placeholder={ 'Email Address' }
					placeholderTextColor={ Colours.middleGrey }
					autoCapitalize='none'
					autoCorrect={ false }
					onChangeText={ (email: string): void => this.setState({ email }) }
					style={ styles.input }
				/>

				<Button
					style={ [ formStyles.button, { backgroundColor: 'white', marginTop: 20 } ] }
					theme={ ContrastTheme }
					mode={ 'outlined' }
					labelStyle={ { color: Theme.accent } }
					disabled={ !this._validateCodeForm() }
					onPress={ this._handleSendCodeClick }
				>
					Send Confirmation
				</Button>
			</View>
		);
	}

	private _renderConfirmationForm(): ReactElement {
		return (
			<View>
				{
					!!this.state.email &&
						<Text
							style={ styles.text }
						>Please check your email ({ this.state.email }) for the confirmation code.</Text>
				}

				<TextInput
					placeholder={ 'Confirmation Code' }
					placeholderTextColor={ Colours.middleGrey }
					onChangeText={ (code: string): void => this.setState({ code }) }
					autoCorrect={ false }
					autoCompleteType={ 'off' }
					autoCapitalize='none'
					style={ styles.input }
					keyboardType={ 'numeric' }
				/>

				<TextInput
					placeholder={ 'Password' }
					placeholderTextColor={ Colours.middleGrey }
					onChangeText={ (password: string): void => this.setState({ password }) }
					autoCorrect={ false }
					secureTextEntry= { true }
					autoCompleteType={ 'off' }
					autoCapitalize='none'
					style={ styles.input }
				/>

				<TextInput
					placeholder={ 'Confirm Password' }
					placeholderTextColor={ Colours.middleGrey }
					onChangeText={ (confirmPassword: string): void => this.setState({ confirmPassword }) }
					autoCorrect={ false }
					secureTextEntry= { true }
					autoCompleteType={ 'off' }
					autoCapitalize='none'
					style={ styles.input }
				/>

				<Button
					style={ [ formStyles.button, { backgroundColor: 'white', marginTop: 20 } ] }
					theme={ ContrastTheme }
					mode={ 'outlined' }
					labelStyle={ { color: Theme.accent } }
					disabled={ !this._validateResetForm() }
					onPress={ this._handleConfirmClick }
				>
					Submit
				</Button>
			</View>
		);
	}

	private _renderSuccessMessage(): ReactElement {
		return (
			<View>
				<Text style={ styles.text }>Your password has been successfully reset!</Text>

				<Button
					style={ [ formStyles.button, { backgroundColor: 'white', marginTop: 20 } ] }
					theme={ ContrastTheme }
					mode={ 'outlined' }
					labelStyle={ { color: Theme.accent } }
					onPress={ (): boolean => this.props.navigation.navigate('Login') }
				>Go To Sign In</Button>
			</View>
		);
	}

	public render(): ReactElement {
		return (
			<KeyboardAvoidingView behavior='padding' style={ styles.container }>
				{
					!this.state.keyboardOpen &&
						<Animated.View style={ [ imageStyle(this.imageOpacity), { width: '100%' } ] }>
							<Image
								source={ require('../../assets/images/dryve.png') }
								style={ styles.logo }
								resizeMode={ 'contain' }
							/>
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
