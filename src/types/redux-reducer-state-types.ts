import { Coords, GooglePlaceDetails, Journey, User, VehicleMake, VehicleModel } from '@project-300/common-types';
import { Region } from 'react-native-maps';
import { GooglePlace } from './maps';

export interface UpdateAddUserJourneyState {
	isAdding: boolean;
}

export interface AllJourneysListState {
	isFetching: boolean;
	journeys: Journey[];
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
	isFetching: boolean;
	applied?: boolean;
}

export interface VehicleMakesAndModelsState {
	isFetching: boolean;
	vehicleMakes: VehicleMake[];
	vehicleModels: VehicleModel[];
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
