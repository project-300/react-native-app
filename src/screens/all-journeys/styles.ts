import { StyleSheet } from 'react-native';
import { Styles } from './interfaces';

const styles: Styles = StyleSheet.create<Styles>({
	container: {
		flex: 1
	},

	button: {
		backgroundColor: '#194781',
		padding: 10,
		borderRadius: 4,
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
	},

	bold: {
		fontWeight: 'bold'
	},

	cardHeader: {
		justifyContent: 'center'
	},

	journeyHeading: {
		fontSize: 16
	},

	textRow: {
		marginBottom: 10
	}
});

export default styles;
