import React, { Component, ReactElement } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Props, State } from './interfaces';
import { AppState } from '../../../store';
import { UpdateUserFieldState } from '../../../types/redux-reducer-state-types';
import { updateUserField } from '../../../redux/actions/user/update-user-field';
import * as EmailValidator from 'email-validator';
import toastr from '../../../helpers/toastr';
import { EditTypes } from '../../../types/common';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';

class UpdateUserField extends Component<Props, State> {

	public constructor(props: Props) {
		super(props);

		const { getParam } = this.props.navigation;

		this.state = {
			type: getParam('type', ''),
			field: getParam('field', ''),
			value: getParam('value', '')
		};
	}

	public static navigationOptions = ({ navigation }: { navigation: NavigationScreenProp<NavigationState, NavigationParams> }): { } => ({
		title: navigation.getParam('type')
	})

	private _updateValue = async (): Promise<void> => {
		if (this.props.isUpdating || !this.state.value) return;

		const { value, type, field } = this.state;

		if (field === EditTypes.EMAIL) {
			const email = value.toLowerCase();
			if (!EmailValidator.validate(email)) return toastr.error('Invalid Email Address');
		}

		const res: boolean = await this.props.updateUserField(field, type, value);
		if (res) this.props.navigation.goBack();
	}

	public render(): ReactElement {
		return (
			<View style={ styles.container }>
				<TextInput
					value={ this.state.value }
					style={ styles.input }
					onChangeText={ (value: string): void => this.setState({ value })}
					autoFocus
				/>
				<TouchableOpacity
					onPress={ (): Promise<void> => this._updateValue() }
					style={ styles.button }
				>
					<Text style={ styles.buttonText }>
						Update { this.state.type }
					</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const mapStateToProps = (state: AppState): UpdateUserFieldState => ({
	...state.updateUserFieldReducer
});

export default connect(mapStateToProps, { updateUserField })(UpdateUserField);
