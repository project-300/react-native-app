import { VEHICLE_MAKES_REQUEST, VEHICLE_MAKES_SUCCESS, VEHICLE_MAKES_FAILURE, VEHICLE_MODELS_REQUEST, VEHICLE_MODELS_SUCCESS, VEHICLE_MODELS_FAILURE } from './../constants/redux-actions';
import {
	LOGIN_FAILURE,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	SIGNUP_CONFIRMATION_FAILURE,
	SIGNUP_CONFIRMATION_REQUEST,
	SIGNUP_CONFIRMATION_REQUIRED,
	SIGNUP_CONFIRMATION_SUCCESS,
	SIGNUP_FAILURE,
	SIGNUP_REQUEST,
	SIGNUP_SUCCESS,
	DRIVER_APPLICATION_REQUEST,
	DRIVER_APPLICATION_SUCCESS,
	DRIVER_APPLICATION_FAILURE,
	USER_PROFILE_REQUEST,
	USER_PROFILE_RECEIVED,
	USER_PROFILE_FAILURE,
	UPDATE_EMAIL_REQUEST,
	UPDATE_EMAIL_SUCCESS,
	UPDATE_EMAIL_FAILURE,
	JOURNEYS_REQUEST,
	JOURNEYS_SUCCESS,
	JOURNEYS_FAILURE,
	JOURNEY_DETAILS_REQUEST,
	JOURNEY_DETAILS_SUCCESS,
	JOURNEY_DETAILS_FAILURE,
	START_JOURNEY_REQUEST,
	START_JOURNEY_SUCCESS,
	START_JOURNEY_FAILURE,
	END_JOURNEY_REQUEST,
	END_JOURNEY_SUCCESS,
	END_JOURNEY_FAILURE,
	DRIVER_MOVEMENT_REQUEST,
	DRIVER_MOVEMENT_SUCCESS,
	DRIVER_MOVEMENT_FAILURE,
	PASSENGER_JOURNEY_DETAILS_REQUEST,
	PASSENGER_JOURNEY_DETAILS_SUCCESS,
	PASSENGER_JOURNEY_DETAILS_FAILURE,
	UPDATE_DRIVER_LOCATION,
	CANCEL_PASSENGER_JOURNEY_REQUEST,
	CANCEL_PASSENGER_JOURNEY_SUCCESS,
	CANCEL_PASSENGER_JOURNEY_FAILURE,
	GOOGLE_PLACES_SEARCH_REQUEST,
	GOOGLE_PLACES_SEARCH_SUCCESS,
	GOOGLE_PLACES_SEARCH_FAILURE,
	GOOGLE_PLACES_SEARCH_CLEAR_RESULTS,
	GOOGLE_PLACES_DETAILS_REQUEST,
	GOOGLE_PLACES_DETAILS_SUCCESS,
	GOOGLE_PLACES_DETAILS_FAILURE,
	SELECT_GOOGLE_PLACE,
	CREATE_JOURNEY_REQUEST,
	CREATE_JOURNEY_SUCCESS,
	CREATE_JOURNEY_FAILURE,
	CREATE_JOURNEY_DROP_MARKER,
	FIND_NEARBY_PLACE_REQUEST,
	FIND_NEARBY_PLACE_SUCCESS,
	FIND_NEARBY_PLACE_FAILURE,
	GET_ALL_JOURNEYS_FAILURE,
	GET_ALL_JOURNEYS_REQUEST,
	GET_ALL_JOURNEYS_SUCCESS,
	UPDATE_ADD_USER_JOURNEY_REQUEST,
	UPDATE_ADD_USER_JOURNEY_SUCCESS,
	UPDATE_ADD_USER_JOURNEY_FAILURE,
	CREATE_JOURNEY_FIND_ROUTE_REQUEST,
	CREATE_JOURNEY_FIND_ROUTE_SUCCESS,
	CREATE_JOURNEY_FIND_ROUTE_FAILURE,
	INTERESTS_REQUEST,
	INTERESTS_SUCCESS,
	INTERESTS_FAILURE,
	UPDATE_INTERESTS_SUCCESS,
	UPDATE_INTERESTS_REQUEST,
	UPDATE_INTERESTS_FAILURE,
	UPDATE_USER_REQUEST,
  APPLICATION_ALREADY_APPLIED,
	UPDATE_USER_SUCCESS,
	UPDATE_USER_FAILURE,
	UPLOAD_AVATAR_REQUEST,
	UPLOAD_AVATAR_SUCCESS,
	UPLOAD_AVATAR_FAILURE,
	TURN_ON_DARK_MODE,
	TURN_OFF_DARK_MODE,
	GET_VIEW_JOURNEY_REQUEST,
	GET_VIEW_JOURNEY_SUCCESS,
	GET_VIEW_JOURNEY_FAILURE,
	CONTENT_RELOAD_ON,
	CONTENT_RELOAD_OFF
} from '../constants/redux-actions';
import {
	Coords,
	GooglePlaceDetails,
	Journey,
	SubscriptionPayload,
	GooglePlace, 
  User, 
  VehicleModel, 
  VehicleMake, 
  LastEvaluatedKey

} from '@project-300/common-types';
import { EditTypes } from './common';

