import { StyleSheet } from 'react-native';
import { Styles } from './interfaces';

const styles: Styles = StyleSheet.create<Styles>({
	container: {
		flex: 1,
		backgroundColor: '#F5FCFF'
	},

	button: {
		backgroundColor: '#02b2cc',
		padding: 10,
		borderRadius: 4,
		marginTop: 10,
		width: '100%'
	},

	buttonText: {
		alignSelf: 'center',
		color: 'white',
		fontWeight: 'bold'
	},

	applicationRow: {
		margin: 4,
		padding: 10,
		backgroundColor: '#ffedcc'
	},

	centerText: {
		alignSelf: 'center',
		fontWeight: 'bold',
		padding: 20
	}
});

export default styles;
