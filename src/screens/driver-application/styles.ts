import { StyleSheet } from 'react-native';
import { Styles } from './interfaces';

const styles: Styles = StyleSheet.create<Styles>({
	container: {
		flex: 6,
		backgroundColor: '#F5FCFF',
		alignItems: 'center'
	},
	listItem: {
		width: '80%',
		margin: 20
		},
	errText: {
		color: 'red',
		textAlign: 'center',
		alignSelf: 'stretch'
	},
	formView: {
		width: '100%',
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
		marginTop: 20
	},

	buttonText: {
		alignSelf: 'stretch',
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center'
	}
});

export default styles;
