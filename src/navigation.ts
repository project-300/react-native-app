import { createAppContainer, createStackNavigator } from 'react-navigation';
import Home from './screens/home';
import Profile from './screens/profile';

const NavigationStack = createStackNavigator({
	Home: { screen: Home },
	Profile: { screen: Profile }
}, {
	initialRouteName: 'Home'
});

const Navigation = createAppContainer(NavigationStack);

export default Navigation;
