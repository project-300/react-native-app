import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface FormStyles {
	largeButton: ViewStyle;
	buttonText: TextStyle;
	input: ViewStyle;
}

const formStyles: FormStyles = StyleSheet.create<FormStyles>({
	largeButton: {
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

	buttonText: {
		fontSize: 20,
		fontWeight: 'bold'
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
	}
});

export default formStyles;
