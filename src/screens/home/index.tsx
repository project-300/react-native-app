import React, { Component } from 'react';
import {
	Text,
	ScrollView,
	Button
} from 'react-native';
import { connect, MapStateToProps } from 'react-redux';
import { storeLogout } from '../../auth';
import styles from './styles';
import { Props, State } from './interfaces';

class Index extends Component<Props, State> {

	constructor(props: Props) {
		super(props);
	}

	_logout = () => storeLogout().then(() => this.props.navigation.navigate('Login'));

	render() {
		return (
			<ScrollView style={ styles.container }>
				<Text
					style={ styles.text }>
					Home Screen
				</Text>
				<Button
					onPress={ this._logout }
					title={ 'Logout' } />
			</ScrollView>
		);
	}
}

const mapStateToProps: MapStateToProps<{ }, { }, { }> = (state) => {
	return {
		state
	};
};

export default connect(mapStateToProps, { })(Index);
