import { StyleSheet } from 'react-native';
import { Styles } from './interfaces';

const styles: Styles = StyleSheet.create<Styles>({
	container: {
		flex: 1,
		backgroundColor: '#F5FCFF',
		alignItems: 'center',
		paddingTop: 20
	},

	mapWrap: {
		flex: 1
	},

	map: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		flex: 1
	},

	header: {
		paddingBottom: 5
	},

	icon: {
		height: 30,
		width: 30
	},

	showForm: {
		position: 'absolute',
		height: 30,
		bottom: 0
	},

	form: {
		backgroundColor: '#FFFFFF',
		position: 'absolute',
		padding: 20,
		flex: 0.9,
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: 1,

		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 10,
		},
		shadowOpacity: 0.18,
		shadowRadius: 16,
		elevation: 24
	},

	input: {
		borderRadius: 7,
		backgroundColor: '#FFFFFF',
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 5
	},

	text: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10
	},

	button: {
		backgroundColor: '#02b2cc',
		padding: 10,
		marginBottom: 10,
		borderRadius: 4,
		width: '80%'
	},

	buttonText: {
		alignSelf: 'center',
		color: 'white',
		fontWeight: 'bold'
	}
});

export default styles;

