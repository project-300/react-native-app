import { CommonProps } from '../../../types/common';

export interface Styles { }

export interface Props extends CommonProps {
	keyboardOpen: boolean;
	isLoggingIn: boolean;
	isLoggedIn: boolean;
	login(u: string, p: string): Promise<boolean>;
}

export interface State {
	username: string;
	password: string;
	hidePassword: boolean;
}
