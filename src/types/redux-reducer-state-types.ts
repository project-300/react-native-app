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
	applications: object[];
}
