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
	STORE_APPLICATIONS,
	USER_PROFILE_SUB_REQUEST,
	USER_PROFILE_UNSUB,
	USER_PROFILE_SUB_RECEIVED,
	USER_PROFILE_SUB_FAILURE,
	UPDATE_EMAIL_REQUEST,
	UPDATE_EMAIL_SUCCESS,
	UPDATE_EMAIL_FAILURE,
	DRIVER_JOURNEYS_REQUEST,
	DRIVER_JOURNEYS_SUCCESS,
	DRIVER_JOURNEYS_FAILURE,
	JOURNEY_DETAILS_REQUEST,
	JOURNEY_DETAILS_SUCCESS,
	JOURNEY_DETAILS_FAILURE,
	START_JOURNEY_REQUEST,
	START_JOURNEY_SUCCESS, START_JOURNEY_FAILURE, END_JOURNEY_REQUEST, END_JOURNEY_SUCCESS, END_JOURNEY_FAILURE
} from '../constants/redux-actions';
import { Journey } from '@project-300/common-types';

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

export interface DriverApplicationRequest {
	type: typeof DRIVER_APPLICATION_REQUEST;
}

export interface DriverApplicationSuccess {
	type: typeof DRIVER_APPLICATION_SUCCESS;
}

export interface DriverApplicationFailure {
	type: typeof DRIVER_APPLICATION_FAILURE;
}

export interface StoreApplicationsRequest {
	type: typeof STORE_APPLICATIONS;
	payload: object;
}

export interface UserProfileSubRequest {
	type: typeof USER_PROFILE_SUB_REQUEST;
}

export interface UserProfileUnsub {
	type: typeof USER_PROFILE_UNSUB;
}

export interface UserProfileSubReceived {
	type: typeof USER_PROFILE_SUB_RECEIVED;
	payload: object;
}

export interface UserProfileSubFailure {
	type: typeof USER_PROFILE_SUB_FAILURE;
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

export interface DriverJourneysRequest {
	type: typeof DRIVER_JOURNEYS_REQUEST;
}

export interface DriverJourneysSuccess {
	type: typeof DRIVER_JOURNEYS_SUCCESS;
	journeys: { previous: Journey[]; current: Journey[] };
}

export interface DriverJourneysFailure {
	type: typeof DRIVER_JOURNEYS_FAILURE;
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

export type LoginActionTypes = LoginRequest | LoginSuccess | LoginFailure;

export type SignUpActionTypes = SignUpRequest | SignUpSuccess | SignUpFailure |
	SignUpConfirmationRequired | SignUpConfirmationRequest | SignUpConfirmationSuccess | SignUpConfirmationFailure;

export type DriverApplicationActionTypes = DriverApplicationRequest | DriverApplicationSuccess | DriverApplicationFailure;

export type AdminDriverApplicationsActionTypes = StoreApplicationsRequest;

export type UserProfileActionTypes = UserProfileSubRequest | UserProfileUnsub | UserProfileSubReceived | UserProfileSubFailure;

export type UpdateEmailActionTypes = UpdateEmailRequest | UpdateEmailSuccess | UpdateEmailFailure;

export type DriverJourneysActionTypes = DriverJourneysRequest | DriverJourneysSuccess | DriverJourneysFailure;

export type JourneyDetailsActionTypes = JourneyDetailsRequest | JourneyDetailsSuccess | JourneyDetailsFailure;

export type StartJourneyActionTypes = StartJourneyRequest | StartJourneySuccess | StartJourneyFailure;

export type EndJourneyActionTypes = EndJourneyRequest | EndJourneySuccess | EndJourneyFailure;

export type JourneyMapActionTypes = JourneyDetailsActionTypes | StartJourneyActionTypes | EndJourneyActionTypes;

export type AppActions = LoginActionTypes | SignUpActionTypes | DriverApplicationActionTypes | UserProfileActionTypes |
	UpdateEmailActionTypes | DriverJourneysActionTypes | JourneyMapActionTypes;
