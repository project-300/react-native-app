import {
	createAppContainer,
	createStackNavigator,
	createSwitchNavigator,
	NavigationContainer,
	NavigationStackScreenOptions
} from 'react-navigation';
import Home from './screens/home';
import Login from './screens/login';
import SignUp from './screens/signup';
import Confirmation from './screens/signup/confirmation';
import DriverApplication from './screens/driver-application';
import Profile from './screens/profile';
import UpdateUserField from './screens/profile/update-user-field';
import UpdatePassword from './screens/profile/update-password';
import MyJourneys from './screens/driver/journeys';
import JourneyMap from './screens/driver/journey';
import DriverTracking from './screens/passenger/driver-tracking';
import NewJourney from './screens/new-journey';
import AllJourneys from './screens/all-journeys';
import ViewJourney from './screens/passenger/view-journey';

const SignedOutStack: NavigationContainer = createStackNavigator({
	Login: {
		screen: Login,
		navigationOptions: (): NavigationStackScreenOptions => ({
			title: 'Login'
		})
	},
	SignUp: {
		screen: SignUp,
		navigationOptions: (): NavigationStackScreenOptions => ({
			title: 'Sign Up',
			headerLeft: undefined
		})
	},
	Confirmation: {
		screen: Confirmation,
		navigationOptions: (): NavigationStackScreenOptions => ({
			title: 'Confirmation',
			headerLeft: undefined
		})
	}
});

const SignedInStack: NavigationContainer = createStackNavigator({
	Home: {
		screen: Home,
		navigationOptions: (): NavigationStackScreenOptions => ({
			title: 'Home'
		})
	},
	DriverApplication: {
		screen: DriverApplication,
		navigationOptions: (): NavigationStackScreenOptions => ({
			title: 'Driver Application'
		})
	},
	Profile: {
		screen: Profile,
		navigationOptions: (): NavigationStackScreenOptions => ({
			title: 'Profile'
		})
	},
	UpdateUserField: {
		screen: UpdateUserField,
		navigationOptions: (): NavigationStackScreenOptions => ({ })
	},
	Confirmation: {
		screen: Confirmation,
		navigationOptions: (): NavigationStackScreenOptions => ({
			title: 'Confirmation',
			headerLeft: undefined
		})
	},
	UpdatePassword: {
		screen: UpdatePassword,
		navigationOptions: (): NavigationStackScreenOptions => ({
			title: 'Update Password'
		})
	},
	MyJourneys: {
		screen: MyJourneys,
		navigationOptions: (): NavigationStackScreenOptions => ({
			title: 'My Journeys'
		})
	},
	JourneyMap: {
		screen: JourneyMap,
		navigationOptions: (): NavigationStackScreenOptions => ({
			title: 'Journey'
		})
	},
	DriverTrackingMap: {
		screen: DriverTracking,
		navigationOptions: (): NavigationStackScreenOptions => ({
			title: 'Driver Tracking'
		})
	},
	NewJourney: {
		screen: NewJourney,
		navigationOptions: (): NavigationStackScreenOptions => ({
			title: 'New Journey'
		})
	},
	AllJourneys: {
		screen: AllJourneys,
		navigationOptions: (): NavigationStackScreenOptions => ({
			title: 'All Journeys'
		})
	},
	ViewJourney: {
		screen: ViewJourney,
		navigationOptions: (): NavigationStackScreenOptions => ({
			title: 'View Journey'
		})
	}
});

const SwitchNavigator = (signedIn: boolean = false): NavigationContainer => {
	return createSwitchNavigator(
		{
			SignedInStack: {
				screen: SignedInStack
			},
			SignedOutStack: {
				screen: SignedOutStack
			}
		},
		{
			initialRouteName: signedIn ? 'SignedInStack' : 'SignedOutStack'
		}
	);
};

const CreateNavigator = (signedIn: boolean = false): NavigationContainer =>
	createAppContainer(SwitchNavigator(signedIn));

export default CreateNavigator;
