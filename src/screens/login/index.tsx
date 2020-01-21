import React, { Component, ReactElement } from 'react';
import { Dimensions, StatusBar, StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Keyboard, Platform } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { CompState, Props } from './interfaces';
import { login } from '../../redux/actions';
import toastr from '../../helpers/toastr';
import { LoginState } from '../../types/redux-reducer-state-types';
import { AppState } from '../../store';
import Animated, { Easing } from 'react-native-reanimated';
import { State, TapGestureHandler, TouchableOpacity } from 'react-native-gesture-handler';
import Svg, { Image, Circle, ClipPath } from 'react-native-svg';
import Icon from 'react-native-vector-icons/FontAwesome5';

// Documentation: /docs/login.md

const { Value, event, block, cond, eq, set, Clock, startClock, stopClock, debug, timing, clockRunning, interpolate, Extrapolate, concat } = Animated;
const { width, height } = Dimensions.get('window');

function runTiming(clock, value, dest) {
	const state = {
		finished: new Value(0),
		position: new Value(0),
		time: new Value(0),
		frameTime: new Value(0)
	};

	const config = {
		duration: 1000,
		toValue: new Value(0),
		easing: Easing.inOut(Easing.ease)
	};

	return block([
		cond(clockRunning(clock), 0, [
			set(state.finished, 0),
			set(state.time, 0),
			set(state.position, value),
			set(state.frameTime, 0),
			set(config.toValue, dest),
			startClock(clock)
		]),
		timing(clock, state, config),
		cond(state.finished, debug('stop clock', stopClock(clock))),
		state.position
	]);
}

let _keyboardWillShowSubscription;
let _keyboardDidShowSubscription;
let _keyboardWillHideSubscription;
let _keyboardDidHideSubscription;

export class Login extends Component<Props, CompState> {

