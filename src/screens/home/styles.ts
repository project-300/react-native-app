import { StyleSheet } from 'react-native';
import { Styles } from './interfaces';

const styles: Styles = StyleSheet.create<Styles>({
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

	logoutButton: {
		position: 'absolute',
		bottom: 0,
		width: '100%',
		elevation: 20,
		backgroundColor: 'red',
		padding: 20,
		alignItems: 'center'
	},

	logoutButtonText: {
		fontWeight: 'bold',
		fontSize: 16,
		color: 'white'
	}
});

export default styles;
