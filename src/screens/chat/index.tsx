import React, { Component, ReactElement } from 'react';
import {
	Text,
	ScrollView,
	View,
	TextInput,
	Image, NativeScrollEvent, Dimensions, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Props, State, AnimationStyles, AnimationValues } from './interfaces';
import { chatSubscribe, chatUnsubscribe, getChatMessages } from '../../redux/actions';
import { AppState } from '../../store';
import { ChatState } from '../../types/redux-reducer-state-types';
import { NavigationEvents } from 'react-navigation';
import { Message } from '@project-300/common-types';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { MessageService } from '../../services/message';
import DatesTimes from '../../services/dates-times';
import Animated, { Easing } from 'react-native-reanimated';
import { interpolateAnimation } from '../../animations/animations';

const { width } = Dimensions.get('window');
const { timing } = Animated;

export class Chat extends Component<Props, State> {

	private _scrollView: ScrollView;

	private animatedValues: AnimationValues = {
		newMessages: new Animated.Value(0),
		loadOldMessage: new Animated.Value(0)
	};

	private animatedStyles: AnimationStyles = {
		newMessagesButtonOpacity: 0,
		loadingBarWidth: 0
	};

	public constructor(props: Props) {
		super(props);

		this.state = {
			messageText: '',
			scrolledOffBottom: false,
			newMessageCount: 0,
			lastContentHeight: 1,
			isLoading: true,
			allowOldMessages: false,
			showLoadingBar: false
		};

		this.animatedValues = {
			newMessages: new Animated.Value(0),
			loadOldMessage: new Animated.Value(0)
		};

		this.animatedStyles = {
			newMessagesButtonOpacity: interpolateAnimation(this.animatedValues.newMessages, [ 0, 1 ], [ 0, 1 ]),
			loadingBarWidth: interpolateAnimation(this.animatedValues.loadOldMessage, [ 0, 1 ], [ 0, width ])
		};
	}

	public componentDidUpdate = (p: Props, s: State): void => {
		const newMessageCount: number = this.props.messages.length - p.messages.length;

		if (this.state.isLoading) setTimeout(() => this._scrollView.scrollToEnd({ animated: false }));
		else if (newMessageCount && !this.state.scrolledOffBottom) setTimeout(() => this._scrollView.scrollToEnd());

		if (this.state.isLoading && this.props.messages.length && newMessageCount) this.setState({ isLoading: false });
		if (newMessageCount && this.state.scrolledOffBottom && this.props.lastContentType === 'NEW' && !this.props.isLastMessageByOwnUser)
			this._showNewMessagesFloatButton(newMessageCount);
		if (newMessageCount && this.state.scrolledOffBottom && this.props.lastContentType === 'NEW' && this.props.isLastMessageByOwnUser)
			setTimeout(() => this._scrollView.scrollToEnd());
	}

	private _mountScreen = async (): Promise<void> => { // Triggered when this screen renders (navigated to)
		// await this.props.chatSubscribe(this.props.otherUserId);
		await this.props.chatSubscribe('cfa18855-2eb3-479b-9120-6ca3bef23fda');

		Keyboard.addListener('keyboardWillShow', () => this._scrollView.scrollToEnd({ animated: false }));
		Keyboard.addListener('keyboardDidShow', () => this._scrollView.scrollToEnd({ animated: false }));
		Keyboard.addListener('keyboardWillHide', () => this._scrollView.scrollToEnd({ animated: false }));
		Keyboard.addListener('keyboardDidHide', () => this._scrollView.scrollToEnd({ animated: false }));

		this._scrollView.scrollToEnd({ animated: false });
	}

	// 00c35391-2b2e-4155-b90d-47d6d922a245
	// cfa18855-2eb3-479b-9120-6ca3bef23fda

	private _unmountScreen = async (): Promise<void> => { // Triggered when the screen is navigated away from
		await this.props.chatUnsubscribe('cfa18855-2eb3-479b-9120-6ca3bef23fda');
	}

	private _showNewMessagesFloatButton = (newMessageCount: number): void => {
		this.setState({ newMessageCount: this.state.newMessageCount + newMessageCount }, () => {
			timing(this.animatedValues.newMessages, {
				duration: 400,
				toValue: 1,
				easing: Easing.inOut(Easing.ease)
			}).start();
		});
	}

	private _sendMessage = async (): Promise<void> => {
		const messageText: string = this.state.messageText;
		if (!this.state.messageText) return;

		// this._scrollView.scrollToEnd({ animated: false });

		await MessageService.sendMessage({
			text: messageText,
			chatId: '5862cb22-3c10-4723-8472-9698eb83d8e3'
		}, 'cfa18855-2eb3-479b-9120-6ca3bef23fda');

		this.setState({ messageText: '' });
	}

	private _scrollChatEvent = async ({ layoutMeasurement, contentOffset, contentSize }: NativeScrollEvent): Promise<void> => {
		const scrolledOffBottom: boolean = !(layoutMeasurement.height + contentOffset.y >= contentSize.height - 20);

		this.setState({
			scrolledOffBottom,
			lastContentHeight: contentSize.height,
			allowOldMessages: true,
			newMessageCount: scrolledOffBottom ? this.state.newMessageCount : 0
		});

		if (contentOffset.y <= 10 && this.state.allowOldMessages) await this._loadOldMessages();
	}

