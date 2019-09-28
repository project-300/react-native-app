import { DriverApplicationObject, User } from '@project-300/common-types';

export interface LoginState {
	isLoggingIn: boolean;
	isLoggedIn: boolean;
}

export interface SignUpState {
	isCreatingAccount: boolean;
	isConfirmingAccount: boolean;
	payload?: object;
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
}

export interface UpdateUserFieldState {
	isUpdating: boolean;
}

export interface HomeState { }
