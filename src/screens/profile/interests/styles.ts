import { Dimensions, Platform, StyleSheet } from 'react-native';
import { Styles } from './interfaces';
import { Colours, Theme } from '../../../constants/theme';

const styles = StyleSheet.create<Styles>({
	container: {
		flex: 1
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
		position: 'absolute',
		bottom: Platform.OS === 'ios' ? 180 : 130,
		left: 0,
		right: 0,
		zIndex: 200,
		backgroundColor: 'white',
		borderTopWidth: 0.5,
		borderTopColor: Colours.lightGrey,
		paddingVertical: 10
	},

	button: {
		padding: 8
	},

	spinner: {
		marginTop: 30
	}
});

export default styles;
