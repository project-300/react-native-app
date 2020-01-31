import React, { Component, ReactElement } from 'react';
import { Provider as StoreProvider } from 'react-redux';
import CreateNavigator from './navigation';
import Amplify from 'aws-amplify';
import { isStoreLoggedIn } from './auth';
import { AWS_COGNITO_CONFIG } from '../environment/env';
import toastr from './helpers/toastr';
import { store } from './store';
import { DefaultTheme, Provider as PaperProvider, Theme as RNPTheme } from 'react-native-paper';
import { Theme } from './constants/theme';

Amplify.configure(AWS_COGNITO_CONFIG);

interface Props { }
interface State {
	loggedIn: boolean;
	checkedLoggedIn: boolean;
}

const theme: RNPTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		...Theme
	}
};

export default class App extends Component<Props, State> {

	public constructor(props: object) {
		super(props);

		this.state = {
			loggedIn: false,
			checkedLoggedIn: false
		};
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

		return (
			<StoreProvider store={ store }>
				<PaperProvider theme={ theme }>
					<Layout />
				</PaperProvider>
		  	</StoreProvider>
		);
	}

}
