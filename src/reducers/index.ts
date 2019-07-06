import { combineReducers } from 'redux';

/*
* This file will be used for Reducer imports only
* and exporting the combinedReducers.
* Temporarily added an example fake reducer.
* */

const FakeReducer = (state = 0, action: object) => {
	// @ts-ignore
	switch (action.type) {
		default:
			return state;
	}
}

export default combineReducers({
	fake: FakeReducer
});
