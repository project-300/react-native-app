import React, { Component, ReactElement } from 'react';
import {
	Text,
	ScrollView,
	View,
	TextInput,
	Image,
	NativeScrollEvent,
	Dimensions,
	TouchableOpacity,
	KeyboardAvoidingView,
	Platform,
	Keyboard,
	NativeModules,
	StatusBarIOS, EmitterSubscription
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Props, State, AnimationStyles, AnimationValues } from './interfaces';
import { chatSubscribe, chatUnsubscribe, getChatMessages, sendMessage } from '../../redux/actions';
import { AppState } from '../../store';
import { ChatState } from '../../types/redux-reducer-state-types';
import { NavigationEvents } from 'react-navigation';
import { Message } from '@project-300/common-types';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DatesTimes from '../../services/dates-times';
import Animated, { Easing } from 'react-native-reanimated';
import { interpolateAnimation } from '../../animations/animations';
import { TapGestureHandler } from 'react-native-gesture-handler';
import toastr from '../../helpers/toastr';

const { width } = Dimensions.get('window');
const { timing } = Animated;
const { StatusBarManager } = NativeModules;

let _keyboardWillShowSubscription: EmitterSubscription | undefined;
let _keyboardDidShowSubscription: EmitterSubscription | undefined;
let _keyboardWillHideSubscription: EmitterSubscription | undefined;
let _keyboardDidHideSubscription: EmitterSubscription | undefined;

export class Chat extends Component<Props, State> {

	private _scrollView: ScrollView;
	private _statusBarListener: EmitterSubscription;

	private animatedValues: AnimationValues = {
		newMessages: new Animated.Value(0)
	};

	private animatedStyles: AnimationStyles = {
		newMessagesButtonOpacity: 0
	};

	public constructor(props: Props) {
		super(props);

		this.state = {
			otherUserId: undefined,
			chatId: undefined,
			messageText: '',
			scrolledOffBottom: false,
			newMessageCount: 0,
			lastContentHeight: 1,
			isLoading: true,
			allowOldMessages: false,
			scrollingDown: false,
			statusBarHeight: 0,
			isUnMounting: false
		};

		this.animatedValues = {
			newMessages: new Animated.Value(0)
		};

		this.animatedStyles = {
			newMessagesButtonOpacity: interpolateAnimation(this.animatedValues.newMessages, [ 0, 1 ], [ 0, 1 ])
		};
	}

	public componentDidUpdate = (p: Props, s: State): void => {
		const newMessageCount: number = this.props.messages.length - p.messages.length;

		if (this.state.isLoading) setTimeout(() => this._scrollView.scrollToEnd({ animated: false }));
		else if (newMessageCount && !this.state.scrolledOffBottom && !this.props.isLastMessageByOwnUser) setTimeout(() => this._scrollView.scrollToEnd());

		if (this.state.isLoading && this.props.messages.length && newMessageCount) this.setState({ isLoading: false });
		if (newMessageCount && this.state.scrolledOffBottom && this.props.lastContentType === 'NEW' && !this.props.isLastMessageByOwnUser)
			this._showNewMessagesFloatButton(newMessageCount);
		if (newMessageCount && this.state.scrolledOffBottom && this.props.lastContentType === 'NEW' && this.props.isLastMessageByOwnUser)
			setTimeout(() => this._scrollView.scrollToEnd());
		if (this.props.lastContentType === 'NEW' && this.props.isLastMessageByOwnUser && this.props.localMessageCount < p.localMessageCount) {
			setTimeout(() => this._scrollView.scrollToEnd({ animated: true }));
		}
	}

	private _mountScreen = async (): Promise<void> => { // Triggered when this screen renders (navigated to)
		const otherUserId: string = this.props.navigation.getParam('otherUserId');
		const chatId: string = this.props.navigation.getParam('chatId');

		this.setState({ otherUserId, chatId });

		await this.props.chatSubscribe(otherUserId, chatId);

		if (this._scrollView) {
			const platform: string = Platform.OS;

			_keyboardWillShowSubscription = platform === 'ios' ?
				Keyboard.addListener('keyboardWillShow', () => this._scrollView.scrollToEnd({ animated: false })) :
				undefined;
			_keyboardDidShowSubscription = platform === 'android' ?
				Keyboard.addListener('keyboardDidShow', () => this._scrollView.scrollToEnd({ animated: false })) :
				undefined;
			_keyboardWillHideSubscription = platform === 'ios' ?
				Keyboard.addListener('keyboardWillHide', () => this._scrollView.scrollToEnd({ animated: false })) :
				undefined;
			_keyboardDidHideSubscription = platform === 'android' ?
				Keyboard.addListener('keyboardDidHide', () => this._scrollView.scrollToEnd({ animated: false })) :
				undefined;
		}

		this._scrollView.scrollToEnd({ animated: false });

		if (Platform.OS === 'ios') {
			StatusBarManager.getHeight((statusBarFrameData: any) => {
				this.setState({ statusBarHeight: statusBarFrameData.height });
			});
		}

		this._statusBarListener = StatusBarIOS.addListener('statusBarFrameWillChange', (statusBarData: any) => {
			this.setState({ statusBarHeight: statusBarData.frame.height });
		});
	}

