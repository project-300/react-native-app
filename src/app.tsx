import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore} from 'redux';
import reducers from '../src/reducers';
import Navigation from './navigation'

const store = createStore(reducers);

export default class App extends Component {
	render() {
		return (
			<Provider store={ store }>
				<Navigation />
		  	</Provider>
		);
	}
}
