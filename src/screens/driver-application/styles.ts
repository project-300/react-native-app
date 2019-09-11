import { StyleSheet } from 'react-native';
import { Styles } from './interfaces';

const styles = StyleSheet.create<Styles>({
	container: {
		flex: 1,
		backgroundColor: '#F5FCFF',
		alignItems: 'center'
	},

	text: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10
	},

	button: {
		backgroundColor: '#02b2cc',
		padding: 10,
		borderRadius: 4,
		width: '80%',
	},

	buttonText: {
		alignSelf: 'center',
		color: 'white',
		fontWeight: 'bold'
	}
});

export default styles;
