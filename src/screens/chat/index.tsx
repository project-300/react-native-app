import React, { Component, ReactElement } from 'react';
import {
	Text,
	ScrollView,
	View,
	TextInput,
	Image, NativeScrollEvent, Dimensions, TouchableOpacity
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
	};

	private animatedStyles: AnimationStyles = {
		newMessagesButtonOpacity: 0
	};

	public constructor(props: Props) {
		super(props);

		this.state = {
			messageText: '',
			scrolledOffBottom: false,
			newMessageCount: 0
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

		if (newMessageCount && !this.state.scrolledOffBottom) setTimeout(() => this._scrollView.scrollToEnd());
		if (newMessageCount && this.state.scrolledOffBottom) this._showNewMessagesFloatButton(newMessageCount);
	}

	private _mountScreen = async (): Promise<void> => { // Triggered when this screen renders (navigated to)
		// await this._getChat();
		// await this.props.chatSubscribe(this.props.otherUserId);
		await this.props.chatSubscribe('cfa18855-2eb3-479b-9120-6ca3bef23fda');
		this._scrollView.scrollToEnd();
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

		await MessageService.sendMessage({
			text: messageText,
			chatId: '29845242-8684-40d1-9e2f-b7d93dbaa2d7'
		}, 'cfa18855-2eb3-479b-9120-6ca3bef23fda');
		this.setState({ messageText: '' });
	}

	private _scrollChatEvent = ({ layoutMeasurement, contentOffset, contentSize }: NativeScrollEvent): void => {
		const scrolledOffBottom: boolean = !(layoutMeasurement.height + contentOffset.y >= contentSize.height - 20);
		this.setState({ scrolledOffBottom, newMessageCount: scrolledOffBottom ? this.state.newMessageCount : 0 });

		console.log(scrolledOffBottom);
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
			<View style={ styles.container }>
				<ScrollView
					style={ styles.chatWindow }
					ref={ (ref: ScrollView): void => { this._scrollView = ref; }}
					onMomentumScrollEnd={
						({ nativeEvent }: { nativeEvent: NativeScrollEvent }): void => this._scrollChatEvent(nativeEvent)
					}
					onScrollEndDrag={
						({ nativeEvent }: { nativeEvent: NativeScrollEvent }): void => this._scrollChatEvent(nativeEvent)
					}
				>
					{ this._renderNavigationEvents() }

					<View style={ styles.messagesContainer }>
						{
							this.props.messages.map((message: Message) => this._renderMessage(message))
						}
					</View>
				</ScrollView>
				<View>
					<TextInput
						style={ styles.messageInput }
						placeholder='Your message'
						onChangeText={ (messageText: string): void => this.setState({ messageText }) }
						value={ this.state.messageText }
					/>
					<Icon
						name='paper-plane'
						size={ 24 }
						solid
						style={ [ styles.sendButton, !this.state.messageText ? { color: '#555' } : { } ] }
						onPress={ this._sendMessage }
					/>

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
			</View>
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
