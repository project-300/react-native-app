import { ViewStyle } from 'react-native';
import { CommonProps } from '../../types/common';
import { Chat } from '@project-300/common-types';

export interface Styles {
	container: ViewStyle;
}

export interface Props extends CommonProps {
	fetchingChat: boolean;
	chat: Chat | undefined;
	getChat(userId: string): Promise<boolean>;
}

export interface State { }
