import {
  DriverApplicationObject,
  User,
  Journey
} from '@project-300/common-types';

export interface AllJourneysListState {
  fetchingData: boolean;
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
  isApplying: boolean;
}

export interface AdminDriverApplicationsState {
  applications: DriverApplicationObject[];
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

export interface HomeState {}
