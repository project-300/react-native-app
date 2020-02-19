import React, { Component, ReactElement } from 'react';
import { Provider as StoreProvider } from 'react-redux';
import CreateNavigator from './navigation';
import Amplify from 'aws-amplify';
import { isStoreLoggedIn } from './auth';
import { AWS_CONFIG } from '../environment/env';
import toastr from './helpers/toastr';
import { store } from './store';
import { DefaultTheme, Provider as PaperProvider, Theme as RNPTheme } from 'react-native-paper';
import { Theme, DarkTheme } from './constants/theme';
import { setDarkMode } from './redux/actions';

Amplify.configure(AWS_CONFIG);

interface Props { }
interface State {
	loggedIn: boolean;
	checkedLoggedIn: boolean;
	isDarkMode: boolean;
}

export default class App extends Component<Props, State> {

	public constructor(props: object) {
		super(props);

		this.state = {
			loggedIn: false,
			checkedLoggedIn: false,
			isDarkMode: false
		};

		store.dispatch(setDarkMode());
	}

	public async componentDidMount(): Promise<void> {
		try {
			const loggedIn = await isStoreLoggedIn();
			this.setState({ loggedIn, checkedLoggedIn: true });
		} catch (err) {
			toastr.error('Unable to authenticate');
		}
	}

	public render(): ReactElement | null {
		const { checkedLoggedIn, loggedIn } = this.state;

		if (!checkedLoggedIn) return null; // Replace with Splash Screen

		const Layout = CreateNavigator(loggedIn);

		const theme: RNPTheme = {
			...DefaultTheme,
			colors: store.getState().darkModeReducer.DARK_MODE ? {
				...DefaultTheme.colors,
				...DarkTheme
			} : {
				...DefaultTheme.colors,
				...Theme
			}
		};

		return (
			<StoreProvider store={ store }>
				<PaperProvider theme={ theme }>
					<Layout />
				</PaperProvider>
		  	</StoreProvider>
		);
	}

}
