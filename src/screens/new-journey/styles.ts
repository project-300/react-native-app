import { StyleSheet } from 'react-native';
import { Styles } from './interfaces';

const styles: Styles = StyleSheet.create<Styles>({
	container: {
		flex: 1,
		backgroundColor: '#F5FCFF',
		alignItems: 'center',
		paddingTop: 20
	},

	mapWrap: {
		flex: 1
	},

	map: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		flex: 1
	},

	icon: {
		height: 30,
		width: 30
	},

	showForm: {
		position: 'absolute',
		height: 30,
		bottom: 0
	},

	form: {
		backgroundColor: '#FFFFFF',
		position: 'absolute',
		padding: 20,
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: 1,
		flex: 1,

		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 10
		},
		shadowOpacity: 0.18,
		shadowRadius: 16,
		elevation: 24
	},

	input: {
		borderRadius: 7,
		backgroundColor: '#FFFFFF',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 5
	},

	text: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10
	},

	button: {
		backgroundColor: '#02b2cc',
		padding: 10,
		marginBottom: 10,
		borderRadius: 4,
		width: '80%'
	},

	buttonText: {
		alignSelf: 'center',
		color: 'white',
		fontWeight: 'bold'
	},

	divider: {
		height: 0.5,
		width: '100%',
		borderWidth: 0.5,
		borderColor: '#CCC',
		marginVertical: 20
	},

	placesList: {
		marginTop: 20,
		marginLeft: 5
	},

	placeItem: {
		marginVertical: 10
	},

	continueButton: {
		position: 'absolute',
		bottom: 0,
		width: '100%',
		elevation: 50,
		backgroundColor: 'green',
		padding: 20,
		alignItems: 'center',
		zIndex: 100
	},

	buttonValid: {
		backgroundColor: 'green'
	},

	buttonInvalid: {
		backgroundColor: 'grey'
	},

	locationNameHeader: {
		position: 'absolute',
		top: 0,
		width: '100%',
		elevation: 50,
		backgroundColor: '#555',
		padding: 10,
		alignItems: 'center',
		zIndex: 100
	}
});

export default styles;


