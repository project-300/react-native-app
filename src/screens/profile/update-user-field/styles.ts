import { StyleSheet } from 'react-native';
import { Styles } from './interfaces';

const styles = StyleSheet.create<Styles>({
	container: {
		alignItems: 'center'
	},

	input: {
		width: '90%',
		marginBottom: 20
	},

	buttonContainer: {
		width: '90%',
		marginBottom: 10
	},

	spinner: {
		marginVertical: 10
	}
});

export default styles;
