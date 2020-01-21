import { StyleSheet } from 'react-native';
import { Styles } from './interfaces';

const styles: Styles = StyleSheet.create<Styles>({
	container: {
		flex: 1,
		backgroundColor: '#F5FCFF'
	},

	title: {
		fontSize: 40,
		fontWeight: 'bold',
		textAlign: 'center',
		marginVertical: 40,
		color: 'black'
	},

	button: {
		backgroundColor: '#194781',
		paddingVertical: 30,
		marginBottom: 40,
		borderRadius: 2,
		width: '100%'
	},

	buttonText: {
		alignSelf: 'center',
		color: 'white',
		fontWeight: 'bold',
		fontSize: 20
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
	},

	image: {
		alignSelf: 'center',
		marginTop: 20
	}
});

export default styles;