	public constructor(props: Props) {
		super(props);

		this.state = {
			username: '',
			password: '',
			hidePassword: true,
			keyboardHeight: 0,
			backgroundOpacity: 1,
			keyboardOpen: false
		};

		this.buttonOpacity = new Value(1);
		// this.closeButtonOpacity = new Value(1);
		this.keyboardShowing = new Value(0);

		this.onStateChange = event([
			{
				nativeEvent: ({ state }) => block([
					cond(eq(state, State.END),
						set(this.buttonOpacity, runTiming(
							new Clock(), 1, 0
						)))
				])
			}
		]);

		this.onCloseState = event([
			{
				nativeEvent: ({ state }) => block([
					cond(eq(state, State.END),
						set(this.buttonOpacity, runTiming(
							new Clock(), 0, 1
						)))
				])
			}
		]);

		// this.keyboardShown = event([
		// 	{
		// 		nativeEvent: ({ state }) => {
		// 			console.log('doo');
		// 			return block([
		// 				cond(eq(state, State.END),
		// 					set(this.keyboardShowing, runTiming(
		// 						new Clock(), 0, 1
		// 					)))
		// 			])
		// 		}
		// 	}
		// ]);

		this.buttonY = interpolate(this.buttonOpacity, {
			inputRange: [ 0, 1 ],
			outputRange: [ 100, 0 ],
			extrapolate: Extrapolate.CLAMP
		});

		const heightDiff: number = Platform.OS === 'ios' ? 50 : 75;

		this.bgY = interpolate(this.buttonOpacity, {
			inputRange: [ 0, 1 ],
			outputRange: [ (-height / 3) - heightDiff, 0 ],
			extrapolate: Extrapolate.CLAMP
		});

		this.textInputZIndex = interpolate(this.buttonOpacity, {
			inputRange: [ 0, 1 ],
			outputRange: [ 1, -1 ],
			extrapolate: Extrapolate.CLAMP
		});

		this.textInputY = interpolate(this.buttonOpacity, {
			inputRange: [ 0, 1 ],
			outputRange: [ 0, 100 ],
			extrapolate: Extrapolate.CLAMP
		});

		this.textInputOpacity = interpolate(this.buttonOpacity, {
			inputRange: [ 0, 1 ],
			outputRange: [ 1, 0 ],
			extrapolate: Extrapolate.CLAMP
		});

		this.rotateCross = interpolate(this.buttonOpacity, {
			inputRange: [ 0, 1 ],
			outputRange: [ 180, 360 ],
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

	componentDidMount() {
		_keyboardWillShowSubscription = Keyboard.addListener('keyboardWillShow', (e) => {
			timing(this.keyboardShowing, {
				duration: 500,
				toValue: 1,
				easing: Easing.inOut(Easing.ease)
			}).start();
		});

		_keyboardWillHideSubscription = Keyboard.addListener('keyboardWillHide', (e) => {
			timing(this.keyboardShowing, {
				duration: 500,
				toValue: 0,
				easing: Easing.inOut(Easing.ease)
			}).start();
		});
	}

	componentWillUnmount() {
		_keyboardWillShowSubscription.remove();
		_keyboardWillHideSubscription.remove();
	}

	private _loginAttempt = async (): Promise<void> => {
		this.setState({ hidePassword: true });

		const { username, password } = this.state;

		if (!username) return toastr.error('Username is missing');
		if (!password) return toastr.error('Password is missing');

		const res: boolean = await this.props.login(username, password);
		res && this.props.navigation.navigate('Home');
	}

	public render(): ReactElement {
		return (
			<KeyboardAvoidingView behavior='padding' style={ { flex: 1, backgroundColor: 'white', justifyContent: 'flex-end' } }>
				<StatusBar
					barStyle='light-content'
				/>
				<Animated.View style={ { ...StyleSheet.absoluteFill, transform: [ { translateY: this.bgY } ], opacity: this.backgroundOpacity } }>
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
							resizeMode='contain'
							preserveAspectRatio='xMinYMid slice'
							clipPath='url(#clip)'
						/>
					</Svg>
				</Animated.View>
				<View style={ { height: height / 3 } }>
					<TapGestureHandler onHandlerStateChange={ this.onStateChange }>
						<Animated.View style={ { ...styles.uiButton, opacity: this.buttonOpacity, transform: [ { translateY: this.buttonY } ] } }>
							<Text style={ { fontSize: 20, fontWeight: 'bold' } }>
								SIGN IN
							</Text>
						</Animated.View>
					</TapGestureHandler>
					<Animated.View style={ { ...styles.uiButton, opacity: this.buttonOpacity, transform: [ { translateY: this.buttonY } ] } }>
						<Text style={ { fontSize: 20, fontWeight: 'bold' } }>
							SIGN UP
						</Text>
					</Animated.View>

					<Animated.View
						style={ {
							height: height / 3,
							...StyleSheet.absoluteFill,
							top: null,
							justifyContent: 'center',
							zIndex: this.textInputZIndex,
							opacity: this.textInputOpacity,
							transform: [ { translateY: this.textInputY } ]
						} }>

						<TapGestureHandler onHandlerStateChange={ this.onCloseState }>
							<Animated.View style={ [ styles.closeButton, { opacity: this.closeButtonOpacity } ] }>
								<Animated.Text style={ { fontSize: 15, transform: [ { rotate: concat(this.rotateCross, 'deg') } ] } }>
									<Icon
										name={ 'times' }
										size={ 22 }
									/>
								</Animated.Text>
							</Animated.View>
						</TapGestureHandler>

						<TextInput
							placeholder='USERNAME'
							placeholderTextColor='black'
							onChangeText={ (username: string): void => this.setState({ username }) }
							style={ styles.textInput } />
						<TextInput
							placeholder='PASSWORD'
							placeholderTextColor='black'
							secureTextEntry={ this.state.hidePassword }
							onChangeText={ (password: string): void => this.setState({ password })}
							style={ styles.textInput } />

						<TouchableOpacity style={ styles.uiButton } onPress={ this._loginAttempt }>
							<Text style={ { fontSize: 20, fontWeight: 'bold' } }>
								SIGN IN
							</Text>
						</TouchableOpacity>
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

/*
<View style={ styles.container }>
	<View style={ styles.inputContainer }>
		<TextInput
			placeholder={ 'Username' }
			onChangeText={ (username: string): void => this.setState({ username }) }
			style={ styles.input } />
	</View>
	<View style={ styles.inputContainer }>
		<TextInput
			secureTextEntry={ this.state.hidePassword }
			placeholder={ 'Password' }
			style={ styles.input }
			onChangeText={ (password: string): void => this.setState({ password })}
		/>
		<TouchableOpacity
			style={ styles.showPasswordIconContainer }
			onPress={ (): void => this.setState({ hidePassword: !this.state.hidePassword }) }
		>
			<Icon
				name={ this.state.hidePassword ? 'eye' : 'eye-slash' }
				style={ styles.showPasswordIcon }
			/>
		</TouchableOpacity>
	</View>

	<TouchableOpacity
		disabled={ this.props.isLoggingIn }
		style={ styles.button }
		onPress={ this._loginAttempt }>
		<Text
			style={ styles.buttonText }
		>Login</Text>
	</TouchableOpacity>
	<TouchableOpacity
		onPress={ (): boolean => this.props.navigation.navigate('SignUp') }>
		<Text style={ styles.signUpLink }>
			Not registered yet? Sign Up
		</Text>
	</TouchableOpacity>
</View>
*/
