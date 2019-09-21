import { combineReducers } from 'redux';
import signUpReducer from './signup';
import loginReducer from './auth';
import driverApplicationReducer from './driver-application';
import adminDriverApplicationsReducer from './admin/driver-applications';
import userProfileReducer from './user/profile';

export default combineReducers({
	signUpReducer,
	loginReducer,
	driverApplicationReducer,
	adminDriverApplicationsReducer,
	userProfileReducer
});
