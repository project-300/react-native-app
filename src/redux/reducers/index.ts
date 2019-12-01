import { combineReducers } from 'redux';
import signUpReducer from './signup';
import confirmReducer from './confirmation';
import loginReducer from './auth';
import driverApplicationReducer from './driver-application';
import adminDriverApplicationsReducer from './admin/driver-applications';
import userProfileReducer from './user/profile';
import updateUserFieldReducer from './user/update-user-field';
import updatePasswordReducer from './user/update-password';
import driverJourneysReducer from './driver/my-journeys';
import journeyDetailsReducer from './driver/journey';
import driverTrackingReducer from './passenger/driver-tracking';

export default combineReducers({
	signUpReducer,
	confirmReducer,
	loginReducer,
	driverApplicationReducer,
	adminDriverApplicationsReducer,
	userProfileReducer,
	updateUserFieldReducer,
	updatePasswordReducer,
	driverJourneysReducer,
	journeyDetailsReducer,
	driverTrackingReducer
});
