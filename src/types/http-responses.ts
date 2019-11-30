import { Journey } from '@project-300/common-types';

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
	error?: {
		code: string;
		description: string;
	};
}

export interface DriverJourneysResult {
	success: boolean;
	journeys: Journey[];
	error?: {
		code: string;
		description: string;
	};
}

export interface JourneyDetailsResult {
	success: boolean;
	journey: Journey;
	error?: {
		code: string;
		description: string;
	};
}

export type HttpResponse = ConfirmationResult | SignupResult | LoginResult | DriverApplicationResult |
	SecretKeyResult | DriverJourneysResult | JourneyDetailsResult;
