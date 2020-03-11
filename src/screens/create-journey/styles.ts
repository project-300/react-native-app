import { StyleSheet } from 'react-native';
import { Styles } from './interfaces';
import { Colours, Theme } from '../../constants/theme';

const styles: Styles = StyleSheet.create<Styles>({
	container: {
		flex: 1,
		backgroundColor: Colours.whiteGrey,
		alignItems: 'center'
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
		backgroundColor: Colours.whiteGrey,
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
		width: '100%',
		marginTop: 30
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
		marginTop: 20
	},

	placeItem: {
		marginVertical: 4,
		padding: 20,
		borderWidth: 0.5,
		borderColor: '#DDD',
		borderRadius: 2,
		backgroundColor: Colours.white
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
		backgroundColor: '#38A073'
	},

	buttonInvalid: {
		backgroundColor: 'grey'
	},

	locationNameHeader: {
		position: 'absolute',
		top: 0,
		width: '100%',
		elevation: 50,
		backgroundColor: Theme.accent,
		padding: 10,
		alignItems: 'center',
		zIndex: 100
	},

	confirmRow: {
		marginBottom: 20,
		fontSize: 16
	},

	bold: {
		fontWeight: '500'
	},

	stepsContainer: {
		flex: 1,
		flexDirection: 'column'
	},

	step: {
		shadowColor: Colours.black,
		shadowOffset: {
			width: 0,
			height: 0
		},
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 6,
		flex: 1,
		flexDirection: 'column',
		borderWidth: 0.5,
		borderColor: '#CCC',
		padding: 20,
		marginVertical: 16,
		backgroundColor: Colours.white,
		borderRadius: 2
	},

	valueRow: {
		flex: 1,
		flexDirection: 'row'
	},

	valueButton: {
		flex: 0.5
	},

	valueContent: {
		flex: 1,
		alignSelf: 'center',
		textAlign: 'center'
	},

	stepLabel: {
		position: 'absolute',
		top: -10,
		left: 10,
		backgroundColor: 'white',
		color: Theme.accent,
		fontSize: 16
	},

	confirmContainer: {
		flex: 1,
		flexDirection: 'column',
		borderWidth: 0.5,
		borderColor: '#CCC',
		padding: 20,
		marginVertical: 16,
		backgroundColor: Colours.white,
		borderRadius: 2,
		shadowColor: Colours.black,
		shadowOffset: {
			width: 0,
			height: 0
		},
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 6
	},

	mapButton: {
		width: '100%'
	}
});

export default styles;
