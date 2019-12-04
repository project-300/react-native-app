import { combineReducers } from 'redux';
import signUpReducer from './signup';
import confirmReducer from './confirmation';
import loginReducer from './auth';
import driverApplicationReducer from './driver-application';
import adminDriverApplicationsReducer from './admin/driver-applications';
import userProfileReducer from './user/profile';
import updateUserFieldReducer from './user/update-user-field';
import updatePasswordReducer from './user/update-password';
import allJourneysReducer from './journey';

export default combineReducers({
  signUpReducer,
  confirmReducer,
  loginReducer,
  driverApplicationReducer,
  adminDriverApplicationsReducer,
  userProfileReducer,
  updateUserFieldReducer,
  updatePasswordReducer,
  allJourneysReducer
});
