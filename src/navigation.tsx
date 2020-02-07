import {
	createAppContainer,
	createStackNavigator,
	createSwitchNavigator,
	NavigationContainer,
	NavigationScreenConfig,
	NavigationStackScreenOptions,
} from 'react-navigation';
import {
	createMaterialBottomTabNavigator,
	NavigationMaterialBottomTabOptions
} from 'react-navigation-material-bottom-tabs';
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
import HeaderBar, { CustomOption } from './headerbar';

const headerHidden = (): NavigationStackScreenOptions => ({
	header: null
});

const navigationOptions = (
	title: string | undefined,
	subtitle: string | undefined,
	backButton: boolean,
	customOptions?: CustomOption[]
): any => ({
	navigationOptions: ({ navigation }: { navigation: NavigationScreenConfig<any> }): NavigationStackScreenOptions => ({
		header: headerBar(navigation, title, subtitle, backButton, customOptions)
	})
});

const headerBar = (
	navigation: NavigationScreenConfig<any>,
	title: string | undefined,
	subtitle: string | undefined,
	backButton: boolean,
	customOptions?: CustomOption[]
): React.ReactElement =>
	<HeaderBar
		title={ customValue(navigation, 'title') || title }
		subtitle={ customValue(navigation, 'subtitle') || subtitle }
		backButton={ backButton }
		navigation={ navigation }
		options={ {
			display: true,
			logout: true,
			settings: true,
			becomeDriver: true
		} }
		customOptions={ customOptions }
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
	},
	DriverApplication: {
		screen: DriverApplication,
		...navigationOptions('Driver Application', undefined, true)
	}
});

const JourneysTab: NavigationContainer = createStackNavigator({
	AllJourneys: {
		screen: AllJourneys,
		...navigationOptions('Search Journeys', undefined, false)
	},
	ViewJourney: {
		screen: ViewJourney,
		...navigationOptions('Journey', undefined, true)
	}
});

const MyJourneysTab: NavigationContainer = createStackNavigator({
	MyJourneys: {
		screen: MyJourneys,
		...navigationOptions('My Journeys', undefined, false)
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
	MyJourneysTab: {
		screen: MyJourneysTab,
		navigationOptions: (): NavigationMaterialBottomTabOptions => ({
			title: 'My Journeys',
			tabBarIcon: <Icon name={ 'car' } size={ 22 } color={ 'white' } />
		})
	},
	ProfileTab: {
		screen: ProfileTab,
		navigationOptions: (): NavigationMaterialBottomTabOptions => ({
			title: 'Profile',
			tabBarIcon: <Icon name={ 'user' } size={ 22 } color={ 'white' } solid />
		})
	},
	SearchTab: {
		screen: JourneysTab,
		navigationOptions: (): NavigationMaterialBottomTabOptions => ({
			title: 'Search',
			tabBarIcon: <Icon name={ 'search' } size={ 22 } color={ 'white' } solid />
		})
	},
	NewJourneyTab: {
		screen: NewJourneyTab,
		navigationOptions: (): NavigationMaterialBottomTabOptions => ({
			title: 'New Journey',
			tabBarIcon: <Icon name={ 'plus' } size={ 22 } color={ 'white' } solid />
		})
	}
},
	{
		initialRouteName: 'MyJourneysTab',
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
