import {
	createAppContainer,
	createStackNavigator,
	createSwitchNavigator,
	NavigationContainer
} from 'react-navigation';
import Home from './screens/home';
import Login from './screens/login';

const SignedOutStack: NavigationContainer = createStackNavigator({
	Login: {
		screen: Login,
		navigationOptions: () => ({
			title: 'Login'
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
