import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore} from 'redux';
import reducers from '../src/reducers';
import CreateNavigator from './navigation';
import Amplify from 'aws-amplify';
import awsConfig from './aws/config';
import { isSignedIn } from './auth';

Amplify.configure(awsConfig);

const store = createStore(reducers);

interface AppProps { }
interface AppState {
	signedIn: boolean;
	checkedSignIn: boolean;
}

export default class App extends Component<AppProps, AppState> {

	constructor(props: object) {
		super(props);

		this.state = {
			signedIn: false,
			checkedSignIn: false
		};
	}

	componentDidMount() {
		isSignedIn()
			.then((res: boolean) => this.setState({ signedIn: res, checkedSignIn: true }))
			.catch((err: object) => console.log(err));
	}

	render() {
		const { checkedSignIn, signedIn } = this.state;

		if (!checkedSignIn) return null; // Replace with Splash Screen

		const Layout = CreateNavigator(signedIn);

		return (
			<Provider store={ store }>
				<Layout />
		  	</Provider>
		);
	}

}
