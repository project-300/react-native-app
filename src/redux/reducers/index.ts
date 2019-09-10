import { combineReducers } from 'redux';
import signUpReducer from './signup';
import loginReducer from './auth';
import driverApplicationReducer from './driver-application';
import adminDriverApplicationsReducer from './admin/driver-applications';

export default combineReducers({
	signUpReducer,
	loginReducer,
	driverApplicationReducer,
	adminDriverApplicationsReducer
});
