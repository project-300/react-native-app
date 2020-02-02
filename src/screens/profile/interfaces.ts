import { TextStyle, ViewStyle } from 'react-native';
import { AppActions } from '../../types/redux-action-types';
import { User } from '@project-300/common-types';
import { CommonProps, EditTypes } from '../../types/common';
import { Response as ImageResponse } from "react-native-image-picker";

export interface Styles {
	container: ViewStyle;
	avatar: ViewStyle;
	userTypeTag: ViewStyle;
	userTypeTagText: TextStyle;
	username: TextStyle;
	name: TextStyle;
	editRow: ViewStyle;
	label: TextStyle;
	editText: TextStyle;
	panel: TextStyle;
	statsContainer: ViewStyle;
	statsItem: ViewStyle;
	statsItemText: TextStyle;
	statsItemDesc: TextStyle;
	fab: ViewStyle;
	interestChip: ViewStyle;
	editAvatarContainer: ViewStyle;
	editAvatarIcon: ViewStyle;
}

export interface Props extends CommonProps {
	subscribing: boolean;
	receivedData: boolean;
	user: User | null
	uploadingAvatar: boolean;
	userProfileSubRequest(): AppActions;
	userProfileUnsub(): AppActions;
	removeInterests(r: string[]): AppActions;
	uploadAvatar(img: ImageResponse): Promise<void | boolean>;
	updateUserField(f: EditTypes, t: string, e: string): Promise<boolean>;
	updatePassword(cp: string, np: string): Promise<boolean>;
}

export interface State {
	editType: string | null;
	editing: boolean;
	readyToEdit: boolean;
	isSwiping: boolean;
	selectedInterests: string[];
}
