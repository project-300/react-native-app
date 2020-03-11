import React, { Component, ReactElement } from 'react';
import {
	Text,
	View,
	TouchableOpacity, TextInput
} from 'react-native';
import styles from './styles';
import { Props, State } from './interfaces';
import formStyles from '../../../styles/forms';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Button } from 'react-native-paper';
import { Colours, ContrastTheme, Theme } from '../../../constants/theme';

export default class SignUpForm extends Component<Props, State> {

	public constructor(props: Props) {
		super(props);

		this.state = {
			username: '',
			firstname: '',
			surname: '',
			phoneNumber: '',
			password: '',
			hidePassword: true
		};
	}

	public render(): ReactElement {
		return (
			<View style={ styles.container }>
				<TextInput
					placeholder={ 'Email Address' }
					placeholderTextColor={ Colours.middleGrey }
					// theme={ ContrastTheme }
					// mode={ 'outlined' }
					style={ { padding: 16, borderWidth: 0.2, borderColor: '#BBB', backgroundColor: 'white', borderRadius: 4, marginBottom: 10 } }
					autoCapitalize='none'
					autoCorrect={ false }
					onChangeText={ (username: string): void => this.setState({ username }) }
					onFocus={ this.props.keyboardOpen }
				/>
				<TextInput
					placeholder={ 'Phone Number' }
					placeholderTextColor={ Colours.middleGrey }
					// theme={ ContrastTheme }
					// mode={ 'outlined' }
					style={ { padding: 16, borderWidth: 0.2, borderColor: '#BBB', backgroundColor: 'white', borderRadius: 4, marginBottom: 10 } }
			autoCapitalize='none'
					autoCorrect={ false }
					keyboardType={ 'phone-pad' }
					onChangeText={ (phoneNumber: string): void => this.setState({ phoneNumber }) }
					onFocus={ this.props.keyboardOpen }
				/>
		<TextInput
					placeholder={ 'First Name' }
					placeholderTextColor='black'
					autoCapitalize='none'
					onChangeText={ (firstname: string): void => this.setState({ firstname }) }
					onFocus={ this.props.keyboardOpen }
					style={ formStyles.input } />
				<TextInput
					placeholder={ 'Surname' }
					placeholderTextColor='black'
					autoCapitalize='none'
					onChangeText={ (surname: string): void => this.setState({ surname }) }
					onFocus={ this.props.keyboardOpen }
					style={ formStyles.input } />
				<View>
					<TextInput
						placeholder={ 'Password' }
						placeholderTextColor={ Colours.middleGrey }
						// theme={ ContrastTheme }
						// mode={ 'outlined' }
						style={ { padding: 16, borderWidth: 0.2, borderColor: '#BBB', backgroundColor: 'white', borderRadius: 4, marginBottom: 10 } }
						autoCapitalize='none'
						autoCorrect={ false }
						secureTextEntry={ this.state.hidePassword }
						onChangeText={ (password: string): void => this.setState({ password })}
						onFocus={ this.props.keyboardOpen }
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

				<View>
					<TextInput
						placeholder={ 'Confirm Password' }
						placeholderTextColor={ Colours.middleGrey }
						// theme={ ContrastTheme }
						// mode={ 'outlined' }
						style={ { padding: 16, borderWidth: 0.2, borderColor: '#BBB', backgroundColor: 'white', borderRadius: 4, marginBottom: 10 } }
						autoCapitalize='none'
						autoCorrect={ false }
						secureTextEntry={ this.state.hidePassword }
						onChangeText={ (password: string): void => this.setState({ password })}
						onFocus={ this.props.keyboardOpen }
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

				<Button
					disabled={ !this.state.username || !this.state.password || this.props.isCreatingAccount }
					style={ [ formStyles.button, { backgroundColor: 'white', marginTop: 20 } ] }
					theme={ ContrastTheme }
					mode={ 'outlined' }
					labelStyle={ { color: Theme.accent } }
					onPress={ (): Promise<void | boolean> => this.props.signUp(this.state.username, this.state.firstname, this.state.surname, this.state.phoneNumber, this.state.password) }>
					SIGN UP
				</Button>

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
