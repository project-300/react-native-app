import { Dimensions, StyleSheet } from 'react-native';
import { Styles } from './interfaces';

const { width } = Dimensions.get('window');

const styles: Styles = StyleSheet.create<Styles>({
	container: {
		flex: 1,
		backgroundColor: '#F5FCFF',
		alignItems: 'center',
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

	uiButton: {
		backgroundColor: 'white',
		height: 70,
		marginHorizontal: 20,
		borderRadius: 35,
		alignItems: 'center',
		justifyContent: 'center',
		marginVertical: 5,
		shadowOffset: {
			width: 2,
			height: 2
		},
		shadowColor: 'black',
		shadowOpacity: 0.2,
		elevation: 3
	},

	textInput: {
		height: 50,
		borderRadius: 25,
		borderWidth: 0.5,
		marginHorizontal: 20,
		paddingLeft: 20,
		marginVertical: 5,
		borderColor: 'rgba(0, 0, 0, 0.2)',
		backgroundColor: 'white'
	},

	closeButton: {
		height: 40,
		width: 40,
		backgroundColor: 'white',
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		top: -40,
		left: (width / 2) - 20,
		shadowOffset: {
			width: 2,
			height: 2
		},
		shadowColor: 'black',
		shadowOpacity: 0.2,
		elevation: 3
	}
});

export default styles;