export interface DarkModeOn {
	type: typeof TURN_ON_DARK_MODE;
}

export interface DarkModeOff {
	type: typeof TURN_OFF_DARK_MODE;
}

export interface UpdateAddUserJourneyRequest {
	type: typeof UPDATE_ADD_USER_JOURNEY_REQUEST;
}

export interface UpdateAddUserJourneySuccess {
	type: typeof UPDATE_ADD_USER_JOURNEY_SUCCESS;
}

export interface UpdateAddUserJourneyFailure {
	type: typeof UPDATE_ADD_USER_JOURNEY_FAILURE;
}

export interface CancelPassengerAcceptanceRequest {
	type: typeof CANCEL_PASSENGER_JOURNEY_REQUEST;
}

export interface CancelPassengerAcceptanceSuccess {
	type: typeof CANCEL_PASSENGER_JOURNEY_SUCCESS;
}

export interface CancelPassengerAcceptanceFailure {
	type: typeof CANCEL_PASSENGER_JOURNEY_FAILURE;
}

export interface GetViewJourneyRequest {
	type: typeof GET_VIEW_JOURNEY_REQUEST;
}

export interface GetViewJourneySuccess {
	type: typeof GET_VIEW_JOURNEY_SUCCESS;
}

export interface GetViewJourneyFailure {
	type: typeof GET_VIEW_JOURNEY_FAILURE;
}

export interface GetAllJourneysRequest {
	type: typeof GET_ALL_JOURNEYS_REQUEST;
}

export interface GetAllJourneysSuccess {
	type: typeof GET_ALL_JOURNEYS_SUCCESS;
	journeys: Journey[];
	lastEvaluatedKey: LastEvaluatedKey;
	isFirstCall: boolean;
}

export interface GetAllJourneysFailure {
	type: typeof GET_ALL_JOURNEYS_FAILURE;
}

export interface LoginRequest {
	type: typeof LOGIN_REQUEST;
}

export interface LoginSuccess {
	type: typeof LOGIN_SUCCESS;
}

export interface LoginFailure {
	type: typeof LOGIN_FAILURE;
}

export interface SignUpRequest {
	type: typeof SIGNUP_REQUEST;
}

export interface SignUpSuccess {
	type: typeof SIGNUP_SUCCESS;
}

export interface SignUpFailure {
	type: typeof SIGNUP_FAILURE;
}

export interface SignUpConfirmationRequired {
	type: typeof SIGNUP_CONFIRMATION_REQUIRED;
	payload?: object;
}

export interface SignUpConfirmationRequest {
	type: typeof SIGNUP_CONFIRMATION_REQUEST;
}

export interface SignUpConfirmationSuccess {
	type: typeof SIGNUP_CONFIRMATION_SUCCESS;
}

export interface SignUpConfirmationFailure {
	type: typeof SIGNUP_CONFIRMATION_FAILURE;
}

export interface UserProfileSubRequest {
	type: typeof USER_PROFILE_REQUEST;
}

export interface UserProfileSubReceived {
	type: typeof USER_PROFILE_RECEIVED;
	user: User;
}

export interface UserProfileSubFailure {
	type: typeof USER_PROFILE_FAILURE;
}

export interface UpdateEmailRequest {
	type: typeof UPDATE_EMAIL_REQUEST;
}

export interface UpdateEmailSuccess {
	type: typeof UPDATE_EMAIL_SUCCESS;
}

export interface UpdateEmailFailure {
	type: typeof UPDATE_EMAIL_FAILURE;
}

export interface UpdateInterestsRequest {
	type: typeof UPDATE_INTERESTS_REQUEST;
}

export interface UpdateInterestsSuccess {
	type: typeof UPDATE_INTERESTS_SUCCESS;
	interests: string[];
}

