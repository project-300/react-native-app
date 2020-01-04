import Toast from 'react-native-root-toast';

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

const showToast = (message: string, properties: ToastTypeProps): void => {
	Toast.show(message, {
		...properties,
		duration: Toast.durations.LONG,
		position: Toast.positions.BOTTOM,
		shadow: true,
		animation: true,
		hideOnPress: true,
		delay: 0,
		opacity: 1
	});
};

const toastr = {
	success,
	error,
	warning,
	info
};

export default toastr;
