import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../src/reducers';
import CreateNavigator from './navigation';
import Amplify from 'aws-amplify';
import { isStoreLoggedIn } from './auth';
import { AWS_CONFIG } from '../environment/env';
import toastr from './helpers/toastr';

Amplify.configure(AWS_CONFIG);

const store = applyMiddleware(thunk)(createStore)(reducers);

interface AppProps { }
interface AppState {
	loggedIn: boolean;
	checkedLoggedIn: boolean;
}

export default class App extends Component<AppProps, AppState> {

	constructor(props: object) {
		super(props);

		this.state = {
			loggedIn: false,
			checkedLoggedIn: false
		};
	}

	async componentDidMount() {
		try {
			const loggedIn = await isStoreLoggedIn();
			this.setState({ loggedIn, checkedLoggedIn: true });
		} catch (err) {
			toastr.error('Unable to authenticate');
		}
	}

	render() {
		const { checkedLoggedIn, loggedIn } = this.state;

		if (!checkedLoggedIn) return null; // Replace with Splash Screen

		const Layout = CreateNavigator(loggedIn);

		return (
			<Provider store={ store }>
				<Layout />
		  	</Provider>
		);
	}

}