export interface UpdateInterestsFailure {
	type: typeof UPDATE_INTERESTS_FAILURE;
}

export interface DriverApplicationRequest {
	type: typeof DRIVER_APPLICATION_REQUEST;
}

export interface DriverApplicationSuccess {
	type: typeof DRIVER_APPLICATION_SUCCESS;
}

export interface DriverApplicationFailure {
	type: typeof DRIVER_APPLICATION_FAILURE;
}

export interface ApplicationAlreadyApplied {
	type: typeof APPLICATION_ALREADY_APPLIED;
	applied: boolean;
}

export interface VehicleMakesRequest {
	type: typeof VEHICLE_MAKES_REQUEST
}

export interface VehicleMakesSuccess {
	type: typeof VEHICLE_MAKES_SUCCESS;
	vehicleMakes: VehicleMake[];
}

export interface VehicleMakesFailure {
	type: typeof VEHICLE_MAKES_FAILURE;
	errMessage: string;
}

export interface VehicleModelsRequest {
	type: typeof VEHICLE_MODELS_REQUEST
}

export interface VehicleModelsSuccess {
	type: typeof VEHICLE_MODELS_SUCCESS;
	vehicleModels: VehicleModel[];
}

export interface VehicleModelsFailure {
	type: typeof VEHICLE_MODELS_FAILURE
}

export interface DriverJourneysRequest {
	type: typeof JOURNEYS_REQUEST;
}

export interface DriverJourneysSuccess {
	type: typeof JOURNEYS_SUCCESS;
	journeys: { previous: Journey[]; current: Journey[] };
}

export interface DriverJourneysFailure {
	type: typeof JOURNEYS_FAILURE;
}

export interface CancelPassengerAcceptedRequest {
	type: typeof CANCEL_PASSENGER_JOURNEY_REQUEST;
}

export interface CancelPassengerAcceptedSuccess {
	type: typeof CANCEL_PASSENGER_JOURNEY_SUCCESS;
	journeys: { previous: Journey[]; current: Journey[] };
}

export interface CancelPassengerAcceptedFailure {
	type: typeof CANCEL_PASSENGER_JOURNEY_FAILURE;
}

export interface JourneyDetailsRequest {
	type: typeof JOURNEY_DETAILS_REQUEST;
}

export interface JourneyDetailsSuccess {
	type: typeof JOURNEY_DETAILS_SUCCESS;
	journey: Journey;
}

export interface JourneyDetailsFailure {
	type: typeof JOURNEY_DETAILS_FAILURE;
}

export interface PassengerJourneyDetailsRequest {
	type: typeof PASSENGER_JOURNEY_DETAILS_REQUEST;
}

export interface PassengerJourneyDetailsSuccess {
	type: typeof PASSENGER_JOURNEY_DETAILS_SUCCESS;
	journey: Journey;
}

export interface PassengerJourneyDetailsFailure {
	type: typeof PASSENGER_JOURNEY_DETAILS_FAILURE;
}

export interface UpdateDriverLocation {
	type: typeof UPDATE_DRIVER_LOCATION;
	payload: SubscriptionPayload;
}

export interface StartJourneyRequest {
	type: typeof START_JOURNEY_REQUEST;
}

export interface StartJourneySuccess {
	type: typeof START_JOURNEY_SUCCESS;
	journey: Journey;
}

export interface StartJourneyFailure {
	type: typeof START_JOURNEY_FAILURE;
}

export interface EndJourneyRequest {
	type: typeof END_JOURNEY_REQUEST;
}

export interface EndJourneySuccess {
	type: typeof END_JOURNEY_SUCCESS;
	journey: Journey;
}

export interface EndJourneyFailure {
	type: typeof END_JOURNEY_FAILURE;
}

export interface DriverMovementRequest {
	type: typeof DRIVER_MOVEMENT_REQUEST;
}

export interface DriverMovementSuccess {
	type: typeof DRIVER_MOVEMENT_SUCCESS;
	journey: Journey;
}

export interface DriverMovementFailure {
	type: typeof DRIVER_MOVEMENT_FAILURE;
}

export interface GooglePlacesSearchRequest {
	type: typeof GOOGLE_PLACES_SEARCH_REQUEST;
}

export interface GooglePlacesSearchSuccess {
	type: typeof GOOGLE_PLACES_SEARCH_SUCCESS;
	places: GooglePlace[];
}

export interface GooglePlacesSearchFailure {
	type: typeof GOOGLE_PLACES_SEARCH_FAILURE;
}

