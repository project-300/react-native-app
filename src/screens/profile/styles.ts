import { StyleSheet } from 'react-native';
import { Styles } from './interfaces';

const styles = StyleSheet.create<Styles>({
	container: {
		backgroundColor: '#FFF'
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
	},

	profileImageContainer: {
		alignSelf: 'center',
		marginTop: 20,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 4
		},
		shadowOpacity: 0.3,
		shadowRadius: 4.65,
		elevation: 8
	},

	editIconContainer: {
		position: 'absolute',
		right: 10,
		top: 10,
		backgroundColor: 'grey',
		padding: 10,
		borderRadius: 20,
		elevation: 10
	},

	userTypeTag: {
		backgroundColor: 'red',
		width: 100,
		alignSelf: 'center',
		borderRadius: 8,
		marginTop: -20,
		marginBottom: 20,
		padding: 2,
		elevation: 10
	},

	userTypeTagText: {
		alignSelf: 'center',
		color: 'white',
		fontWeight: 'bold'
	},

	username: {
		alignSelf: 'center',
		fontSize: 24,
		fontWeight: 'bold'
	},

	editRowFirstItem: {
		borderTopWidth: 0.5,
		marginTop: 40
	},

	editRow: {
		borderBottomWidth: 0.5,
		padding: 20
	},

	label: {
		fontWeight: 'bold',
		color: 'black'
	},

	editText: {
		fontSize: 16
	}
});

export default styles;
