import React, { Component } from 'react';
import {
	Text,
	ScrollView,
	Button
} from 'react-native';
import { fakeAction } from '../../actions';
import { connect, MapStateToProps } from 'react-redux';
import { signOut } from '../../auth';
import styles from './styles';
import { Props, State } from './interfaces';

class Index extends Component<Props, State> {

	constructor(props: Props) {
		super(props);
	}

	render() {
		const { navigate } = this.props.navigation;

		return (
			<ScrollView style={ styles.container }>
				<Text
					style={ styles.text }>
					Home Screen
				</Text>
				<Button onPress={
					() => {
						signOut()
							.then(() => navigate('Login'));
					}
				} title={ 'Logout' } />
			</ScrollView>
		);
	}
}

const mapStateToProps: MapStateToProps<{ }, { }, { }> = (state) => {
	return {
		state
	};
};

export default connect(mapStateToProps, { fakeAction })(Index);
