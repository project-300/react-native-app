import { StyleSheet } from 'react-native';
import { Styles } from './interfaces';

const styles = StyleSheet.create<Styles>({
	container: {
		flex: 1,
		backgroundColor: '#F5FCFF',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10
	},

	input: {
		width: '80%',
		backgroundColor: '#DDD',
		borderRadius: 4,
		marginBottom: 10,
		paddingVertical: 10,
		paddingHorizontal: 12
	},

	button: {
		backgroundColor: '#02b2cc',
		padding: 10,
		borderRadius: 4,
		width: '80%'
	},

	buttonText: {
		alignSelf: 'center',
		color: 'white',
		fontWeight: 'bold'
	},

	error: {
		color: '#FF0000'
	},

	underline: {
		textDecorationLine: 'underline'
	}
});

export default styles;
