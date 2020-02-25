import React, { Component, ReactElement } from 'react';
import {
	Text,
	ScrollView,
	View,
	TextInput, TouchableHighlight, Image
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Props, State } from './interfaces';
import { chatSubscribe, chatUnsubscribe, getChatMessages } from '../../redux/actions';
import { AppState } from '../../store';
import { ChatState } from '../../types/redux-reducer-state-types';
import { NavigationEvents } from 'react-navigation';
import { Message } from '@project-300/common-types';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { MessageService } from '../../services/message';
import moment from 'moment';
import DatesTimes from '../../services/dates-times';

export class Chat extends Component<Props, State> {

	public constructor(props: Props) {
		super(props);

		this.state = {
			messageText: ''
		};
	}

	private _mountScreen = async (): Promise<void> => { // Triggered when this screen renders (navigated to)
		// await this._getChat();
		// await this.props.chatSubscribe(this.props.otherUserId);
		await this.props.chatSubscribe('cfa18855-2eb3-479b-9120-6ca3bef23fda');
	}

	private _unmountScreen = async (): Promise<void> => { // Triggered when the screen is navigated away from
		await this.props.chatUnsubscribe('cfa18855-2eb3-479b-9120-6ca3bef23fda');
	}

	private _sendMessage = async (): Promise<void> => {
		await MessageService.sendMessage({
			text: this.state.messageText,
			chatId: '29845242-8684-40d1-9e2f-b7d93dbaa2d7'
		}, 'cfa18855-2eb3-479b-9120-6ca3bef23fda');
	}

	private _renderMessage = (message: Message): ReactElement => {
		return <View>
			<Text>{ message.text }</Text>
		</View>;
	}

	private _renderNavigationEvents = (): ReactElement =>
		<NavigationEvents
			onWillFocus={ this._mountScreen }
			onDidBlur={ this._unmountScreen }
		/>

	public render(): ReactElement {
		console.log(this.props.messages);
		return (
			<View style={ styles.container }>
				<ScrollView style={ styles.chatWindow }>
					{ this._renderNavigationEvents() }

					{
						this.props.messages.map((message: Message) => {
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
						})
					}
				</ScrollView>
				<View>
					<TextInput
						style={ styles.messageInput }
						placeholder='Your message'
						onChangeText={ (messageText: string): void => this.setState({ messageText })}
					/>
					<Icon
						name='paper-plane'
						size={ 24 }
						solid
						style={ styles.sendButton }
						onPress={ this._sendMessage }
					/>
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
