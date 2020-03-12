import { Dimensions, StyleSheet } from 'react-native';
import { Styles } from './interfaces';
import Animated from 'react-native-reanimated';
import { Colours } from '../../constants/theme';

const { width } = Dimensions.get('window');

const styles: Styles = StyleSheet.create<Styles>({
	container: {
		flex: 1,
		backgroundColor: Colours.black,
		justifyContent: 'center',
		padding: 10,
		paddingBottom: 20
	},

	input: {
		backgroundColor: '#DDD',
		borderRadius: 4,
		marginBottom: 10,
		paddingVertical: 10,
		paddingHorizontal: 12,
		height: 47.5
	},

	button: {
		backgroundColor: '#194781',
		padding: 10,
		borderRadius: 4,
		width: '80%'
	},

	buttonText: {
		alignSelf: 'center',
		color: 'white',
		fontWeight: 'bold'
	},

	logo: {
		alignSelf: 'center',
		width: width * 0.9
	}
});

export default styles;

export const imageStyle = (opacity: Animated.Node<number>): any => ({
	marginBottom: 40,
	width,
	alignSelf: 'center',
	opacity
});
