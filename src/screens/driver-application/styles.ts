import { StyleSheet } from 'react-native';
import { Styles } from './interfaces';
import { Colours } from '../../constants/theme';

const styles: Styles = StyleSheet.create<Styles>({
	container: {
		flex: 1,
		alignItems: 'center',
		flexDirection: 'row',
		backgroundColor: Colours.whiteGrey,
		padding: 20
	},

	listItem: {
		// width: '80%',
		// margin: 20
		marginVertical: 20,
		paddingHorizontal: 10
	},

	errText: {
		color: 'red',
		textAlign: 'center',
		alignSelf: 'stretch'
	},

	formView: {
		flex: 1,
		backgroundColor: 'white',
		padding: 20,
		shadowColor: Colours.black,
		shadowOffset: {
			width: 0,
			height: 0
		},
		shadowOpacity: 0.2,
		shadowRadius: 6,
		borderRadius: 2
	},

	text: {
		fontSize: 16,
		color: Colours.darkGrey
	},

	button: {
		backgroundColor: '#194781',
		padding: 10,
		borderRadius: 4,
		width: '80%',
		marginTop: 20
	},

	buttonText: {
		alignSelf: 'stretch',
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center'
	},

	spinner: {
		alignSelf: 'center',
		flex: 1
	}
});

export default styles;
