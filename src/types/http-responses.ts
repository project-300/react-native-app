export interface LoginResult {
	success: boolean;
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

export interface Lift {
	_id: string;
	name: {
		first: string;
		last: string;
	}
	leavingFrom: string;
	goingTo: string;
}

export type HttpResponse = ConfirmationResult | SignupResult | LoginResult | Lift;
