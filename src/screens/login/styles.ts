import { Dimensions, StyleSheet } from 'react-native';
import { Styles } from './interfaces';
import { Colours } from '../../constants/theme';

const { width, height } = Dimensions.get('window');

const styles: Styles = StyleSheet.create<Styles>({
	container: {
		flex: 1,
		backgroundColor: Colours.whiteGrey,
		justifyContent: 'flex-end'
	},

	heightThird: {
		height: height / 3
	},

	closeButtonContainer: {
		position: 'relative',
		top: -15,
		zIndex: 50
	},

	loginLink: {
		marginTop: 40,
		alignSelf: 'stretch',
		color: 'black',
		fontWeight: 'bold',
		fontSize: 16,
		textAlign: 'center'
	},

	closeButton: {
		height: 40,
		width: 40,
		backgroundColor: 'white',
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		top: -50,
		left: (width / 2) - 20,
		shadowOffset: {
			width: 2,
			height: 2
		},
		shadowColor: 'black',
		shadowOpacity: 0.2,
		elevation: 3
	},

	bottomForm: {
		top: undefined,
		justifyContent: 'center'
	},

	logo: {
		alignSelf: 'center',
		width: width * 0.9,
		zIndex: 1000
	}
});

export default styles;
