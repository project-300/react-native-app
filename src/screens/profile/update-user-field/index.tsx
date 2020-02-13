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
			value: this.props.value
		};
	}

	private _updateValue = async (): Promise<void> => {
		if (this.props.isUpdating || !this.state.value) return;

		const { value } = this.state;
		const { type, field } = this.props;

		if (field === EditTypes.PHONE) {
			if (!new RegExp('08[35679]\\d{7}$').test(value)) return toastr.error('Phone number is not a valid Irish number');
		}

		const res: boolean = await this.props.updateUserField(field, type, value);

		if (res && field === EditTypes.EMAIL) console.log('Confirmation Required'); // To be done when auth flow is updated
		if (res) this.props.close();
	}

	public render(): ReactElement {
		return (
			<View style={ styles.container }>
				<ActivityIndicator
					animating={ this.props.isUpdating }
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
						disabled={ this.props.isUpdating || !this.state.value }
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
