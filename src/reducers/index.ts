import { combineReducers } from 'redux';
import signUpReducer from './signup';
import loginReducer from './auth';
import liftsReducer from './lifts';

export default combineReducers({
	signUpReducer,
	loginReducer,
	allLifts: liftsReducer
});
