import { StyleSheet } from 'react-native';
import { Styles } from './interfaces';

const styles: Styles = StyleSheet.create<Styles>({
	container: {
		flex: 1,
		backgroundColor: '#F5FCFF',
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: 20
	},

	inputContainer: {
		width: '80%'
	},

	input: {
		backgroundColor: '#DDD',
		borderRadius: 4,
		marginBottom: 10,
		paddingVertical: 10,
		paddingHorizontal: 12
	},

	showPasswordIconContainer: {
		position: 'absolute',
		alignItems: 'center',
		right: 10,
		top: 0,
		height: 47.5,
		width: 40,
		paddingTop: 16,
		marginRight: -10,
		borderTopRightRadius: 4,
		borderBottomRightRadius: 4,
		backgroundColor: '#CCC'
	},

	showPasswordIcon: {
		color: 'black',
		fontSize: 18
	},

	text: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10
	},

	pushDown: {
		marginBottom: 20
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
	}
});

export default styles;
