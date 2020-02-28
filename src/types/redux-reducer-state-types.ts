import { Chat, Coords, GooglePlaceDetails, Journey, LastEvaluatedKey, Message, User } from '@project-300/common-types';
import { Region } from 'react-native-maps';
import { GooglePlace } from './maps';

export interface DarkModeState {
	DARK_MODE: boolean;
}

export interface UpdateAddUserJourneyState {
	isAdding: boolean;
}

export interface AllJourneysListState {
	isFullList: boolean;
	isFetching: boolean;
	isSearching: boolean;
	showingSearchResults: boolean;
	journeys: Journey[];
	lastEvaluatedKey?: LastEvaluatedKey;
}

export interface ViewJourneyState {
	isUpdating: boolean;
	isReloading: boolean;
	journey: Journey | undefined;
}

export interface ContentReloadingState {
	contentReloading: boolean;
}

export interface LoginState {
	isLoggingIn: boolean;
	isLoggedIn: boolean;
}

export interface SignUpState {
	isCreatingAccount: boolean;
	payload?: object;
}

export interface ConfirmState {
	isConfirmingAccount: boolean;
}

export interface DriverApplicationState {
	isApplying: boolean;
}

export interface UserProfileState {
	subscribing: boolean;
	receivedData: boolean;
	user: User | null;
	uploadingAvatar: boolean;
	isUpdating: boolean;
}

export interface InterestsState {
	requestingInterests: boolean;
	interests: string[];
}

export interface ChatState {
	fetchingChat: boolean;
	chat: Chat | undefined;
}

export interface ChatMessagesState {
	messages: Message[];
	lastEvaluatedKey?: LastEvaluatedKey;
	requestingOldMessages: boolean;
	lastContentType: 'NONE' | 'INITIAL' | 'NEW' | 'OLD';
	isLastMessageByOwnUser: boolean;
}

export interface UpdateUserFieldState {
	isUpdating: boolean;
}

export interface UpdatePasswordState {
	isUpdating: boolean;
}

export interface JourneysState {
	isRequesting: boolean;
	isCancelling: boolean;
	journeys: { current: Journey[]; previous: Journey[] };
}

export interface JourneyMapState {
	status: string;
	isStarting: boolean;
	isStarted: boolean;
	isEnding: boolean;
	isMoving: boolean;
	isRequestingJourneyDetails: boolean;
	journey?: Journey;
}

export interface DriverTrackingState {
	isRequesting: boolean;
	isComplete: boolean;
	isWaitingOnDriverCoords: boolean;
	mapRegion?: Region;
	journey?: Journey;
	driverLocation?: Coords;
	passengerLocation?: Coords;
	routeTravelled: Coords[],
	direction: number;
	ended: boolean;
}

export interface NewJourneyState {
	places: GooglePlace[];
	originPlace: GooglePlace | null;
	originPlaceDetails: GooglePlaceDetails | undefined;
	destinationPlace: GooglePlace | null;
	destinationPlaceDetails: GooglePlaceDetails | undefined;
	destinationMarkerCoords: Coords | null;
	originMarkerCoords: Coords | null;
	route: Coords[];
}
