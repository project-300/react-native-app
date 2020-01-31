import React, { Component, ReactElement } from 'react';
import { TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { Props, State } from './interfaces';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Button, TextInput } from 'react-native-paper';

export class UpdatePassword extends Component<Props, State> {

	private initState: State = {
		newPassword: '',
		currentPassword: '',
		hideNewPassword: true,
		hideCurrentPassword: true,
		isUpdating: false
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
			this.props.close();
		}
	}

	private _hidePasswords = (): void => this.setState({ hideCurrentPassword: true, hideNewPassword: true });

	public render(): ReactElement {
		const { currentPassword, newPassword, hideCurrentPassword, hideNewPassword } = this.state;

		return (
			<View style={ styles.container }>
				<View style={ [ styles.firstContainer, styles.inputContainer ] }>
					<TextInput
						secureTextEntry={ hideCurrentPassword }
						placeholder={ 'Current Password' }
						value={ currentPassword }
						mode='outlined'
						onChangeText={ (currentPassword: string): void => this.setState({ currentPassword })}
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
						mode='outlined'
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

				<View style={ styles.buttonContainer }>
					<Button
						mode={ 'contained'}
						onPress={ (): Promise<void> => this._updatePassword() }
						style={ styles.button }
					>
						Update Password
					</Button>
				</View>

				<View style={ styles.buttonContainer }>
					<Button
						mode={ 'outlined'}
						style={ styles.button }
						onPress={ this.props.close }
					>
						Cancel
					</Button>
				</View>
			</View>
		);
	}
}
