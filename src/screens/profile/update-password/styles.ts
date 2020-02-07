import { StyleSheet } from 'react-native';
import { Styles } from './interfaces';
import { Theme } from '../../../constants/theme';

const styles: Styles = StyleSheet.create<Styles>({
	container: {
		alignItems: 'center'
	},

	inputContainer: {
		width: '90%',
		marginBottom: 20
	},

	showPasswordIconContainer: {
		position: 'absolute',
		alignItems: 'center',
		right: 11,
		top: 7,
		height: 56,
		width: 48,
		paddingTop: 20,
		marginRight: -10,
		borderTopRightRadius: 4,
		borderBottomRightRadius: 4
	},

	showPasswordIcon: {
		color: Theme.primary,
		fontSize: 18
	},

	buttonContainer: {
		width: '90%',
		marginBottom: 10
	},

	button: {
		padding: 8
	},

	spinner: {
		marginVertical: 10
	}
});

export default styles;
