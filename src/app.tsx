import React, { Component, ReactElement } from 'react';
import { Provider as StoreProvider } from 'react-redux';
import CreateNavigator from './navigation';
import Amplify, { Auth } from 'aws-amplify';
import { isStoreLoggedIn, userType } from './auth';
import { AWS_CONFIG } from '../environment/env';
import toastr from './helpers/toastr';
import { store } from './store';
import { DefaultTheme, Provider as PaperProvider, Theme as RNPTheme } from 'react-native-paper';
import { Theme, DarkTheme as Test } from './constants/theme';
import { getChats, setDarkMode, getCurrentJourney } from './redux/actions';
import WS from './api/websocket';
import { v4 as uuid } from 'uuid';
import { AsyncStorage } from 'react-native';
import ModalLayer from './components/modals/app-modals';
import LocationTracker from './components/tracking/tracking';

Amplify.configure(AWS_CONFIG);

interface Props { }
interface State {
	loggedIn: boolean;
	checkedLoggedIn: boolean;
	isDarkMode: boolean;
	totalUnreadCount: number;
	userType: string;
}

/*
	Used for identifying what device a user is making API / websocket calls from.
	It will improve websocket subscription handling on the backend.
	This will allow the user to use more than 1 device at the same time
*/
export const setDeviceId = async (): Promise<void> => {
	const currentDeviceId = await deviceId();
	if (!currentDeviceId) await AsyncStorage.setItem('Device-ID', uuid());
};

export const deviceId = async (): Promise<string | null> => AsyncStorage.getItem('Device-ID');

export const clearDeviceId = async (): Promise<void> => AsyncStorage.removeItem('Device-ID')

export default class App extends Component<Props, State> {

	public constructor(props: object) {
		super(props);

		this.state = {
			loggedIn: false,
			checkedLoggedIn: false,
			isDarkMode: false,
			totalUnreadCount: 0,
			userType: 'Passenger'
		};

		store.dispatch(setDarkMode());
	}

	public async componentDidMount(): Promise<void> {
		try {
			const loggedIn = await isStoreLoggedIn();
			this.setState({ loggedIn, checkedLoggedIn: true });

			await setDeviceId();

			const uType: string | null = await userType();
			if (uType) this.setState({ userType: uType });

			WS._setup();

			if (loggedIn) {
				store.dispatch(getCurrentJourney(true));
				store.dispatch(getChats());
			}
		} catch (err) {
			toastr.error('Unable to authenticate');
		}
	}

	public render(): ReactElement | null {
		const { checkedLoggedIn, loggedIn, userType } = this.state;

		if (!checkedLoggedIn) return null; // Replace with Splash Screen

		const Layout = CreateNavigator(loggedIn, userType === 'Driver'); // Update to pass in user type every time

		const theme: RNPTheme = {
			...DefaultTheme,
			colors: store.getState().darkModeReducer.DARK_MODE ? {
				...DefaultTheme.colors,
				...Test
			} : {
				...DefaultTheme.colors,
				...Theme
			}
		};

		return (
			<StoreProvider store={ store }>
				<PaperProvider theme={ theme }>
					<Layout />
					<ModalLayer />
					<LocationTracker />
				</PaperProvider>
			</StoreProvider>
		);
	}

}