	private _loadOldMessages = async (): Promise<void> => {
		if (!this.props.chat || this.props.requestingOldMessages || !this.props.lastEvaluatedKey) return; // SK for message LEK is createdAt

		await this.props.getChatMessages(this.props.chat.chatId, this.props.lastEvaluatedKey.sk);
	}

	private _scrollToBottom = (): void => {
		this._scrollView.scrollToEnd();

		timing(this.animatedValues.newMessages, {
			duration: 100,
			toValue: 0,
			easing: Easing.inOut(Easing.ease)
		}).start(() => this.setState({ newMessageCount: 0 }));
	}

	private _renderMessage = (message: Message): ReactElement => {
		return <View style={ [
			styles.messageContainer,
			message.userOwnMessage ? { alignSelf: 'flex-end' } : { }
		] } key={ message.sk }>
			{
				!message.userOwnMessage &&
					<Image style={ [ styles.avatar, styles.senderAvatar ] } source={ { uri: message.createdBy.avatar } } />
			}
			<View
				style={ [
					styles.messageBubble,
					message.userOwnMessage ? styles.userOwnMessageBubble : { }
				] }
			>
				<Text style={ [
					styles.messageText,
					message.userOwnMessage ? { } : styles.userOwnMessageText
				] }>{ message.text }</Text>
				<Text style={ [ styles.messageTime ] }>{ DatesTimes.dayAndTime(message.times.createdAt) }</Text>
			</View>
			{
				message.userOwnMessage &&
					<Image style={ [ styles.avatar, styles.ownAvatar ] } source={ { uri: message.createdBy.avatar } } />
			}
		</View>;
	}

	private _renderNavigationEvents = (): ReactElement =>
		<NavigationEvents
			onWillFocus={ this._mountScreen }
			onDidBlur={ this._unmountScreen }
		/>

	public render(): ReactElement {
		return (
			<KeyboardAvoidingView style={ { flex: 1, justifyContent: 'center' } } behavior={ Platform.OS === 'ios' ? 'height' : undefined }
				keyboardVerticalOffset={ 110 }
			>
				<ScrollView
					style={ styles.chatWindow }
					ref={ (ref: ScrollView): void => { this._scrollView = ref; }}
					onMomentumScrollEnd={
						({ nativeEvent }: { nativeEvent: NativeScrollEvent }): Promise<void> => this._scrollChatEvent(nativeEvent)
					}
					onScrollEndDrag={
						({ nativeEvent }: { nativeEvent: NativeScrollEvent }): Promise<void> => this._scrollChatEvent(nativeEvent)
					}
					onContentSizeChange={ (contentWidth: number, contentHeight: number): void => {
						if (!this.state.isLoading && this.props.lastContentType === 'OLD') {
							this._scrollView.scrollTo({ x: 0, y: contentHeight - this.state.lastContentHeight, animated: false });
							this._scrollView.scrollTo({ x: 0, y: contentHeight - this.state.lastContentHeight - 20, animated: true });
						}
					} }
				>
					{ this._renderNavigationEvents() }

					{
						!this.props.lastEvaluatedKey && this.props.messages.length > 10 &&
							<Text
								style={ {
									alignSelf: 'center',
									marginBottom: 20,
									marginTop: 10
								} }
							>
								No More Previous Messages
							</Text>
					}

					<View style={ styles.messagesContainer }>
						{
							this.props.messages.map((message: Message) => this._renderMessage(message))
						}
					</View>

				</ScrollView>

				<View style={ { bottom: 0, position: 'absolute', left: 0, right: 0, backgroundColor: 'white' } }>
					<TextInput
						style={ styles.messageInput }
						placeholder='Your message'
						onChangeText={ (messageText: string): void => this.setState({ messageText }) }
						value={ this.state.messageText }
						autoCompleteType='off'
						autoCorrect={ false }
					/>
					<TouchableOpacity
						style={ styles.sendButton }
						onPress={ this._sendMessage }
					>
						<Icon
							name='paper-plane'
							size={ 24 }
							solid
							style={ [ styles.sendButtonIcon, !this.state.messageText ? { color: '#555' } : { } ] }
						/>
					</TouchableOpacity>

					{
						!!this.state.newMessageCount &&
							<TouchableOpacity
								style={ {
									position: 'absolute',
									top: -60,
									width: width * 0.8,
									alignSelf: 'center'
								} }
								onPress={ this._scrollToBottom }
							>
								<Animated.View
									style={ {
										backgroundColor: 'orange',
										padding: 12,
										borderRadius: 8,
										shadowOffset: {
											width: 0,
											height: 4
										},
										shadowOpacity: 0.6,
										shadowRadius: 4,
										elevation: 12,
										opacity: this.animatedStyles.newMessagesButtonOpacity
									} }
								>
									<Text style={ { color: 'white', fontWeight: 'bold', alignSelf: 'center' } }>{ this.state.newMessageCount } New Messages</Text>
								</Animated.View>
							</TouchableOpacity>
					}
				</View>

				{
					this.state.showLoadingBar &&
						<Animated.View
							style={ {
								height: 5,
								width: this.animatedStyles.loadingBarWidth,
								backgroundColor: 'red',
								position: 'absolute',
								top: 0,
								left: 0
							} }
						/>
				}
			</KeyboardAvoidingView>
		);
	}
}

const mapStateToProps = (state: AppState): ChatState => ({
	...state.chatReducer,
	...state.chatMessagesReducer
});

export default connect(mapStateToProps, {
	chatSubscribe,
	chatUnsubscribe,
	getChatMessages
})(Chat);
