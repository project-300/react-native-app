import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { CommonProps } from '../../types/common';
import { Chat, LastEvaluatedKey, Message } from '@project-300/common-types';
import Animated from 'react-native-reanimated';

export interface Styles {
	container: ViewStyle;
	chatWindow: ViewStyle;
	messageBubble: ViewStyle;
	sendButton: ViewStyle;
	sendButtonIcon: TextStyle;
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
	lastEvaluatedKey: LastEvaluatedKey;
	requestingOldMessages: boolean;
	lastContentType: 'NONE' | 'INITIAL' | 'NEW' | 'OLD';
	initialLoad: boolean;
	isLastMessageByOwnUser: boolean;
	chatSubscribe(userId: string): Promise<boolean>;
	chatUnsubscribe(userId: string): Promise<boolean>;
	getChatMessages(chatId: string, createdAt?: string): Promise<boolean>;
}

export interface State {
	messageText: string;
	scrolledOffBottom: boolean;
	newMessageCount: number;
	lastContentHeight: number;
	isLoading: boolean;
	allowOldMessages: boolean;
}

export interface AnimationValues {
	newMessages: Animated.Value<number>;
	loadOldMessage: Animated.Value<number>;
}

export interface AnimationStyles {
	newMessagesButtonOpacity: Animated.Node<number> | number;
	loadingBarWidth: Animated.Node<number> | number;
}
