import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View
} from 'react-native';
import { fakeAction } from '../actions';
import { connect, MapStateToProps } from 'react-redux';

interface Props { }
class Home extends Component<Props> {
	render() {
		return (
			<View style={ styles.container}>
				<Text style={ styles.text }>Home Screen</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF'
	},
	text: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10
	}
});

const mapStateToProps: MapStateToProps<{ }, { }, { }> = (state) => {
	return {
		state
	};
};

export default connect(mapStateToProps, { fakeAction })(Home);
