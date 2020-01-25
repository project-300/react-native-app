import Toast from 'react-native-root-toast';
import { Dimensions, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

type ToastTypeProps = {
	backgroundColor?: string;
	textColor?: string;
};

const success = (message: string): void => {
	showToast(message, {
		backgroundColor: '#009E00',
		textColor: 'white'
	});
};

const error = (error: string): void => {
	showToast(error, {
		backgroundColor: '#FF0000',
		textColor: 'white'
	});
};

const warning = (warning: string): void => {
	showToast(warning, {
		backgroundColor: '#FF960D',
		textColor: 'white'
	});
};

const info = (warning: string): void => {
	showToast(warning, { });
};

const { width } = Dimensions.get('window');

const showToast = (message: string, properties: ToastTypeProps): void => {
	const paddingTop = Platform.OS === 'ios' ? getStatusBarHeight() + 10 : 20; // Avoid iOS status bar & notch

	Toast.show(message, {
		...properties,
		duration: Toast.durations.LONG,
		position: Toast.positions.TOP,
		shadow: true,
		animation: true,
		hideOnPress: true,
		delay: 0,
		opacity: 1,
		containerStyle: {
			width, // Make it full width
			borderRadius: 0, // Remove default rounded edges
			padding: 20,
			paddingTop,
			marginTop: -21 // Remove default 20 pixels. Also removes extra 1 pixel sometimes displayed on Android
		},
		textStyle: {
			fontWeight: 'bold'
		}
	});
};

const toastr = {
	success,
	error,
	warning,
	info
};

export default toastr;
