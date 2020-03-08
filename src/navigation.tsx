import Login from './screens/login';
import SignUp from './screens/signup';
import DriverApplication from './screens/driver-application';
import Profile from './screens/profile';
import MyJourneys from './screens/my-journeys';
import JourneyMap from './screens/driver-journey-map';
import DriverTracking from './screens/passenger-driver-tracking';
import CreateJourney from './screens/create-journey';
import SearchJourneys from './screens/search-journeys';
import ViewJourneyDetails from './screens/view-journey-details';
import InteractiveMap from './screens/view-journey-details/interactive-map';
import AllChats from './screens/all-chats';
import Chat from './screens/chat';
import PassengerPickup from './screens/passenger-pickup';
import Icon from 'react-native-vector-icons/FontAwesome5';
import React from 'react';
import HeaderBar, { CustomOption } from './headerbar';
import {
	createAppContainer,
	createStackNavigator,
	createSwitchNavigator,
	NavigationContainer,
	NavigationScreenConfig,
	NavigationStackScreenOptions, ScreenProps,
} from 'react-navigation';
import {
	createMaterialBottomTabNavigator,
	NavigationMaterialBottomTabOptions
} from 'react-navigation-material-bottom-tabs';
import { NavigationTabProp } from 'react-navigation-material-bottom-tabs/src/types';
import { Theme } from './constants/theme';

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
			settings: false,
			becomeDriver: true,
			darkMode: false
		} }
		customOptions={ customOptions }
	/>;

const customValue = (navigation: NavigationScreenConfig<any>, value: string): string | undefined =>
	navigation.state.params &&
	navigation.state.params.headerDetails &&
	navigation.state.params.headerDetails[value];

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

const JourneyMapStack: NavigationContainer = createStackNavigator({
	JourneyMap: {
		screen: JourneyMap,
		navigationOptions: headerHidden
	}
});

const ProfileTab: NavigationContainer = createStackNavigator({
	Profile: {
		screen: Profile,
		...navigationOptions('My Profile', undefined, false)
	},
	DriverApplication: {
		screen: DriverApplication,
		...navigationOptions('Driver Application', undefined, true)
	}
});

const SearchTab: NavigationContainer = createStackNavigator({
	SearchJourneys: {
		screen: SearchJourneys,
		...navigationOptions('Search Journeys', undefined, false)
	},
	ViewJourney: {
		screen: ViewJourneyDetails,
		...navigationOptions('Loading...', undefined, true) // Title updated in screen
	},
	InteractiveMap: {
		screen: InteractiveMap,
		...navigationOptions('Interactive Map', undefined, true)
	},
	OtherProfile: {
		screen: Profile,
		...navigationOptions('Loading...', undefined, true) // Title updated in screen
	}
});

const MyJourneysTab: NavigationContainer = createStackNavigator({
	MyJourneys: {
		screen: MyJourneys,
		...navigationOptions('My Accepted Lifts', undefined, false)
	},
	PassengerPickup: {
		screen: PassengerPickup,
		...navigationOptions('Passenger Pickup', undefined, true)
	},
	DriverTrackingMap: {
		screen: DriverTracking,
		...navigationOptions('Track Driver', undefined, true)
	},
	PassengerViewJourney: {
		screen: ViewJourneyDetails,
		...navigationOptions('Journey', undefined, true)
	},
	PassengerOtherProfile: {
		screen: Profile,
		...navigationOptions('Loading...', undefined, true) // Title updated in screen
	}
});

const NewJourneyTab: NavigationContainer = createStackNavigator({
	NewJourney: {
		screen: CreateJourney,
		...navigationOptions('Create Journey', undefined, false)
	}
});

const ChatTab: NavigationContainer = createStackNavigator({
	AllChats: {
		screen: AllChats,
		...navigationOptions('Your Chats', undefined, false)
	},
	Chat: {
		screen: Chat,
		...navigationOptions('Loading...', undefined, true) // Title updated in screen
	},
	ChatOtherProfile: {
		screen: Profile,
		...navigationOptions('Loading...', undefined, true) // Title updated in screen
	}
});

