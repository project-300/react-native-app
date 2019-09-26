import { StyleSheet } from 'react-native';
import { Styles } from './interfaces';

const styles = StyleSheet.create<Styles>({
	container: {
		flex: 1,
		backgroundColor: '#F5FCFF',
		alignItems: 'center',
		paddingTop: 20
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
		marginTop: 20
	},

	userTypeTag: {
		backgroundColor: 'red',
		width: 100,
		alignSelf: 'center',
		borderRadius: 8,
		marginTop: -20,
		marginBottom: 20,
		padding: 2
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

	email: {
		alignSelf: 'center',
		fontSize: 20,
		fontWeight: 'bold',
		marginTop: 10
	},

	editButton: {
		color: '#999',
		fontSize: 18
	},

	updatePassword: {
		alignSelf: 'center',
		marginTop: 20,
		fontWeight: 'bold'
	}
});

export default styles;
