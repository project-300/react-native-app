import { Dimensions, StyleSheet } from 'react-native';
import { Styles } from './interfaces';
import Animated from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');
const { concat } = Animated;

const styles: Styles = StyleSheet.create<Styles>({
	container: {
		flex: 1,
		backgroundColor: 'white',
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

	closeButton: {
		height: 40,
		width: 40,
		backgroundColor: 'white',
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		top: -40,
		left: (width / 2) - 20,
		shadowOffset: {
			width: 2,
			height: 2
		},
		shadowColor: 'black',
		shadowOpacity: 0.2,
		elevation: 3
	},

	formContainer: {
	}
});

export default styles;

// tslint:disable-next-line:no-any
export const animatedViewStyle = (opacity: Animated.Node<number>, translateY: Animated.Node<number>): any => ({
	transform: [ { translateY } ],
	opacity
});

// tslint:disable-next-line:no-any
export const animatedOpacityStyle = (opacity: Animated.Node<number>): any => ({
	opacity
});

// tslint:disable-next-line:no-any
export const formContainerStyle = (zIndex: Animated.Node<number>): any => ({
	top: null,
	justifyContent: 'center',
	zIndex
});

// tslint:disable-next-line:no-any
export const animatedSpinTextStyle = (rotateDeg: Animated.Node<number>): any => ({
	fontSize: 15,
	transform: [
		{
			rotate: concat(rotateDeg, 'deg')
		}
	]
});
