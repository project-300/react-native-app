import {
	createAppContainer,
	createStackNavigator,
	createSwitchNavigator,
	NavigationContainer
} from 'react-navigation';
import Home from './screens/home';
import Login from './screens/login';
import SignUp from './screens/signup';
import Confirmation from './screens/signup/confirmation';

const SignedOutStack: NavigationContainer = createStackNavigator({
	Login: {
		screen: Login,
		navigationOptions: () => ({
			title: 'Login'
		})
	},
	SignUp: {
		screen: SignUp,
		navigationOptions: () => ({
			title: 'Sign Up',
			headerLeft: null
		})
	},
	Confirmation: {
		screen: Confirmation,
		navigationOptions: () => ({
			title: 'Confirmation',
			headerLeft: null
		})
	}
});

const SignedInStack: NavigationContainer = createStackNavigator({
	Home: {
		screen: Home,
		navigationOptions: () => ({
			title: 'Home'
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
