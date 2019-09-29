import { TextStyle, ViewStyle } from 'react-native';
import { AppActions } from '../../types/redux-action-types';
import { User } from '@project-300/common-types';
import { CommonProps } from '../../types/common';
import { Response as ImageResponse } from "react-native-image-picker";

export interface Styles {
	container: ViewStyle;
	text: TextStyle;
	button: TextStyle;
	buttonText: TextStyle;
	profileImageContainer: ViewStyle;
	editIconContainer: ViewStyle;
	userTypeTag: ViewStyle;
	userTypeTagText: TextStyle;
	username: TextStyle;
	editRowFirstItem: ViewStyle;
	editRow: ViewStyle;
	label: TextStyle;
	editText: TextStyle;
}

export interface Props extends CommonProps {
	subscribing: boolean;
	receivedData: boolean;
	user: User | null
	uploadingAvatar: boolean;
	userProfileSubRequest(): AppActions;
	userProfileUnsub(): AppActions;
	uploadAvatar(img: ImageResponse): Promise<void | boolean>;
}

export interface State { }
