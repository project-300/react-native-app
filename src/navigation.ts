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
import Applications from './screens/applications';
import Profile from './screens/profile';
import UpdateUserField from './screens/profile/update-user-field';
import UpdatePassword from './screens/profile/update-password';
import MyJourneys from './screens/driver/journeys';
import JourneyMap from './screens/driver/journey';

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
	Applications: {
		screen: Applications,
		navigationOptions: (): NavigationStackScreenOptions => ({
			title: 'Applications'
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

const CreateNavigator = (signedIn: boolean = false): NavigationContainer => createAppContainer(SwitchNavigator(signedIn));

export default CreateNavigator;