export interface GooglePlacesSearchClearResults {
	type: typeof GOOGLE_PLACES_SEARCH_CLEAR_RESULTS;
}

export interface SelectGooglePlace {
	type: typeof SELECT_GOOGLE_PLACE;
	place: GooglePlace;
	locationType: string;
}

export interface GooglePlacesDetailsRequest {
	type: typeof GOOGLE_PLACES_DETAILS_REQUEST;
}

export interface GooglePlacesDetailsSuccess {
	type: typeof GOOGLE_PLACES_DETAILS_SUCCESS;
	placeDetails: GooglePlaceDetails;
	locationType: string;
}

export interface GooglePlacesDetailsFailure {
	type: typeof GOOGLE_PLACES_DETAILS_FAILURE;
}

export interface CreateJourneyRequest {
	type: typeof CREATE_JOURNEY_REQUEST;
}

export interface CreateJourneySuccess {
	type: typeof CREATE_JOURNEY_SUCCESS;
}

export interface CreateJourneyFailure {
	type: typeof CREATE_JOURNEY_FAILURE;
}

export interface CreateJourneyDropMarker {
	type: typeof CREATE_JOURNEY_DROP_MARKER;
	coords: Coords;
	locationType: string;
}

export interface FindNearbyPlaceRequest {
	type: typeof FIND_NEARBY_PLACE_REQUEST;
}

export interface FindNearbyPlaceSuccess {
	type: typeof FIND_NEARBY_PLACE_SUCCESS;
	place: GooglePlaceDetails;
	locationType: string;
}

export interface FindNearbyPlaceFailure {
	type: typeof FIND_NEARBY_PLACE_FAILURE;
}

export interface CreateJourneyFindRouteRequest {
	type: typeof CREATE_JOURNEY_FIND_ROUTE_REQUEST;
}

export interface CreateJourneyFindRouteSuccess {
	type: typeof CREATE_JOURNEY_FIND_ROUTE_SUCCESS;
	route: Coords[];
}

export interface CreateJourneyFindRouteFailure {
	type: typeof CREATE_JOURNEY_FIND_ROUTE_FAILURE;
}

export interface InterestsRequest {
	type: typeof INTERESTS_REQUEST;
}

export interface InterestsSuccess {
	type: typeof INTERESTS_SUCCESS;
	interests: string[];
}

export interface InterestsFailure {
	type: typeof INTERESTS_FAILURE;
}

export interface UpdateUserFieldRequest {
	type: typeof UPDATE_USER_REQUEST;
}

export interface UpdateUserFieldSuccess {
	type: typeof UPDATE_USER_SUCCESS;
	field: EditTypes;
	value: string;
}

export interface UpdateUserFieldFailure {
	type: typeof UPDATE_USER_FAILURE;
}

export interface UpdateAvatarRequest {
	type: typeof UPLOAD_AVATAR_REQUEST;
}

export interface UpdateAvatarSuccess {
	type: typeof UPLOAD_AVATAR_SUCCESS;
	avatarURL: string;
}

export interface UpdateAvatarFailure {
	type: typeof UPLOAD_AVATAR_FAILURE;
}

export type VehicleMakesAndModelsTypes =
	VehicleMakesRequest |
 	VehicleMakesSuccess |
	VehicleMakesFailure |
	VehicleModelsRequest |
	VehicleModelsSuccess |
 	VehicleModelsSuccess;

export type JourneyActionTypes =
export interface ContentReloadOn {
	type: typeof CONTENT_RELOAD_ON;
}

export interface ContentReloadOff {
	type: typeof CONTENT_RELOAD_OFF;
}

export type ContentReloadActionTypes =
	ContentReloadOn |
	ContentReloadOff;

export type DarkModeActionTypes =
	DarkModeOn |
	DarkModeOff;

export type SearchJourneysActionTypes =
	GetAllJourneysRequest |
	GetAllJourneysSuccess |
	GetAllJourneysFailure;

export type ViewJourneyActionTypes =
	GetViewJourneyRequest |
	GetViewJourneySuccess |
	GetViewJourneyFailure |
	UpdateAddUserJourneyRequest |
	UpdateAddUserJourneySuccess |
	UpdateAddUserJourneyFailure |
	CancelPassengerAcceptanceRequest |
	CancelPassengerAcceptanceSuccess |
	CancelPassengerAcceptanceFailure;

export type LoginActionTypes =
	LoginRequest |
	LoginSuccess |
	LoginFailure;

