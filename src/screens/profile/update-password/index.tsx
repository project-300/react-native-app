import React, { Component, ReactElement } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Props, State } from './interfaces';
import { AppState } from '../../../store';
import { UpdatePasswordState } from '../../../types/redux-reducer-state-types';
import { updatePassword } from '../../../redux/actions/user/update-password';
import Icon from 'react-native-vector-icons/FontAwesome5';

class UpdatePassword extends Component<Props, State> {

	private initState: State = {
		newPassword: '',
		currentPassword: '',
		hideNewPassword: true,
		hideCurrentPassword: true
	};

	public constructor(props: Props) {
		super(props);

		this.state = this.initState;
	}

	private _updatePassword = async (): Promise<void> => {
		this._hidePasswords();
		const { currentPassword, newPassword } = this.state;
		const res = await this.props.updatePassword(currentPassword, newPassword);

		if (res) {
			this.setState(this.initState);
			this.props.navigation.goBack();
		}
	}

	private _hidePasswords = (): void => this.setState({ hideCurrentPassword: true, hideNewPassword: true });

	public render(): ReactElement {
		const { currentPassword, newPassword, hideCurrentPassword, hideNewPassword } = this.state;

		return (
			<View style={ styles.container }>
				<View style={ styles.inputContainer }>
					<TextInput
						secureTextEntry={ hideCurrentPassword }
						placeholder={ 'Current Password' }
						value={ currentPassword }
						style={ styles.input }
						onChangeText={ (currentPassword: string): void => this.setState({ currentPassword })}
						autoFocus
					/>
					<TouchableOpacity
						style={ styles.showPasswordIconContainer }
						onPress={ (): void => this.setState({ hideCurrentPassword: !this.state.hideCurrentPassword }) }
					>
						<Icon
							name={ hideCurrentPassword ? 'eye' : 'eye-slash' }
							style={ styles.showPasswordIcon }
						/>
					</TouchableOpacity>
				</View>
				<View style={ styles.inputContainer }>
					<TextInput
						secureTextEntry={ hideNewPassword }
						placeholder={ 'New Password' }
						value={ newPassword }
						style={ styles.input }
						onChangeText={ (newPassword: string): void => this.setState({ newPassword })}
					/>
					<TouchableOpacity
						style={ styles.showPasswordIconContainer }
						onPress={ (): void => this.setState({ hideNewPassword: !this.state.hideNewPassword }) }
					>
						<Icon
							name={ hideNewPassword ? 'eye' : 'eye-slash' }
							style={ styles.showPasswordIcon }
						/>
					</TouchableOpacity>
				</View>
				<TouchableOpacity
					onPress={ (): Promise<void> => this._updatePassword() }
					style={ styles.button }
				>
					<Text style={ styles.buttonText }>
						Update Password
					</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const mapStateToProps = (state: AppState): UpdatePasswordState => ({
	...state.updateUserFieldReducer
});

export default connect(mapStateToProps, { updatePassword })(UpdatePassword);
