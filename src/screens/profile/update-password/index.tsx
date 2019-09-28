import React, { Component, ReactElement } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Props, State } from './interfaces';
import { AppState } from '../../../store';
import { UpdatePasswordState } from '../../../types/redux-reducer-state-types';
import { updatePassword } from '../../../redux/actions/user/update-password';

class UpdatePassword extends Component<Props, State> {

	public constructor(props: Props) {
		super(props);

		this.state = {
			newPassword: '',
			currentPassword: ''
		};
	}

	private _updatePassword = async (): Promise<void> => {
		const { currentPassword, newPassword } = this.state;
		const res = await this.props.updatePassword(currentPassword, newPassword);
		if (res) this.props.navigation.goBack();
	}

	public render(): ReactElement {
		return (
			<View style={ styles.container }>
				<TextInput
					secureTextEntry={ true }
					placeholder={ 'Current Password' }
					value={ this.state.currentPassword }
					style={ styles.input }
					onChangeText={ (currentPassword: string): void => this.setState({ currentPassword })}
				/>
				<TextInput
					secureTextEntry={ true }
					placeholder={ 'New Password' }
					value={ this.state.newPassword }
					style={ styles.input }
					onChangeText={ (newPassword: string): void => this.setState({ newPassword })}
				/>
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
