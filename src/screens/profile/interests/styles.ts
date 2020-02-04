import { StyleSheet } from 'react-native';
import { Styles } from './interfaces';
import { Colours } from '../../../constants/theme';

const styles = StyleSheet.create<Styles>({
	container: {
	},

	input: {
		width: '90%',
		marginBottom: 20,
		marginTop: 60
	},

	buttonContainer: {
		width: '90%',
		marginBottom: 10
	},

	buttonsContainer: {
		alignItems: 'center',
		marginTop: 20,
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		zIndex: 2,
		backgroundColor: 'white',
		borderTopWidth: 0.2,
		borderTopColor: Colours.lightGrey,
		paddingVertical: 10,
		shadowColor: Colours.black,
		shadowOffset: {
			width: 0,
			height: -4
		},
		shadowOpacity: 0.2,
		shadowRadius: 6,
		elevation: 12
	},

	button: {
		padding: 8
	}
});

export default styles;
