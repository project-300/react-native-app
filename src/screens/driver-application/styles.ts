import { StyleSheet } from 'react-native';
import { Styles } from './interfaces';

const styles: Styles = StyleSheet.create<Styles>({
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
		backgroundColor: '#194781',
		padding: 10,
		borderRadius: 4,
		width: '80%',
		alignItems: 'center'
	},

	buttonText: {
		alignSelf: 'stretch',
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center'
	}
});

export default styles;
