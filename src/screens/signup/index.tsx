import React, { Component, ReactElement } from 'react';
import {
	KeyboardAvoidingView,
	EmitterSubscription,
	Keyboard, Image, ScrollView, Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import styles, { imageStyle } from './styles';
import { Props, SignUpActionResponse, State } from './interfaces';
import { signUp, confirmAccount, login } from '../../redux/actions';
import { SignUpState } from '../../types/redux-reducer-state-types';
import { AppState } from '../../store';
import Animated, { Easing } from 'react-native-reanimated';
import ConfirmationForm from '../../components/forms/confirmation';
import SignUpForm from '../../components/forms/signup';
import toastr from '../../helpers/toastr';
import * as EmailValidator from 'email-validator';

const {
	Value,
	timing,
	interpolate,
	Extrapolate
} = Animated;

let _keyboardDidShowSubscription: EmitterSubscription | undefined;
let _keyboardDidHideSubscription: EmitterSubscription | undefined;

const { height } = Dimensions.get('window');

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

	private _signUp = async (email: string, firstname: string, surname: string, phoneNumber: string, password: string): Promise<void | boolean> => {
		if (!email) return toastr.error('Email is missing');
		if (!EmailValidator.validate(email)) return toastr.error('Invalid Email Address');
		if (!phoneNumber) return toastr.error('Phone number is missing');
		// if (!new RegExp('08[35679]\\d{7}$').test(phoneNumber)) return toastr.error('Phone number is not a valid Irish number');
		if (!password) return toastr.error('Password is missing');

		const res: SignUpActionResponse = await this.props.signUp(email, firstname, surname, phoneNumber, password) as SignUpActionResponse;
		if (!res || !res.ok) return;

		const { userId, codeDeliveryDetails, isSignUp } = res;

		this.setState({ // Setting this state will hide the sign up form and display the confirm email / account form
			confirmationDetails: {
				userId,
				email,
				codeDeliveryDetails,
				isSignUp,
				password
			}
		});
	}

	public render(): ReactElement {
		return (
			<ScrollView style={ { flex: 1, backgroundColor: 'black' } }>
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
						!this.state.confirmationDetails &&
							<SignUpForm
								signUp={ this._signUp }
								isCreatingAccount={ this.props.isCreatingAccount }
								keyboardOpen={ this.keyboardOpen }
								passwordError={ this.props.passwordError }
								navigation={ this.props.navigation }
							/>
					}

					{
						this.state.confirmationDetails &&
							<ConfirmationForm
								navigation={ this.props.navigation }
								confirmAccount={ this.props.confirmAccount }
                                login={ this.props.login }
								username={ this.state.confirmationDetails.email }
								password={ this.state.confirmationDetails.password }
								userId={ this.state.confirmationDetails.userId }
								codeDeliveryDetails={ this.state.confirmationDetails.codeDeliveryDetails }
								isSignUp={ this.state.confirmationDetails.isSignUp }
								isConfirmingAccount={ this.props.isConfirmingAccount } />
					}
				</KeyboardAvoidingView>
			</ScrollView>
		);
	}
}

const mapStateToProps = (state: AppState): SignUpState => ({
	...state.signUpReducer,
	...state.confirmReducer
});

export default connect(mapStateToProps, { signUp, confirmAccount, login })(SignUp);
