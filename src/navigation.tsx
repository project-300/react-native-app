import {
	createAppContainer,
	createStackNavigator,
	createSwitchNavigator,
	NavigationContainer,
	NavigationScreenConfig,
	NavigationStackScreenOptions,
	NavigationTabScreenOptions
} from 'react-navigation';
import Home from './screens/home';
import Login from './screens/login';
import SignUp from './screens/signup';
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
import Icon from 'react-native-vector-icons/FontAwesome5';
import React from 'react';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

const headerHidden = (): NavigationStackScreenOptions => ({
	header: null
});

const SignedOutStack: NavigationContainer = createStackNavigator({
	Login: {
		screen: Login,
		navigationOptions: headerHidden
	},
	SignUp: {
		screen: SignUp,
		navigationOptions: headerHidden
	}
});

const ProfileTab: NavigationContainer = createStackNavigator({
	Profile: {
		screen: Profile,
		navigationOptions: headerHidden
	},
	UpdateUserField: {
		screen: UpdateUserField,
		navigationOptions: headerHidden
	},
	UpdatePassword: {
		screen: UpdatePassword,
		navigationOptions: headerHidden
	}
});

const JourneysTab: NavigationContainer = createStackNavigator({
	AllJourneys: {
		screen: AllJourneys,
		navigationOptions: headerHidden
	},
	ViewJourney: {
		screen: ViewJourney,
		navigationOptions: headerHidden
	}
});

const HomeTab: NavigationContainer = createStackNavigator({
	Home: {
		screen: Home,
		navigationOptions: headerHidden
	},
	DriverApplication: {
		screen: DriverApplication,
		navigationOptions: headerHidden
	},
	MyJourneys: {
		screen: MyJourneys,
		navigationOptions: headerHidden
	},
	JourneyMap: {
		screen: JourneyMap,
		navigationOptions: headerHidden
	},
	DriverTrackingMap: {
		screen: DriverTracking,
		navigationOptions: headerHidden
	}
});

const NewJourneyTab: NavigationContainer = createStackNavigator({
	NewJourney: {
		screen: NewJourney,
		navigationOptions: headerHidden
	}
});

const SignedInStack: NavigationContainer = createMaterialBottomTabNavigator({
	HomeTab: {
		screen: HomeTab,
		navigationOptions: (): NavigationTabScreenOptions => ({
			title: 'Home',
			tabBarIcon: <Icon name={ 'home' } size={ 22 } color={ 'white' } />
		})
	},
	ProfileTab: {
		screen: ProfileTab,
		navigationOptions: (): NavigationTabScreenOptions => ({
			title: 'Profile',
			tabBarIcon: <Icon name={ 'user' } size={ 22 } color={ 'white' } solid />
		})
	},
	JourneysTab: {
		screen: JourneysTab,
		navigationOptions: (): NavigationTabScreenOptions => ({
			title: 'Journeys',
			tabBarIcon: <Icon name={ 'car' } size={ 22 } color={ 'white' } solid />
		})
	},
	NewJourneyTab: {
		screen: NewJourneyTab,
		navigationOptions: (): NavigationTabScreenOptions => ({
			title: 'New Journey',
			tabBarIcon: <Icon name={ 'plus' } size={ 22 } color={ 'white' } solid />
		})
	}
},

	{
		initialRouteName: 'HomeTab',
		navigationOptions: ({ navigation }: NavigationScreenConfig<any>): NavigationTabScreenOptions => {
			const { routeName, routes } = navigation.state;
			let params = routes && routes[1] && routes[1].params;
			return {
				tabBarIcon: ({ focused, tintColor }): React.ReactElement => {
					// You can return any component that you like here! We usually use an
					// icon component from react-native-vector-icons
					return (<Text>Test</Text>);
				},
				tabBarVisible:
					params && params.hideTabBar != null ? !params.hideTabBar : true,
				swipeEnabled:
					params && params.hideTabBar != null ? !params.hideTabBar : true
			};
		},
		tabBarOptions: {
			activeTintColor: '#6200EE',
			inactiveTintColor: '#858585',
			style: {
				height: 60,
				paddingVertical: 5,
				backgroundColor: '#fff'
			},
			labelStyle: {
				fontSize: 12,
				lineHeight: 20,
				// fontFamily: 'CircularStd-Book'
			}
		},
		// tabBarComponent: BottomNavBar,
		tabBarPosition: 'bottom',
		animationEnabled: true,
		swipeEnabled: true,
		shifting: true,
		activeColor: 'white'
	}
);

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
