import React, { Component, ReactElement } from 'react';
import {
	Text,
	View,
	TextInput,
	TouchableOpacity
} from 'react-native';
import styles from './styles';
import { Props, State } from './interfaces';
import formStyles from '../../../styles/forms';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class SignUpForm extends Component<Props, State> {

	public constructor(props: Props) {
		super(props);

		this.state = {
			email: '',
			username: '',
			password: '',
			hidePassword: true
		};
	}

	public render(): ReactElement {
		return (
			<View>
				<TextInput
					placeholder={ 'EMAIL ADDRESS' }
					placeholderTextColor='black'
					autoCapitalize='none'
					onChangeText={ (email: string): void => this.setState({ email }) }
					keyboardType={ 'email-address' }
					onFocus={ this.props.keyboardOpen }
					style={ formStyles.input } />
				<TextInput
					placeholder={ 'USERNAME' }
					placeholderTextColor='black'
					autoCapitalize='none'
					onChangeText={ (username: string): void => this.setState({ username }) }
					onFocus={ this.props.keyboardOpen }
					style={ formStyles.input } />
				<View>
					<TextInput
						placeholder={ 'PASSWORD' }
						placeholderTextColor='black'
						autoCapitalize='none'
						secureTextEntry={ this.state.hidePassword }
						onChangeText={ (password: string): void => this.setState({ password })}
						onFocus={ this.props.keyboardOpen }
						style={ formStyles.input }
					/>
					{
						!!this.state.password &&
							<TouchableOpacity
								style={ styles.showPasswordIconContainer }
								onPress={ (): void => this.setState({ hidePassword: !this.state.hidePassword }) }>
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
					onPress={ (): Promise<void | boolean> => this.props.signUp(this.state.email, this.state.username, this.state.password) }>
					<Text style={ formStyles.buttonText }>SIGN UP</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={ (): boolean => this.props.navigation.navigate('Login') }>
					<Text style={ styles.loginLink }>
						Already signed up? Sign in
					</Text>
				</TouchableOpacity>
			</View>
		);
	}
}
