import {
	createAppContainer,
	createStackNavigator,
	createSwitchNavigator,
	NavigationContainer,
	NavigationScreenConfig,
	NavigationStackScreenOptions,
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
import { createMaterialBottomTabNavigator, NavigationMaterialBottomTabOptions } from 'react-navigation-material-bottom-tabs';
import HeaderBar from './headerbar';

const headerHidden = (): NavigationStackScreenOptions => ({
	header: null
});

const navigationOptions = (title: string | undefined, subtitle: string | undefined, backButton: boolean): any => ({
	navigationOptions: ({ navigation }: { navigation: NavigationScreenConfig<any> }): NavigationStackScreenOptions => ({
		header: headerBar(navigation, title, subtitle, backButton)
	})
})

const headerBar = (
	navigation: NavigationScreenConfig<any>,
	title: string | undefined,
	subtitle: string | undefined,
	backButton: boolean
): React.ReactElement =>
	<HeaderBar
		title={ customValue(navigation, 'title') || title }
		subtitle={ customValue(navigation, 'subtitle') || subtitle }
		backButton={ backButton }
		navigation={ navigation }
	/>;

const customValue = (navigation: NavigationScreenConfig<any>, value: string): string | undefined =>
	navigation.state.params && navigation.state.params.headerDetails && navigation.state.params.headerDetails[value];

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
		...navigationOptions('My Profile', undefined, false)
	},
	UpdateUserField: {
		screen: UpdateUserField,
		...navigationOptions('Update Field', undefined, true)
	},
	UpdatePassword: {
		screen: UpdatePassword,
		...navigationOptions('Update Password', undefined, true)
	}
});

const JourneysTab: NavigationContainer = createStackNavigator({
	AllJourneys: {
		screen: AllJourneys,
		...navigationOptions('View Journeys', undefined, false)
	},
	ViewJourney: {
		screen: ViewJourney,
		...navigationOptions('Journey', undefined, true)
	}
});

const HomeTab: NavigationContainer = createStackNavigator({
	Home: {
		screen: Home,
		...navigationOptions('Home', undefined, false)
	},
	DriverApplication: {
		screen: DriverApplication,
		...navigationOptions('Driver Application', undefined, true)
	},
	MyJourneys: {
		screen: MyJourneys,
		...navigationOptions('My Journeys', undefined, true)
	},
	JourneyMap: {
		screen: JourneyMap,
		...navigationOptions('Your Journey', undefined, true)
	},
	DriverTrackingMap: {
		screen: DriverTracking,
		...navigationOptions('Track Driver', undefined, true)
	}
});

const NewJourneyTab: NavigationContainer = createStackNavigator({
	NewJourney: {
		screen: NewJourney,
		...navigationOptions('Create Journey', undefined, false)
	}
});

const SignedInStack: NavigationContainer = createMaterialBottomTabNavigator({
	HomeTab: {
		screen: HomeTab,
		navigationOptions: (): NavigationMaterialBottomTabOptions => ({
			title: 'Home',
			tabBarColor: 'red',
			tabBarIcon: <Icon name={ 'home' } size={ 22 } color={ 'white' } />
		})
	},
	ProfileTab: {
		screen: ProfileTab,
		navigationOptions: (): NavigationMaterialBottomTabOptions => ({
			title: 'Profile',
			tabBarColor: 'green',
			tabBarIcon: <Icon name={ 'user' } size={ 22 } color={ 'white' } solid />
		})
	},
	JourneysTab: {
		screen: JourneysTab,
		navigationOptions: (): NavigationMaterialBottomTabOptions => ({
			title: 'Journeys',
			tabBarColor: 'purple',
			tabBarIcon: <Icon name={ 'car' } size={ 22 } color={ 'white' } solid />
		})
	},
	NewJourneyTab: {
		screen: NewJourneyTab,
		navigationOptions: (): NavigationMaterialBottomTabOptions => ({
			title: 'New Journey',
			tabBarColor: 'lightblue',
			tabBarIcon: <Icon name={ 'plus' } size={ 22 } color={ 'white' } solid />
		})
	}
},
	{
		initialRouteName: 'HomeTab',
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
