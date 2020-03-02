import Login from './screens/login';
import SignUp from './screens/signup';
import DriverApplication from './screens/driver-application';
import Profile from './screens/profile';
import MyJourneys from './screens/driver/journeys';
import JourneyMap from './screens/driver/journey';
import DriverTracking from './screens/passenger/driver-tracking';
import NewJourney from './screens/new-journey';
import AllJourneys from './screens/all-journeys';
import ViewJourney from './screens/passenger/view-journey';
import InteractiveMap from './screens/passenger/view-journey/journey-map';
import AllChats from './screens/chat/all-chats';
import Chat from './screens/chat';
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
import { store } from './store';

let UNREAD_COUNT: number = 0;
store.subscribe(() => {
	console.log('UPDATED');
	UNREAD_COUNT = store.getState().allChatsReducer.totalUnreadCount;
	console.log(UNREAD_COUNT);
});

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
			becomeDriver: true,
			darkMode: true
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
	AllJourneys: {
		screen: AllJourneys,
		...navigationOptions('Search Journeys', undefined, false)
	},
	ViewJourney: {
		screen: ViewJourney,
		...navigationOptions('Journey', undefined, true)
	},
	InteractiveMap: {
		screen: InteractiveMap,
		...navigationOptions('Interactive Map', undefined, true)
	},
	OtherProfile: {
		screen: Profile,
		...navigationOptions('Other Profile', undefined, true)
	}
});

const MyJourneysTab: NavigationContainer = createStackNavigator({
	MyJourneys: {
		screen: MyJourneys,
		...navigationOptions('My Accepted Lifts', undefined, false)
	},
	DriverTrackingMap: {
		screen: DriverTracking,
		...navigationOptions('Track Driver', undefined, true)
	},
	JourneyMap: {
		screen: JourneyMap,
		...navigationOptions('Your Journey', undefined, true)
	},
	PassengerViewJourney: {
		screen: ViewJourney,
		...navigationOptions('Journey', undefined, true)
	}
});

const NewJourneyTab: NavigationContainer = createStackNavigator({
	NewJourney: {
		screen: NewJourney,
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
		...navigationOptions('Chat', undefined, true)
	},
	ChatOtherProfile: {
		screen: Profile,
		...navigationOptions('Other Profile', undefined, true)
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
	ProfileTab: {
		screen: ProfileTab,
		navigationOptions: (): NavigationMaterialBottomTabOptions => ({
			title: 'Profile',
			tabBarIcon: <Icon name={ 'user' } size={ 22 } color={ Theme.accent } solid />
		})
	},
	SearchTab: {
		screen: SearchTab,
		navigationOptions: (): NavigationMaterialBottomTabOptions => ({
			title: 'Search',
			tabBarIcon: <Icon name={ 'search' } size={ 22 } color={ Theme.accent } solid />,
			tabBarOnPress: ({ navigation }: { navigation: NavigationTabProp }): void => {
				if (navigation.isFocused) navigation.navigate('AllJourneys');
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

const SignedInDriverStack: NavigationContainer = createMaterialBottomTabNavigator({
	MyJourneysTab: {
		screen: MyJourneysTab,
		navigationOptions: (e): NavigationMaterialBottomTabOptions => ({
			title: 'My Lifts',
			tabBarIcon: <Icon name={ 'car' } size={ 22 } color={ Theme.accent } />,
			tabBarOnPress: ({ navigation }: { navigation: NavigationTabProp }): void => {
				console.log(navigation);
				console.log(e);

				if (navigation.isFocused) navigation.navigate('MyJourneys');
			}
		})
	},
	ProfileTab: {
		screen: ProfileTab,
		navigationOptions: (): NavigationMaterialBottomTabOptions => ({
			title: 'Profile',
			tabBarIcon: <Icon name={ 'user' } size={ 22 } color={ Theme.accent } solid />
		})
	},
	SearchTab: {
		screen: SearchTab,
		navigationOptions: (): NavigationMaterialBottomTabOptions => ({
			title: 'Search',
			tabBarIcon: <Icon name={ 'search' } size={ 22 } color={ Theme.accent } solid />,
			tabBarOnPress: ({ navigation }: { navigation: NavigationTabProp }): void => {
				if (navigation.isFocused) navigation.navigate('AllJourneys');
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
