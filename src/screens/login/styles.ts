import { Dimensions, Platform, StyleSheet } from 'react-native';
import { Styles } from './interfaces';
import { Colours } from '../../constants/theme';

const { width, height } = Dimensions.get('window');

console.log(height);

const formHeight: number = height >= 700 ? height / 2.5 : (height / 2.5) + 45;
let closeButtonPosition: number = height >= 700 ? -5 : -10;
closeButtonPosition = Platform.OS === 'ios' ? closeButtonPosition : closeButtonPosition - 16;

const styles: Styles = StyleSheet.create<Styles>({
	container: {
		flex: 1,
		backgroundColor: Colours.whiteGrey,
		justifyContent: 'flex-end'
	},

	heightThird: {
		// flex: 1,
		height: formHeight
	},

	closeButtonContainer: {
		position: 'absolute',
		top: 45,
		zIndex: 50
	},

	loginLink: {
		marginTop: 20,
		alignSelf: 'stretch',
		color: 'black',
		fontWeight: '500',
		fontSize: 15,
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
		top: closeButtonPosition,
		zIndex: 1000,
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
