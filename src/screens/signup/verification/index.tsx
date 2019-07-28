import React, { Component } from 'react';
import {
	Text,
	View,
	Button,
	TextInput
} from 'react-native';
import { connect, MapStateToProps } from 'react-redux';
import { Auth } from 'aws-amplify';
import styles from './styles';
import { Props, State } from './interfaces';

class Verification extends Component<Props, State> {

	constructor(props: Props) {
		super(props);

		this.state = {
			username: props.navigation.getParam('username'),
			code: ''
		};
	}

	_signUp = async (): Promise<void> => {
		const { username, code } = this.state;
		const { navigate } = this.props.navigation;

		if (!code) return this.setState({ error: 'Verification Code is missing' });

		return Auth.confirmSignUp(
			username,
			code
		)
			.then(() => {
				navigate('Login')
			})
			.catch(err => this.setState({ error: err.message }));
	}

	render() {
		return (
			<View style={ styles.container }>
				<TextInput
					placeholder={ 'Verification Code' }
					onChangeText={ code => this.setState({ code } ) }
					style={ styles.input } />
				<Button
					onPress={ this._signUp }
					title={ 'Confirm' } />
				<Text
					style={ styles.error }>
					{ this.state.error }
				</Text>
			</View>
		);
	}
}

const mapStateToProps: MapStateToProps<{ }, { }, { }> = (state) => {
	return {
		state
	};
};

export default connect(mapStateToProps, { })(Verification);
