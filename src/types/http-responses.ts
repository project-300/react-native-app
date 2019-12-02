import { Journey } from '@project-300/common-types';

export interface GetAllJourneysResult {
  success: boolean;
  error?: {
    code: string;
    description: string;
  };
  journeys?: Journey[];
}

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

export type HttpResponse =
  | GetAllJourneysResult
  | ConfirmationResult
  | SignupResult
  | LoginResult
  | DriverApplicationResult
  | SecretKeyResult;
