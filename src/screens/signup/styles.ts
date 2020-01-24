import { StyleSheet } from 'react-native';
import { Styles } from './interfaces';
import formStyles from '../../styles/forms';

const styles: Styles = StyleSheet.create<Styles>({
	container: {
		flex: 1,
		backgroundColor: '#F5FCFF',
		justifyContent: 'center',
		padding: 10
	},

	input: {
		backgroundColor: '#DDD',
		borderRadius: 4,
		marginBottom: 10,
		paddingVertical: 10,
		paddingHorizontal: 12,
		height: 47.5
	},

	button: {
		backgroundColor: '#194781',
		padding: 10,
		borderRadius: 4,
		width: '80%'
	},

	buttonText: {
		alignSelf: 'center',
		color: 'white',
		fontWeight: 'bold'
	},

	loginLink: {
		marginTop: 40,
		alignSelf: 'center',
		color: 'white',
		fontWeight: 'bold',
		fontSize: 16
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
