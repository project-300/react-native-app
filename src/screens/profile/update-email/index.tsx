import React, { Component, ReactElement, RefObject } from 'react';
import {
	Text,
	TextInput,
	TouchableOpacity,
	View
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Props, State } from './interfaces';
import { AppState } from '../../../store';
import { UpdateEmailState } from '../../../types/redux-reducer-state-types';
import { updateEmail } from '../../../redux/actions/user/update-email';

class UpdateEmail extends Component<Props, State> {

	public constructor(props: Props) {
		super(props);

		this.state = {
			currentEmail: this.props.navigation.getParam('email', ''),
			newEmail: ''
		};
	}

	private _updateEmail = async (): Promise<void> => {
		if (this.props.isUpdating || !this.state.newEmail) return;

		const { newEmail } = this.state;
		const success = await this.props.updateEmail(newEmail);

		if (success) {
			this.setState({ currentEmail: newEmail });
			if (this._newEmailInput.current) this._newEmailInput.current.clear(); // Clear the TextInput
		}
	}

	// Create a reference to the email TextInput
	private _newEmailInput: RefObject<TextInput> = React.createRef();

	public render(): ReactElement {
		return (
			<View style={ styles.container }>
				<Text style={ styles.pushDown }>Current Email: <Text>{ this.state.currentEmail }</Text></Text>
				<TextInput
					placeholder={ 'New Email' }
					style={ styles.input }
					onChangeText={ (newEmail: string): void => this.setState({ newEmail })}
					ref={ this._newEmailInput }
				/>
				<TouchableOpacity
					onPress={ (): Promise<void> => this._updateEmail() }
					style={ styles.button }
				>
					<Text style={ styles.buttonText }>
						Update Email
					</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const mapStateToProps = (state: AppState): UpdateEmailState => ({
	...state.updateEmailReducer
});

export default connect(mapStateToProps, { updateEmail })(UpdateEmail);
