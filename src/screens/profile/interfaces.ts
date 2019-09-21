import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { AppActions } from '../../types/redux-action-types';
import { User } from '@project-300/common-types';
import { CommonProps } from '../../types/common';

export interface Styles {
	container: ViewStyle;
	text: TextStyle;
	button: TextStyle;
	buttonText: TextStyle;
	profileImage: ImageStyle;
	username: TextStyle;
	email: TextStyle;
	editButton: TextStyle;
}

export interface Props extends CommonProps {
	subscribing: boolean;
	receivedData: boolean;
	user: User | null;
	userProfileSubRequest(): AppActions;
	userProfileUnsub(): AppActions;
}

export interface State { }
