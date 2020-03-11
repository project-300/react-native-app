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
		marginTop: 20
	},

	modalImage: {
		width: width * 0.5,
		height: width * 0.5,
		borderRadius: width * 0.25,
		alignSelf: 'center'
	},

	ratingContainer: {
		backgroundColor: Colours.white,
		width: '100%',
		height: 160,
		marginBottom: 40,
		borderRadius: 4
	},

	ratingStarContainer: {
		flex: 1,
		flexDirection: 'row',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},

	ratingStar: {
		color: Colours.primary,
		fontSize: 40,
		marginHorizontal: 5
	}
});

export default modalStyles;
