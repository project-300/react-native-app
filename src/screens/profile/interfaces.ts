import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { AppActions } from '../../types/redux-action-types';
import { User } from '@project-300/common-types';
import { CommonProps, EditTypes } from '../../types/common';
import { ImagePickerResponse } from '../../types/images';
import Animated from 'react-native-reanimated';

export interface Styles {
	container: ViewStyle;
	avatar: ImageStyle;
	userTypeTag: ViewStyle;
	userTypeTagText: TextStyle;
	name: TextStyle;
	editRow: ViewStyle;
	label: TextStyle;
	editText: TextStyle;
	panel: TextStyle;
	sectionContainer: TextStyle;
	statsContainer: ViewStyle;
	statsItem: ViewStyle;
	statsItemText: TextStyle;
	statsItemDesc: TextStyle;
	loadingText: TextStyle;
	fab: ViewStyle;
	interestChip: ViewStyle;
	editAvatarContainer: ViewStyle;
	editAvatarIcon: ViewStyle;
	outerColumnContainer: ViewStyle;
	halfWidth: ViewStyle;
}

export interface Props extends CommonProps {
	subscribing: boolean;
	receivedData: boolean;
	user: User | null
	uploadingAvatar: boolean;
	isUpdating: boolean;
	interests: string[];
	userProfileSubRequest(): AppActions;
	userProfileUnsub(): AppActions;
	updateInterests(i: string[]): Promise<void | boolean>;
	uploadAvatar(img: ImagePickerResponse): Promise<void | boolean>;
	updateUserField(f: EditTypes, t: string, e: string): Promise<boolean>;
	updatePassword(cp: string, np: string): Promise<boolean>;
	getInterestsList(): Promise<void | boolean>;
	getUserProfile(u: string): Promise<void | boolean>;
}

export interface State {
	isOtherUser: boolean;
	editType: string | null;
	editing: boolean;
	readyToEdit: boolean;
	isSwiping: boolean;
	panelOpen: boolean;
}

export interface AnimationValues {
	fall: Animated.Value<number>,
	panelOpen: Animated.Value<number>,
	beginEditing: Animated.Value<number>,
}

export interface AnimationStyles {
	panelHeight: Animated.Node<number> | number,
	editIconOpacity: Animated.Node<number> | number,
	editImageOpacity: Animated.Node<number> | number,
	editFieldsHeight: Animated.Node<number> | number,
	panelLeftX: Animated.Node<number> | number,
	panelRightX: Animated.Node<number> | number,
	panelOpacity: Animated.Node<number> | number
}