	private _unmountScreen = async (): Promise<void> => { // Triggered when the screen is navigated away from
		const { otherUserId, chatId } = this.state;
		if (otherUserId) await this.props.chatUnsubscribe(otherUserId);

		if (_keyboardWillShowSubscription) _keyboardWillShowSubscription.remove();
		if (_keyboardDidShowSubscription) _keyboardDidShowSubscription.remove();
		if (_keyboardWillHideSubscription) _keyboardWillHideSubscription.remove();
		if (_keyboardDidHideSubscription) _keyboardDidHideSubscription.remove();
	}

	public async componentDidMount(): Promise<void> {
		await this._mountScreen();
	}

	public async componentWillUnmount(): Promise<void> {
		await this._unmountScreen();
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
		const { otherUserId, chatId } = this.state;

		if (!this.state.messageText.trim()) return toastr.warning('Message content cannot be empty');
		if (!chatId) return toastr.warning('Chat has not loaded');
		if (!otherUserId) return toastr.warning('No user selected');

		await this.props.sendMessage(chatId, messageText.trim(), otherUserId);

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
		if (this.state.scrollingDown) return;
		this.setState({ scrollingDown: true });

		this._scrollView.scrollToEnd();

		timing(this.animatedValues.newMessages, {
			duration: 100,
			toValue: 0,
			easing: Easing.inOut(Easing.ease)
		}).start(() => this.setState({ newMessageCount: 0, scrollingDown: false }));
	}

	private _renderMessage = (message: Message): ReactElement => {
		return <View style={ [
			styles.messageContainer,
			message.userOwnMessage ? { alignSelf: 'flex-end' } : { },
			message.localMessage ? { backgroundColor: 'red' } : { }
		] } key={ message.sk }>
			{
				!message.userOwnMessage &&
					<TouchableOpacity
						style={ styles.avatarContainer }
						onPress={ (): boolean => this.props.navigation.navigate('ChatOtherProfile', { userId: message.createdBy.userId })}
					>
						<Image style={ styles.avatar } source={ { uri: message.createdBy.avatar } } />
					</TouchableOpacity>
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
					<View style={ styles.avatarContainer }>
						<Image style={ [ styles.avatar, styles.ownAvatar ] } source={ { uri: message.createdBy.avatar } } />
					</View>
			}
		</View>;
	}

	private _renderMessageScrollView = (): ReactElement => {
		return (
			<ScrollView
				style={ styles.chatWindow }
				ref={ (ref: ScrollView): void => { this._scrollView = ref; } }
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
		);
	}

	private _renderNavigationEvents = (): ReactElement =>
		<NavigationEvents
			onWillFocus={ this._mountScreen }
			onDidBlur={ this._unmountScreen }
		/>

	public render(): ReactElement {
		return (
			<KeyboardAvoidingView style={ { flex: 1, justifyContent: 'center' } } behavior={ Platform.OS === 'ios' ? 'height' : undefined }
				keyboardVerticalOffset={ this.state.statusBarHeight + 55 }
			>
				{/*{ this._renderNavigationEvents() }*/}

				{ this._renderMessageScrollView() }

				<View style={ { bottom: 0, position: 'absolute', left: 0, right: 0, backgroundColor: 'white' } }>
					<TextInput
						style={ styles.messageInput }
						placeholder='Your message'
						onChangeText={ (messageText: string): void => this.setState({ messageText }) }
						value={ this.state.messageText }
						autoCompleteType='off'
						autoCorrect={ false }
					/>
					{
						!!this.state.messageText.trim() &&
							<TouchableOpacity
								style={ styles.sendButton }
								onPress={ this.state.messageText.trim() ? this._sendMessage : undefined }
							>
								<Icon
									name='paper-plane'
									size={ 24 }
									solid
									style={ [ styles.sendButtonIcon, !this.state.messageText.trim() ? { color: '#555' } : { } ] }
								/>
							</TouchableOpacity>
					}

					{
						!!this.state.newMessageCount &&
							<TapGestureHandler
								onHandlerStateChange={ this._scrollToBottom }
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
										opacity: this.animatedStyles.newMessagesButtonOpacity,
										position: 'absolute',
										top: -60,
										width: width * 0.8,
										alignSelf: 'center',
										zIndex: 20
									} }
								>
									<Text style={ { color: 'white', fontWeight: 'bold', alignSelf: 'center' } }>{ this.state.newMessageCount } New Messages</Text>
								</Animated.View>
							</TapGestureHandler>
					}
				</View>
			</KeyboardAvoidingView>
		);
	}
}

const mapStateToProps = (state: AppState): ChatState => ({
	// ...state.chatReducer,
	...state.chatMessagesReducer
});

export default connect(mapStateToProps, {
	chatSubscribe,
	chatUnsubscribe,
	getChatMessages,
	sendMessage
})(Chat);
