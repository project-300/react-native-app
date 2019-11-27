export interface LoginResult {
	success: boolean;
	userId?: string;
	error?: {
		code: string;
		description: string;
	};
}

export interface SignupResult {
	success: boolean;
	error?: {
		code: string;
		description: string;
	};
}

export interface ConfirmationResult {
	success: boolean;
	error?: {
		code: string;
		description: string;
	};
}

export interface DriverApplicationResult {
	success: boolean;
	error?: {
		code: string;
		description: string;
	};
}

export interface SecretKeyResult {
	success: boolean;
	secretKey: string;
}

export interface DriverJourneysResult {
	success: boolean;
	journeys: [];
}

export type HttpResponse = ConfirmationResult | SignupResult | LoginResult | DriverApplicationResult |
	SecretKeyResult | DriverJourneysResult;
