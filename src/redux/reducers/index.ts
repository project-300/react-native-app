import { combineReducers } from 'redux';
import signUpReducer from './signup';
import loginReducer from './auth';
import driverApplicationReducer from './driver-application';
import adminDriverApplicationsReducer from './admin/driver-applications';
import userProfileReducer from './user/profile';
import updateUserFieldReducer from './user/update-user-field';
import updatePasswordReducer from './user/update-password';

export default combineReducers({
	signUpReducer,
	loginReducer,
	driverApplicationReducer,
	adminDriverApplicationsReducer,
	userProfileReducer,
	updateUserFieldReducer,
	updatePasswordReducer
});
