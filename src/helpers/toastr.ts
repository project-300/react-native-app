import Toast from 'react-native-root-toast';

type ToastTypeProps = {
	backgroundColor?: string,
	textColor?: string
};

const success = (message: string) => {
	showToast(message, {
		backgroundColor: '#009E00',
		textColor: 'white'
	});
};

const error = (error: string) => {
	showToast(error, {
		backgroundColor: '#FF0000',
		textColor: 'white'
	});
};

const warning = (warning: string) => {
	showToast(warning, {
		backgroundColor: '#FF960D',
		textColor: 'white'
	});
};

const info = (warning: string) => {
	showToast(warning, { });
};

const showToast = (message: string, properties: ToastTypeProps) => {
	Toast.show(message, {
		...properties,
		duration: Toast.durations.LONG,
		position: Toast.positions.BOTTOM,
		shadow: true,
		animation: true,
		hideOnPress: true,
		delay: 0
	});
};

const toastr = {
	success,
	error,
	warning,
	info
};

export default toastr;
