import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { CommonProps } from '../../types/common';
import { Chat, Message } from '@project-300/common-types';
import Animated from 'react-native-reanimated';

export interface Styles {
	container: ViewStyle;
	chatWindow: ViewStyle;
	messageBubble: ViewStyle;
	sendButton: TextStyle;
	messagesContainer: ViewStyle;
	messageContainer: ViewStyle;
	messageInput: ViewStyle;
	avatar: ImageStyle;
	senderAvatar: ImageStyle;
	ownAvatar: ImageStyle;
	userOwnMessageBubble: ViewStyle;
	userOwnMessageText: TextStyle;
	messageTime: TextStyle;
	messageText: TextStyle;
}

export interface Props extends CommonProps {
	fetchingChat: boolean;
	chat: Chat | undefined;
	messages: Message[];
	chatSubscribe(userId: string): Promise<boolean>;
	chatUnsubscribe(userId: string): Promise<boolean>;
}

export interface State {
	messageText: string;
	scrolledOffBottom: boolean;
	newMessageCount: number;
}

export interface AnimationValues {
	newMessages: Animated.Value<number>,
}

export interface AnimationStyles {
	newMessagesButtonOpacity: Animated.Node<number> | number,
}
