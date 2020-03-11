import { Dimensions, StyleSheet } from 'react-native';
import { Styles } from './interfaces';
import Animated from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const styles: Styles = StyleSheet.create<Styles>({
	container: {
		flex: 1,
		backgroundColor: '#F5FCFF',
		justifyContent: 'center',
		padding: 10
	},

	loginLink: {
		marginTop: 40,
		alignSelf: 'stretch',
		color: 'black',
		fontWeight: 'bold',
		fontSize: 16,
		textAlign: 'center'
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
		width
	}
});

export default styles;

export const imageStyle = (opacity: Animated.Node<number>): any => ({
	marginBottom: 40,
	width,
	alignSelf: 'center',
	opacity
});
