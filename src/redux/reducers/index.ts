import { combineReducers } from 'redux';
import signUpReducer from './signup';
import confirmReducer from './confirmation';
import loginReducer from './auth';
import driverApplicationReducer from './driver-application';
import userProfileReducer from './user/profile';
import driverJourneysReducer from './driver/my-journeys';
import journeyDetailsReducer from './driver/journey';
import driverTrackingReducer from './passenger/driver-tracking';
import newJourneyReducer from './driver/new-journey';
import allJourneysReducer from './journey';
import interestsListReducer from './data/interests';
import darkModeReducer from './theme/theme';
import viewJourneyReducer from './passenger/view-journey';
import contentReloadReducer from './content-reloading';

export default combineReducers({
	signUpReducer,
	confirmReducer,
	loginReducer,
	driverApplicationReducer,
	userProfileReducer,
	driverJourneysReducer,
	journeyDetailsReducer,
	driverTrackingReducer,
	newJourneyReducer,
	allJourneysReducer,
	interestsListReducer,
	darkModeReducer,
	viewJourneyReducer,
	contentReloadReducer
});
