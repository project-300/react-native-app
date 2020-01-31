import { TextStyle, ViewStyle } from 'react-native';
import { AppActions } from '../../types/redux-action-types';
import { User } from '@project-300/common-types';
import { CommonProps, EditTypes } from '../../types/common';
import { Response as ImageResponse } from "react-native-image-picker";

export interface Styles {
	container: ViewStyle;
	text: TextStyle;
	profileImageContainer: ViewStyle;
	editIconContainer: ViewStyle;
	userTypeTag: ViewStyle;
	userTypeTagText: TextStyle;
	username: TextStyle;
	editRowFirstItem: ViewStyle;
	editRow: ViewStyle;
	label: TextStyle;
	editText: TextStyle;
	panel: TextStyle;
}

export interface Props extends CommonProps {
	subscribing: boolean;
	receivedData: boolean;
	user: User | null
	uploadingAvatar: boolean;
	userProfileSubRequest(): AppActions;
	userProfileUnsub(): AppActions;
	uploadAvatar(img: ImageResponse): Promise<void | boolean>;
	updateUserField(f: EditTypes, t: string, e: string): Promise<boolean>;
	updatePassword(cp: string, np: string): Promise<boolean>;
}

export interface State {
	editType: string | null;
}
