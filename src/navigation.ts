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
