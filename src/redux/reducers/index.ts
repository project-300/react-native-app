import { combineReducers } from 'redux';
import signUpReducer from './signup';
import loginReducer from './auth';
import driverApplicationReducer from './driver-application';

export default combineReducers({
	signUpReducer,
	loginReducer,
	driverApplicationReducer
});
