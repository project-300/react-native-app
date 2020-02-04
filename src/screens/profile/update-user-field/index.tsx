import React, { Component, ReactElement } from 'react';
import { View } from 'react-native';
import styles from './styles';
import { Props, State } from './interfaces';
import * as EmailValidator from 'email-validator';
import toastr from '../../../helpers/toastr';
import { EditTypes } from '../../../types/common';
import { ActivityIndicator, Button, TextInput } from 'react-native-paper';
import { Theme } from '../../../constants/theme';

export class UpdateUserField extends Component<Props, State> {

	public constructor(props: Props) {
		super(props);

		this.state = {
			value: this.props.value,
			isUpdating: false
		};
	}

	private _updateValue = async (): Promise<void> => {
		if (this.state.isUpdating || !this.state.value) return;

		this.setState({ isUpdating: true });

		const { value } = this.state;
		const { type, field } = this.props;

		if (field === EditTypes.EMAIL) {
			const email = value.toLowerCase();
			if (!EmailValidator.validate(email)) return toastr.error('Invalid Email Address');
		}

		const res: boolean = await this.props.updateUserField(field, type, value);

		if (res && field === EditTypes.EMAIL) console.log('Confirmation Required'); // To be done when auth flow is updated
		else if (res) this.props.close();

		this.setState({ isUpdating: false });
	}

	public render(): ReactElement {
		return (
			<View style={ styles.container }>
				<ActivityIndicator
					animating={ this.state.isUpdating }
					color={ Theme.primary }
					size='large'
					style={ styles.spinner }
				/>

				<TextInput
					value={ this.state.value }
					style={ styles.input }
					label={ this.props.type }
					mode='outlined'
					onChangeText={ (value: string): void => this.setState({ value })}
				/>

				<View style={ styles.buttonContainer }>
					<Button
						mode={ 'contained'}
						style={ styles.button }
						onPress={ this._updateValue }
						disabled={ this.state.isUpdating || !this.state.value }
					>
						UPDATE { this.props.type }
					</Button>
				</View>

				<View style={ styles.buttonContainer }>
					<Button
						mode={ 'outlined'}
						style={ styles.button }
						onPress={ this.props.close }
					>
						CANCEL
					</Button>
				</View>
			</View>
		);
	}
}
