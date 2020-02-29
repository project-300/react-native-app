import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { CommonProps } from '../../../types/common';
import { AllChatState } from '../../../types/redux-reducer-state-types';

export interface Styles {
	container: ViewStyle;
	chatContainer: ViewStyle;
	otherUserAvatar: ImageStyle;
	newMessageCountContainer: ViewStyle;
	newMessageCount: TextStyle;
	otherUserName: TextStyle;
	lastMessage: TextStyle;
}

export interface Props extends CommonProps, AllChatState {
	getChats(): Promise<void>;
}

export interface State { }
