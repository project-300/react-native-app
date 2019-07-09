import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore} from 'redux';
import reducers from '../src/reducers';
import Home from './screens/home';

const store = createStore(reducers);

interface Props { }
export default class App extends Component<Props> {
	render() {
		return (
			<Provider store={ store }>
				<Home />
		  	</Provider>
		);
	}
}
