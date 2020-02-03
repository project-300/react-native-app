import { StyleSheet } from 'react-native';
import { Styles } from './interfaces';

const styles = StyleSheet.create<Styles>({
	container: {
	},

	input: {
		width: '90%',
		marginBottom: 20,
		marginTop: 60
	},

	buttonContainer: {
		width: '90%',
		marginBottom: 10
	},

	button: {
		padding: 8
	}
});

export default styles;