export type SignUpActionTypes =
	SignUpRequest |
	SignUpSuccess |
	SignUpFailure |
	SignUpConfirmationRequired |
	SignUpConfirmationRequest |
	SignUpConfirmationSuccess |
	SignUpConfirmationFailure;

export type UserProfileActionTypes =
	UserProfileSubRequest |
	UserProfileSubReceived |
	UserProfileSubFailure |
	UpdateInterestsRequest |
	UpdateInterestsSuccess |
	UpdateInterestsFailure |
	UpdateUserFieldRequest |
	UpdateUserFieldSuccess |
	UpdateUserFieldFailure |
	UpdateAvatarRequest |
	UpdateAvatarSuccess |
	UpdateAvatarFailure;

export type InterestsActionTypes =
	InterestsRequest |
	InterestsSuccess |
	InterestsFailure;

export type UpdateEmailActionTypes =
	UpdateEmailRequest |
	UpdateEmailSuccess |
	UpdateEmailFailure;

export type DriverApplicationActionTypes =
	DriverApplicationRequest |
	DriverApplicationSuccess |
	DriverApplicationFailure |
	ApplicationAlreadyApplied;

export type DriverJourneysActionTypes =
	DriverJourneysRequest |
	DriverJourneysSuccess |
	DriverJourneysFailure;

export type CancelPassengerAcceptedActionTypes =
	CancelPassengerAcceptedRequest |
	CancelPassengerAcceptedSuccess |
	CancelPassengerAcceptedFailure;

export type JourneysActionTypes =
	DriverJourneysActionTypes |
	CancelPassengerAcceptedActionTypes;

export type JourneyDetailsActionTypes =
	JourneyDetailsRequest |
	JourneyDetailsSuccess |
	JourneyDetailsFailure;

export type PassengerJourneyDetailsActionTypes =
	PassengerJourneyDetailsRequest |
	PassengerJourneyDetailsSuccess |
	PassengerJourneyDetailsFailure |
	UpdateDriverLocation;

export type StartJourneyActionTypes =
	StartJourneyRequest |
	StartJourneySuccess |
	StartJourneyFailure;

export type EndJourneyActionTypes =
	EndJourneyRequest |
	EndJourneySuccess |
	EndJourneyFailure;

export type DriverMovementActionTypes =
	DriverMovementRequest |
	DriverMovementSuccess |
	DriverMovementFailure;

export type JourneyMapActionTypes =
	JourneyDetailsActionTypes |
	StartJourneyActionTypes |
	EndJourneyActionTypes |
	DriverMovementActionTypes;

export type DriverTrackingActionTypes =
	PassengerJourneyDetailsActionTypes;

export type GooglePlacesSearchActionTypes =
	GooglePlacesSearchRequest |
	GooglePlacesSearchSuccess |
	GooglePlacesSearchFailure |
	GooglePlacesSearchClearResults |
	SelectGooglePlace;

export type GooglePlacesDetailsActionTypes =
	GooglePlacesDetailsRequest |
	GooglePlacesDetailsSuccess |
	GooglePlacesDetailsFailure;

export type CreateJourneyActionTypes =
	CreateJourneyRequest |
	CreateJourneySuccess |
	CreateJourneyFailure |
	CreateJourneyDropMarker;

export type FindNearbyPlaceActionTypes =
	FindNearbyPlaceRequest |
	FindNearbyPlaceSuccess |
	FindNearbyPlaceFailure;

export type CreateJourneyFindRouteActionTypes =
	CreateJourneyFindRouteRequest |
	CreateJourneyFindRouteSuccess |
	CreateJourneyFindRouteFailure;

export type CreateNewJourneyActionTypes =
	GooglePlacesSearchActionTypes |
	GooglePlacesDetailsActionTypes |
	CreateJourneyActionTypes |
	FindNearbyPlaceActionTypes |
	CreateJourneyFindRouteActionTypes;

export type AppActions =
	ContentReloadActionTypes |
	DarkModeActionTypes |
	LoginActionTypes |
	SignUpActionTypes |
	UserProfileActionTypes |
	UpdateEmailActionTypes |
	JourneysActionTypes |
	JourneyMapActionTypes |
	DriverTrackingActionTypes |
	DriverApplicationActionTypes |
	CreateNewJourneyActionTypes |
	JourneyActionTypes |
	VehicleMakesAndModelsTypes |
	SearchJourneysActionTypes |
	ViewJourneyActionTypes |
	InterestsActionTypes;
