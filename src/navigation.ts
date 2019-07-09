import { createStackNavigator } from 'react-navigation';
import Home from './screens/home';

const AppNavigation = createStackNavigator({
	Home: { screen: Home }
});

export default AppNavigation;
