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

export type HttpResponse = ConfirmationResult | SignupResult | LoginResult | DriverApplicationResult;
