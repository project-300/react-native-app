import { StyleSheet } from 'react-native';
import { Styles } from './interfaces';
import formStyles from '../../../styles/forms';

const styles: Styles = StyleSheet.create<Styles>({
	container: {
		flex: 1,
		justifyContent: 'center'
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
		alignSelf: 'stretch',
		color: 'white',
		fontWeight: 'bold',
		fontSize: 16,
		textAlign: 'center'
	},

	showPasswordIconContainer: {
		position: 'absolute',
		alignItems: 'center',
		right: 0,
		top: 0,
		height: formStyles.input.height,
		marginVertical: formStyles.input.marginVertical || 0,
		marginHorizontal: formStyles.input.marginHorizontal || 0,
		width: 50,
		paddingTop: 16,
		borderTopRightRadius: formStyles.input.borderRadius,
		borderBottomRightRadius: formStyles.input.borderRadius,
		backgroundColor: '#CCC'
	},

	showPasswordIcon: {
		color: 'black',
		fontSize: 18
	}
});

export default styles;