const SignedInPassengerStack: NavigationContainer = createMaterialBottomTabNavigator({
	MyJourneysTab: {
		screen: MyJourneysTab,
		navigationOptions: (): NavigationMaterialBottomTabOptions => ({
			title: 'My Lifts',
			tabBarIcon: <Icon name={ 'car' } size={ 22 } color={ Theme.accent } />,
			tabBarOnPress: ({ navigation }: { navigation: NavigationTabProp }): void => {
				if (navigation.isFocused) navigation.navigate('MyJourneys');
			}
		})
	},
	SearchTab: {
		screen: SearchTab,
		navigationOptions: (): NavigationMaterialBottomTabOptions => ({
			title: 'Search',
			tabBarIcon: <Icon name={ 'search' } size={ 22 } color={ Theme.accent } solid />,
			tabBarOnPress: ({ navigation }: { navigation: NavigationTabProp }): void => {
				if (navigation.isFocused) navigation.navigate('SearchJourneys');
			}
		})
	},
	ChatTab: {
		screen: ChatTab,
		navigationOptions: ({ screenProps }: { screenProps: ScreenProps }): NavigationMaterialBottomTabOptions => ({
			// tabBarBadge: screenProps.totalUnreadCount,
			title: 'Chat',
			tabBarIcon: <Icon name={ 'comments' } size={ 22 } color={ Theme.accent } solid />,
			tabBarOnPress: ({ navigation }: { navigation: NavigationTabProp }): void => {
				if (navigation.isFocused) navigation.navigate('AllChats');
			}
		})
	},
	ProfileTab: {
		screen: ProfileTab,
		navigationOptions: (): NavigationMaterialBottomTabOptions => ({
			title: 'Profile',
			tabBarIcon: <Icon name={ 'user' } size={ 22 } color={ Theme.accent } solid />
		})
	}
},
{
	initialRouteName: 'SearchTab',
	tabBarPosition: 'bottom',
	animationEnabled: true,
	swipeEnabled: true,
	shifting: true,
	activeColor: Theme.accent
});

const SignedInDriverStack: NavigationContainer = createMaterialBottomTabNavigator({
	MyJourneysTab: {
		screen: MyJourneysTab,
		navigationOptions: (): NavigationMaterialBottomTabOptions => ({
			title: 'My Lifts',
			tabBarIcon: <Icon name={ 'car' } size={ 22 } color={ Theme.accent } />,
			tabBarOnPress: ({ navigation }: { navigation: NavigationTabProp }): void => {
				if (navigation.isFocused) navigation.navigate('MyJourneys');
			}
		})
	},
	SearchTab: {
		screen: SearchTab,
		navigationOptions: (): NavigationMaterialBottomTabOptions => ({
			title: 'Search',
			tabBarIcon: <Icon name={ 'search' } size={ 22 } color={ Theme.accent } solid />,
			tabBarOnPress: ({ navigation }: { navigation: NavigationTabProp }): void => {
				if (navigation.isFocused) navigation.navigate('SearchJourneys');
			}
		})
	},
	NewJourneyTab: {
		screen: NewJourneyTab,
		navigationOptions: (): NavigationMaterialBottomTabOptions => ({
			title: 'New Journey',
			tabBarIcon: <Icon name={ 'plus' } size={ 22 } color={ Theme.accent } solid />
		})
	},
	ChatTab: {
		screen: ChatTab,
		navigationOptions: ({ screenProps }: { screenProps: ScreenProps }): NavigationMaterialBottomTabOptions => ({
			// tabBarBadge: screenProps.totalUnreadCount,
			title: 'Chat',
			tabBarIcon: <Icon name={ 'comments' } size={ 22 } color={ Theme.accent } solid />,
			tabBarOnPress: ({ navigation }: { navigation: NavigationTabProp }): void => {
				if (navigation.isFocused) navigation.navigate('AllChats');
			}
		})
	},
	ProfileTab: {
		screen: ProfileTab,
		navigationOptions: (): NavigationMaterialBottomTabOptions => ({
			title: 'Profile',
			tabBarIcon: <Icon name={ 'user' } size={ 22 } color={ Theme.accent } solid />
		})
	}
},
{
	initialRouteName: 'MyJourneysTab',
	tabBarPosition: 'bottom',
	animationEnabled: true,
	swipeEnabled: true,
	shifting: true,
	activeColor: Theme.accent
});

const SwitchNavigator = (signedIn: boolean = false, isDriver: boolean = false): NavigationContainer => {
	return createSwitchNavigator(
		{
			SignedInStack: {
				screen: isDriver ? SignedInDriverStack : SignedInPassengerStack
			},
			JourneyMapStack: {
				screen: JourneyMapStack
			},
			SignedOutStack: {
				screen: SignedOutStack
			}
		},
		{
			initialRouteName:
				signedIn ?
					'SignedInStack' :
					'SignedOutStack'
		}
	);
};

const CreateNavigator = (signedIn: boolean = false, isDriver: boolean = false): NavigationContainer =>
	createAppContainer(SwitchNavigator(signedIn, isDriver));

export default CreateNavigator;
