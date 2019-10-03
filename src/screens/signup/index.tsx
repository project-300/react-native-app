import React, { Component, ReactElement } from 'react';
import {
	Text,
	View,
	TextInput,
	TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Props, SignUpActionResponse, State } from './interfaces';
import toastr from '../../helpers/toastr';
import { signUp } from '../../redux/actions';
import { SignUpState } from '../../types/redux-reducer-state-types';
import { AppState } from '../../store';
import Icon from 'react-native-vector-icons/FontAwesome5';

// Documentation: /docs/signup.md

class SignUp extends Component<Props, State> {

	public constructor(props: Props) {
		super(props);

		this.state = {
			email: '',
			username: '',
			password: '',
			hidePassword: true
		};
	}

	private _signUp = async (): Promise<void | boolean> => {
		this.setState({ hidePassword: true });

		const { email, username, password } = this.state;
		const { navigate } = this.props.navigation;

		if (!email) return toastr.error('Email is missing');
		if (!username) return toastr.error('Username is missing');
		if (!password) return toastr.error('Password is missing');

		const res: SignUpActionResponse = await this.props.signUp(email, username, password);
		if (!res) return;
		console.log(res);
		if (res.ok && res.confirmationRequired) return navigate('Confirmation', { ...res });
		if (res.ok && !res.confirmationRequired) return navigate('Login');
	}

	public render(): ReactElement {
		return (
			<View style={ styles.container }>
				<View style={ styles.inputContainer }>
					<TextInput
						autoCapitalize='none'
						placeholder={ 'Email Address' }
						onChangeText={ (email: string): void => this.setState({ email }) }
						style={ styles.input } />
				</View>
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
					disabled={ this.props.isCreatingAccount }
					style={ styles.button }
					onPress={ this._signUp }>
					<Text
						style={ styles.buttonText }
					>Sign Up</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={ (): boolean => this.props.navigation.navigate('Login') }>
					<Text style={ styles.loginLink }>
						Already signed up? Login
					</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const mapStateToProps = (state: AppState): SignUpState => ({
	...state.signUpReducer
});

export default connect(mapStateToProps, { signUp })(SignUp);
