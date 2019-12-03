import { Coords, GooglePlaceDetails, Journey, User } from '@project-300/common-types';
import { Region } from 'react-native-maps';
import { GooglePlace } from './maps';

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
	isEnding: boolean;
	isMoving: boolean;
	isRequestingJourneyDetails: boolean;
	journey?: Journey;
}

export interface DriverTrackingState {
	isRequesting: boolean;
	isComplete: boolean;
	mapRegion?: Region;
	journey?: Journey;
	driverLocation?: Coords;
	passengerLocation?: Coords;
	routeTravelled: Coords[],
	direction: number;
}

export interface NewJourneyState {
	places: GooglePlace[];
	originPlace: GooglePlace | null;
	originPlaceDetails: GooglePlaceDetails | null;
	destinationPlace: GooglePlace | null;
	destinationPlaceDetails: GooglePlaceDetails | null;
}

export interface HomeState { }
