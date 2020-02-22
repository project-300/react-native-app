import { Journey, LastEvaluatedKey, User } from '@project-300/common-types';

export interface UpdateAddUserJourneyResult {
	success: boolean;
	error?: {
		code: string;
		description: string;
	};
}

export interface GetAllJourneysResult {
	success: boolean;
	journeys: Journey[];
	lastEvaluatedKey: LastEvaluatedKey;
}

export interface LoginResult {
	success: boolean;
	userId?: string;
	userType?: string;
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

export interface JourneysResult {
	success: boolean;
	journeys: {
		current: Journey[];
		previous: Journey[];
	};
	journeyCount: number;
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

export interface CreateJourneyResult {
	success: boolean;
}

export interface InterestsListResult {
	success: boolean;
	interests: string[];
}

export interface S3SecretKeyResult {
	success: boolean;
	secretKey: string;
}

export interface GetUserProfileResult {
	success: boolean;
	user: User;
}

export type HttpResponse =
	| UpdateAddUserJourneyResult
	| GetAllJourneysResult
	| ConfirmationResult
	| SignupResult
	| LoginResult
	| DriverApplicationResult
	| SecretKeyResult
	| JourneysResult
	| JourneyDetailsResult
	| CreateJourneyResult
	| InterestsListResult;
