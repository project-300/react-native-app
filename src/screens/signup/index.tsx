import React, { Component, ReactElement } from 'react';
import {
	Text,
	View,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	KeyboardAvoidingView,
	EmitterSubscription,
	Keyboard,
	Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Props, SignUpActionResponse, State } from './interfaces';
import toastr from '../../helpers/toastr';
import { signUp } from '../../redux/actions';
import { SignUpState } from '../../types/redux-reducer-state-types';
import { AppState } from '../../store';
import Icon from 'react-native-vector-icons/FontAwesome5';
import formStyles from '../../styles/forms';
import Background from '../../assets/svg/signup-bg.svg';
import Logo from '../../assets/svg/mini.svg';
import Animated, { Easing } from 'react-native-reanimated';

const {
	Value,
	timing,
	interpolate,
	Extrapolate,
} = Animated;

const { width } = Dimensions.get('window');

let _keyboardDidShowSubscription: EmitterSubscription | undefined;
let _keyboardDidHideSubscription: EmitterSubscription | undefined;

export class SignUp extends Component<Props, State> {

	private readonly loadImage: Animated.Value<number>;
	private readonly background: Animated.Value<number>;
	private readonly imageOpacity: Animated.Node<number>;
	private readonly backgroundPosition: Animated.Node<number>;

	public constructor(props: Props) {
		super(props);

		this.state = {
			email: '',
			username: '',
			password: '',
			hidePassword: true,
			keyboardOpen: false
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

		timing(this.loadImage, {
			duration: 1000,
			toValue: 1,
			easing: Easing.inOut(Easing.ease)
		}).start();
	}

	public componentWillUnmount(): void {
		if (_keyboardDidShowSubscription) _keyboardDidShowSubscription.remove();
		if (_keyboardDidHideSubscription) _keyboardDidHideSubscription.remove();
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

	private _signUp = async (): Promise<void | boolean> => {
		this.setState({ hidePassword: true });
		this.swipeBackground('LEFT');

		const { email, username, password } = this.state;
		const { navigate } = this.props.navigation;

		if (!email) return toastr.error('Email is missing');
		if (!username) return toastr.error('Username is missing');
		if (!password) return toastr.error('Password is missing');

		const res: SignUpActionResponse = await this.props.signUp(email, username, password);
		if (!res) return;

		if (res.ok && res.confirmationRequired) return navigate('Confirmation', { ...res });
		if (res.ok && !res.confirmationRequired) return navigate('Login');
	}

	private swipeBackground = (direction: string): void => {
		timing(this.background, {
			duration: 1000,
			toValue: direction === 'LEFT' ? 1 : 0,
			easing: Easing.inOut(Easing.circle)
		}).start();
	}

	public render(): ReactElement {
		return (
			<KeyboardAvoidingView behavior='padding' style={ styles.container }>
				<Animated.View style={ [ StyleSheet.absoluteFill, { right: this.backgroundPosition } ] }>
					<Background preserveAspectRatio='xMaxYMid slice' />
				</Animated.View>
				{
					!this.state.keyboardOpen &&
						<Animated.View style={ { marginBottom: 40, width, alignSelf: 'center', opacity: this.imageOpacity } }>
							<Logo
								style={ { alignSelf: 'center', width } }
							/>
						</Animated.View>
				}
				<TextInput
					placeholder={ 'EMAIL ADDRESS' }
					placeholderTextColor='black'
					autoCapitalize='none'
					onChangeText={ (email: string): void => this.setState({ email }) }
					keyboardType={ 'email-address' }
					onFocus={ (): void => this.keyboardOpen() }
					style={ formStyles.input } />
				<TextInput
					placeholder={ 'USERNAME' }
					placeholderTextColor='black'
					autoCapitalize='none'
					onChangeText={ (username: string): void => this.setState({ username }) }
					onFocus={ (): void => this.keyboardOpen() }
					style={ formStyles.input } />
				<View>
					<TextInput
						placeholder={ 'PASSWORD' }
						placeholderTextColor='black'
						autoCapitalize='none'
						secureTextEntry={ this.state.hidePassword }
						onChangeText={ (password: string): void => this.setState({ password })}
						onFocus={ (): void => this.keyboardOpen() }
						style={ formStyles.input }
					/>
					{
						!!this.state.password && <TouchableOpacity
							style={ styles.showPasswordIconContainer }
							onPress={ (): void => this.setState({ hidePassword: !this.state.hidePassword }) }
						>
							<Icon
								name={ this.state.hidePassword ? 'eye' : 'eye-slash' }
								style={ styles.showPasswordIcon }
							/>
						</TouchableOpacity>
					}
				</View>
				<TouchableOpacity
					disabled={ !this.state.email || !this.state.username || !this.state.password || this.props.isCreatingAccount }
					style={ formStyles.largeButton }
					onPress={ this._signUp }>
					<Text style={ formStyles.buttonText }>SIGN UP</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={ (): boolean => this.props.navigation.navigate('Login') }>
					<Text style={ styles.loginLink }>
						Already signed up? Sign in
					</Text>
				</TouchableOpacity>
			</KeyboardAvoidingView>
		);
	}
}

const mapStateToProps = (state: AppState): SignUpState => ({
	...state.signUpReducer
});

export default connect(mapStateToProps, { signUp })(SignUp);
