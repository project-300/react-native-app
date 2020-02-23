import React, { Component, ReactElement } from 'react';
import {
	Text,
	ScrollView,
	View,
	TextInput
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Props, State } from './interfaces';
import { getChat } from '../../redux/actions';
import { AppState } from '../../store';
import { ChatState } from '../../types/redux-reducer-state-types';
import { NavigationEvents } from 'react-navigation';
import { Message } from '@project-300/common-types';
import Icon from 'react-native-vector-icons/FontAwesome5';

export class Chat extends Component<Props, State> {

	public constructor(props: Props) {
		super(props);

		this.state = {
			messages: [
				{
					messageId: 'messageid123',
					chatId: 'cc19ccbb-43a0-45d4-9850-91b877004ce8',
					text: 'Hello',
					createdBy: {
						userId: '00c35391-2b2e-4155-b90d-47d6d922a245',
						firstName: 'Charles',
						lastName: 'McCarthy',
						avatar: 'https://react-native-test-upload.s3.amazonaws.com/avatars%2Fimg_0010.jpg',
						userType: 'Passenger'
					},
					readByRecipient: false,
					userOwnMessage: true,
					times: {
						createdAt: '2020-02-20T13:45:10.285Z'
					}
				},
				{
					messageId: 'messageid543',
					chatId: 'cc19ccbb-43a0-45d4-9850-91b877004ce8',
					text: 'This is a test message',
					createdBy: {
						userId: 'cfa18855-2eb3-479b-9120-6ca3bef23fda',
						firstName: 'John',
						lastName: 'Doe',
						avatar: 'https://react-native-test-upload.s3.amazonaws.com/avatars%2Fimg_0010.jpg',
						userType: 'Driver'
					},
					readByRecipient: false,
					userOwnMessage: false,
					times: {
						createdAt: '2020-02-20T13:49:42.285Z'
					}
				}
			]
		};
	}

	private _mountScreen = async (): Promise<void> => { // Triggered when this screen renders (navigated to)
		await this._getChat();
	}

	private _unmountScreen = (): void => { // Triggered when the screen is navigated away from
		// this.setState(this.initialState); // Reset the state of the component for next mount
	}

	private _getChat = async (): Promise<void> => {
		const chatRetrieved: boolean = await this.props.getChat('cfa18855-2eb3-479b-9120-6ca3bef23fda');
		if (chatRetrieved) console.log('done'); // subscribe to messages
	}

	private _sendMessage = (): void => {
		this.setState({ messages: [ ...this.state.messages, {
			messageId: 'messageid' + new Date().toISOString(),
			chatId: 'cc19ccbb-43a0-45d4-9850-91b877004ce8',
			text: this.state.messageText,
			createdBy: {
				userId: '00c35391-2b2e-4155-b90d-47d6d922a245',
				firstName: 'Charles',
				lastName: 'McCarthy',
				avatar: 'https://react-native-test-upload.s3.amazonaws.com/avatars%2Fimg_0010.jpg',
				userType: 'Passenger'
			},
			readByRecipient: false,
			userOwnMessage: true,
			times: {
				createdAt: new Date().toISOString()
			}
		} ]});
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
		return (
			<View style={ styles.container }>
				<ScrollView style={ styles.chatWindow }>
					{ this._renderNavigationEvents() }

					{
						this.state.messages.map((message: Message) => {
							return <View style={ [ styles.messageBubble, message.userOwnMessage ? styles.ownUserMessage : { } ] }>
								<Text style={ styles.messageText }>{ message.text }</Text>
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
	...state.chatReducer
});

export default connect(mapStateToProps, {
	getChat
})(Chat);
