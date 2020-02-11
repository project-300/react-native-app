import React, { Component, ReactElement } from 'react';
import {
	StyleSheet,
	KeyboardAvoidingView,
	EmitterSubscription,
	Keyboard
} from 'react-native';
import { connect } from 'react-redux';
import styles, { imageStyle } from './styles';
import { Props, SignUpActionResponse, State } from './interfaces';
import { signUp, confirmAccount } from '../../redux/actions';
import { SignUpState } from '../../types/redux-reducer-state-types';
import { AppState } from '../../store';
import Background from '../../assets/svg/signup-bg.svg';
import Logo from '../../assets/svg/mini.svg';
import Animated, { Easing } from 'react-native-reanimated';
import ConfirmationForm from '../../components/forms/confirmation';
import SignUpForm from '../../components/forms/signup';
import toastr from '../../helpers/toastr';

const {
	Value,
	timing,
	interpolate,
	Extrapolate
} = Animated;

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
			keyboardOpen: false,
			confirmationDetails: null
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

	private _signUp = async (email: string, username: string, password: string): Promise<void | boolean> => {
		this.swipeBackground('LEFT');

		if (!email) return toastr.error('Email is missing');
		if (!username) return toastr.error('Username is missing');
		if (!password) return toastr.error('Password is missing');

		const res: SignUpActionResponse = await this.props.signUp(email, username, password) as SignUpActionResponse;
		console.log(res);
		if (!res || !res.ok) return;

		const { userId, codeDeliveryDetails, isSignUp } = res;

		this.setState({ // Setting this state will hide the sign up form and display the confirm email / account form
			confirmationDetails: {
				userId,
				username,
				email,
				codeDeliveryDetails,
				isSignUp
			}
		});
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
					!this.state.confirmationDetails &&
						<SignUpForm
							signUp={ this._signUp }
							isCreatingAccount={ this.props.isCreatingAccount }
							keyboardOpen={ this.keyboardOpen }
							navigation={ this.props.navigation }
						/>
				}

				{
					this.state.confirmationDetails &&
						<ConfirmationForm
							navigation={ this.props.navigation }
							confirmAccount={ this.props.confirmAccount }
							username={ this.state.confirmationDetails.username }
							userId={ this.state.confirmationDetails.userId }
							codeDeliveryDetails={ this.state.confirmationDetails.codeDeliveryDetails }
							isSignUp={ this.state.confirmationDetails.isSignUp }
							isConfirmingAccount={ this.props.isConfirmingAccount } />
				}
			</KeyboardAvoidingView>
		);
	}
}

const mapStateToProps = (state: AppState): SignUpState => ({
	...state.signUpReducer, ...state.confirmReducer
});

export default connect(mapStateToProps, { signUp, confirmAccount })(SignUp);
