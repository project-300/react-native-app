import Animated from 'react-native-reanimated';

const { concat } = Animated;

export class AnimatedStyles {

	public static translateY = (translateY: Animated.Node<number> | number): any => ({ transform: [ { translateY } ] });

	public static translateX = (translateX: Animated.Node<number> | number): any => ({ transform: [ { translateX } ] });

	public static opacity = (opacity: Animated.Node<number> | number): any => ({ opacity });

	public static zIndex = (zIndex: Animated.Node<number> | number): any => ({ zIndex });

	public static rotate = (rotateDeg: Animated.Node<number> | number): any => ({ transform: [ { rotate: concat(rotateDeg, 'deg') } ] });

	public static height = (height: Animated.Node<number> | number): any => ({ height });

}
