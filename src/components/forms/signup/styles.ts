import { Dimensions, StyleSheet } from 'react-native';
import { Styles } from './interfaces';
import formStyles from '../../../styles/forms';
import { Colours, Theme } from '../../../constants/theme';

const { width } = Dimensions.get('window');

const styles: Styles = StyleSheet.create<Styles>({
	container: {
		width: width * 0.8,
		flexDirection: 'column',
		alignSelf: 'center'
	},

	text: {
		fontWeight: 'bold',
		fontSize: 16,
		textAlign: 'center',
		marginVertical: 40,
		marginHorizontal: 10
	},

	loginLink: {
		marginTop: 40,
		alignSelf: 'center',
		color: 'white',
		fontWeight: '500',
		fontSize: 16
	},

	showPasswordIconContainer: {
		position: 'absolute',
		right: 15,
		top: 16
	},

	showPasswordIcon: {
		color: Theme.accent,
		fontSize: 18
	},

	input: {
		padding: 16,
		borderWidth: 0.2,
		borderColor: '#BBB',
		backgroundColor: 'white',
		borderRadius: 4,
		marginBottom: 10
	},

	errorText: {
		color: Colours.white,
		textAlign: 'center'
	},

	errorTitle: {
		fontSize: 16,
		fontWeight: '600'
	},

	error: {
		alignItems: 'center',
		marginBottom: 20,
		marginTop: -20
	}
});

export default styles;
