import { CommonProps } from '../../../types/common';

export interface Styles { }

export interface Props extends CommonProps {
	keyboardOpen: boolean;
	isLoggingIn: boolean;
	isLoggedIn: boolean;
	login(u: string, p: string): Promise<boolean>;
	getCurrentJourney(onAppLoad?: boolean): Promise<void>;
}

export interface State {
	email: string;
	password: string;
	hidePassword: boolean;
}
