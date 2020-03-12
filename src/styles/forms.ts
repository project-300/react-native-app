import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Theme } from '../constants/theme';

interface FormStyles {
	largeButton: ViewStyle;
	buttonText: TextStyle;
	input: ViewStyle;
	button: ViewStyle;
}

const formStyles: FormStyles = StyleSheet.create<FormStyles>({
	largeButton: {
		backgroundColor: 'white',
		height: 56,
		marginHorizontal: 20,
		borderRadius: 4,
		alignItems: 'center',
		justifyContent: 'center',
		marginVertical: 10,
		shadowOffset: {
			width: 2,
			height: 2
		},
		shadowColor: 'black',
		shadowOpacity: 0.2,
		elevation: 3
	},

	buttonText: {
		fontSize: 16,
		fontWeight: '500',
		alignSelf: 'stretch',
		textAlign: 'center',
		color: Theme.accent
	},

	input: {
		height: 50,
		borderRadius: 25,
		borderWidth: 0.5,
		marginHorizontal: 20,
		paddingLeft: 20,
		marginVertical: 5,
		borderColor: 'rgba(0, 0, 0, 0.2)',
		backgroundColor: 'white'
	},

	button: {
		padding: 8
	}
});

export default formStyles;
