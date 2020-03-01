import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { CommonProps } from '../../../types/common';
import { AllChatState } from '../../../types/redux-reducer-state-types';

export interface Styles {
	container: ViewStyle;
	chatContainer: ViewStyle;
	otherUserAvatarContainer: ViewStyle;
	otherUserAvatar: ImageStyle;
	chatInfo: ViewStyle;
	topRow: ViewStyle;
	messageRow: ViewStyle;
	bottomRow: ViewStyle;
	newMessageCountContainer: ViewStyle;
	newMessageCount: TextStyle;
	otherUserName: TextStyle;
	updatedAt: TextStyle;
	lastMessage: TextStyle;
	noActiveChats: ViewStyle;
	noActiveChatsText: TextStyle;
	chatLogo: ImageStyle;
}

export interface Props extends CommonProps, AllChatState {
	getChats(): Promise<void>;
}

export interface State { }
