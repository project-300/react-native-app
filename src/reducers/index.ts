import { combineReducers } from 'redux';
import signUpReducer from './signup';
import loginReducer from './auth';

export default combineReducers({
	signUpReducer,
	loginReducer
});
