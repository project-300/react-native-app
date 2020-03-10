import { Dimensions, ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Colours } from '../constants/theme';

const { width } = Dimensions.get('window');

interface ModalStyles {
	modalContent: ViewStyle;
	modalText: TextStyle;
	modalCancelButton: ViewStyle;
	modalImage: ImageStyle;
}

const modalStyles: ModalStyles = StyleSheet.create<ModalStyles>({
	modalContent: {
		justifyContent: 'center',
		alignSelf: 'center',
		width: width * 0.8
	},

	modalText: {
		fontSize: 16,
		color: Colours.white,
		marginVertical: 20,
		textAlign: 'center',
		fontWeight: '500'
	},

	modalCancelButton: {
		backgroundColor: 'white',
		marginTop: 10
	},

	modalImage: {
		width: width * 0.5,
		height: width * 0.5,
		borderRadius: width * 0.25,
		alignSelf: 'center'
	}
});

export default modalStyles;
