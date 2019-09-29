import { StyleSheet } from 'react-native';
import { Styles } from './interfaces';

const styles: Styles = StyleSheet.create<Styles>({
	container: {
		flex: 1,
		backgroundColor: '#F5FCFF'
	},

	text: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10
	},

	applicationRow: {
		margin: 4,
		padding: 10,
		backgroundColor: '#ffedcc'
	},

	title: {
		fontWeight: 'bold',
		fontSize: 18,
		alignSelf: 'center',
		marginBottom: 10
	},

	button: {
		marginTop: 10,
		backgroundColor: '#02b2cc',
		padding: 10,
		borderRadius: 4
	},

	buttonText: {
		alignSelf: 'center',
		color: 'white',
		fontWeight: 'bold'
	}
});

export default styles;
