import React, { Component, ReactElement } from 'react';
import {
	Dimensions,
	StatusBar,
	StyleSheet,
	Text,
	View,
	KeyboardAvoidingView,
	Keyboard,
	Platform,
	EmitterSubscription,
	KeyboardEvent,
	TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { CompState, Props } from './interfaces';
import { login } from '../../redux/actions';
import { LoginState } from '../../types/redux-reducer-state-types';
import { AppState } from '../../store';
import Animated, { Easing } from 'react-native-reanimated';
import Svg, { Image, Circle, ClipPath } from 'react-native-svg';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { LoginForm } from '../../components/forms/login';
import formStyles from '../../styles/forms';

const {
	Value,
	timing,
	interpolate,
	Extrapolate,
	concat
} = Animated;

const { width, height } = Dimensions.get('window');

let _keyboardWillShowSubscription: EmitterSubscription | undefined;
let _keyboardDidShowSubscription: EmitterSubscription | undefined;
let _keyboardWillHideSubscription: EmitterSubscription | undefined;
let _keyboardDidHideSubscription: EmitterSubscription | undefined;

export class Login extends Component<Props, CompState> {

	private readonly generalOpacity: Animated.Value<number>;
	private readonly signInOpacity: Animated.Value<number>;
	private readonly signUpOpacity: Animated.Value<number>;
	private readonly keyboardShowing: Animated.Value<number>;

	private readonly buttonY: Animated.Node<number>;
	private readonly bgY: Animated.Node<number>;
	private readonly textInputZIndex: Animated.Node<number>;
	private readonly textInputY: Animated.Node<number>;
	private readonly textInputOpacity: Animated.Node<number>;
	private readonly rotateCross: Animated.Node<number>;
	private readonly closeButtonOpacity: Animated.Node<number>;
	private readonly backgroundOpacity: Animated.Node<number>;

	public constructor(props: Props) {
		super(props);

		this.state = {
			formOpen: false,
			keyboardOpen: false
		};

		this.generalOpacity = new Value(1);
		this.signInOpacity = new Value(1);
		this.signUpOpacity = new Value(1);
		this.keyboardShowing = new Value(0);

		const heightDiff: number = Platform.OS === 'ios' ? 35 : 75;

		this.buttonY = interpolate(this.generalOpacity, {
			inputRange: [ 0, 1 ],
			outputRange: [ 100, 0 ],
			extrapolate: Extrapolate.CLAMP
		});

		this.bgY = interpolate(this.generalOpacity, {
			inputRange: [ 0, 1 ],
			outputRange: [ (-height / 3) - heightDiff, 0 ],
			extrapolate: Extrapolate.CLAMP
		});

		this.textInputZIndex = interpolate(this.generalOpacity, {
			inputRange: [ 0, 1 ],
			outputRange: [ 1, -1 ],
			extrapolate: Extrapolate.CLAMP
		});

		this.textInputY = interpolate(this.generalOpacity, {
			inputRange: [ 0, 1 ],
			outputRange: [ 0, 100 ],
			extrapolate: Extrapolate.CLAMP
		});

		this.textInputOpacity = interpolate(this.generalOpacity, {
			inputRange: [ 0, 1 ],
			outputRange: [ 1, 0 ],
			extrapolate: Extrapolate.CLAMP
		});

		this.rotateCross = interpolate(this.generalOpacity, {
			inputRange: [ 0, 1 ],
			outputRange: [ 0, 360 ],
			extrapolate: Extrapolate.CLAMP
		});

		this.closeButtonOpacity = interpolate(this.keyboardShowing, {
			inputRange: [ 0, 1 ],
			outputRange: [ 1, 0 ],
			extrapolate: Extrapolate.CLAMP
		});

		this.backgroundOpacity = interpolate(this.keyboardShowing, {
			inputRange: [ 0, 1 ],
			outputRange: [ 1, 0.6 ],
			extrapolate: Extrapolate.CLAMP
		});
	}

	private openForm = (): void => {
		this.setState({ formOpen: true }); // Show login form just before opacity becomes visible

		timing(this.generalOpacity, {
			duration: 1000,
			toValue: 0,
			easing: Easing.inOut(Easing.ease)
		}).start();
	}

	private closeForm = (): void => {
		timing(this.generalOpacity, {
			duration: 1000,
			toValue: 1,
			easing: Easing.inOut(Easing.ease)
		}).start(() => {
			this.setState({ formOpen: false }); // Hide login form after opacity is invisible
		});
	}

	public componentDidMount(): void {
		const platform = Platform.OS;
		_keyboardWillShowSubscription = platform === 'ios' ? Keyboard.addListener('keyboardWillShow', this.keyboardShowEvent) : undefined;
		_keyboardDidShowSubscription = platform === 'android' ? Keyboard.addListener('keyboardDidShow', this.keyboardShowEvent) : undefined;
		_keyboardWillHideSubscription = platform === 'ios' ? Keyboard.addListener('keyboardWillHide', this.keyboardHideEvent) : undefined;
		_keyboardDidHideSubscription = platform === 'android' ? Keyboard.addListener('keyboardDidHide', this.keyboardHideEvent) : undefined;
	}

	public componentWillUnmount(): void {
		if (_keyboardWillShowSubscription) _keyboardWillShowSubscription.remove();
		if (_keyboardDidShowSubscription) _keyboardDidShowSubscription.remove();
		if (_keyboardWillHideSubscription) _keyboardWillHideSubscription.remove();
		if (_keyboardDidHideSubscription) _keyboardDidHideSubscription.remove();
	}

	private keyboardShowEvent = (e: KeyboardEvent): void => {
		this.setState({ keyboardOpen: true });

		timing(this.keyboardShowing, {
			duration: 500,
			toValue: 1,
			easing: Easing.inOut(Easing.ease)
		}).start();
	}

	private keyboardHideEvent = (e: KeyboardEvent): void => {
		this.setState({ keyboardOpen: false });

		timing(this.keyboardShowing, {
			duration: 500,
			toValue: 0,
			easing: Easing.inOut(Easing.ease)
		}).start();
	}

	public render(): ReactElement {
		/* 	Set behaviour to 'padding' for iOS and 'height' for Android.
		 	The login form will act the same way using this method.
		 	Using 'height' for iOS will cause the form to disappear when moving the focus from one input to another.
		 	Using 'padding' for Android will cause the login form to be thrown to the top of the screen.
	 	*/
		const keyboardAvoidingBehaviour = Platform.OS === 'ios' ? 'padding' : 'height';

		/*
			Keep login form contained in this render method.
			Using a child component will cause the form to disappear
			when moving from the password input to the username / email input on Android.
			Seems to be an issue with KeyboardAvoidingView.
		*/

		return (
			<KeyboardAvoidingView behavior={ keyboardAvoidingBehaviour } style={ { flex: 1, backgroundColor: 'white', justifyContent: 'flex-end' } }>
				<StatusBar
					barStyle='light-content'
				/>
				<Animated.View style={ [ StyleSheet.absoluteFill, { transform: [ { translateY: this.bgY } ], opacity: this.backgroundOpacity } ] }>
					<Svg
						height={ height + 50 }
						width={ width }
						style={ {
							shadowOffset: {
								width: 2,
								height: 2
							},
							shadowColor: 'black',
							shadowOpacity: 0.4
						} }
					>
						<ClipPath id='clip'>
							<Circle r={ height + 50 } cx={ width / 2 } />
						</ClipPath>
						<Image
							href={ require('../../assets/images/login-bg.jpg') }
							width={ width }
							height={ height + 50 }
							preserveAspectRatio='xMinYMid slice'
							clipPath='url(#clip)'
						/>
					</Svg>
				</Animated.View>
				<View style={ { height: height / 3 } }>
					<TouchableOpacity onPress={ this.openForm }>
						<Animated.View style={ [ formStyles.largeButton, { opacity: this.generalOpacity, transform: [ { translateY: this.buttonY } ] } ] }>
							<Text style={ formStyles.buttonText }>
								SIGN IN
							</Text>
						</Animated.View>
					</TouchableOpacity>
					<TouchableOpacity onPress={ (): boolean => this.props.navigation.navigate('SignUp') }>
						<Animated.View style={ [ formStyles.largeButton, { opacity: this.generalOpacity, transform: [ { translateY: this.buttonY } ] } ] }>
							<Text style={ formStyles.buttonText }>
								SIGN UP
							</Text>
						</Animated.View>
					</TouchableOpacity>

					<Animated.View
						style={ [
							StyleSheet.absoluteFill,
							{
								height: height / 3,
								top: null,
								justifyContent: 'center',
								zIndex: this.textInputZIndex,
								opacity: this.textInputOpacity,
								transform: [ { translateY: this.textInputY } ]
							}
						] }>

						<TouchableOpacity onPress={ this.closeForm } style={ { position: 'relative', top: -15 } }>
							<Animated.View style={ [ styles.closeButton, { opacity: this.closeButtonOpacity } ] }>
								<Animated.Text style={ { fontSize: 15, transform: [ { rotate: concat(this.rotateCross, 'deg') } ] } }>
									<Icon
										name={ 'times' }
										size={ 22 }
									/>
								</Animated.Text>
							</Animated.View>
						</TouchableOpacity>

						<LoginForm
							isLoggingIn={ this.props.isLoggingIn }
							isLoggedIn={ this.props.isLoggedIn }
							login={ this.props.login }
							keyboardOpen={ this.state.keyboardOpen }
							navigation={ this.props.navigation }
						/>
					</Animated.View>
				</View>
			</KeyboardAvoidingView>
		);
	}
}

const mapStateToProps = (state: AppState): LoginState => ({
	...state.loginReducer
});

export default connect(mapStateToProps, { login })(Login);
