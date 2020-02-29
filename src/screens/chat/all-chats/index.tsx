import React, { Component, ReactElement } from 'react';
import {
	ScrollView, View, Text, Image, TouchableWithoutFeedback
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Props, State } from './interfaces';
import { getChats } from '../../../redux/actions';
import { AppState } from '../../../store';
import { AllChatState } from '../../../types/redux-reducer-state-types';
import { Chat } from '@project-300/common-types';
import { Badge } from 'react-native-paper';

export class AllChats extends Component<Props, State> {

	public constructor(props: Props) {
		super(props);
	}

	public async componentDidMount(): Promise<void> {
		await this.props.getChats();
	}

	public render(): ReactElement {
		return (
			<ScrollView contentContainerStyle={ styles.container }>
				{
					this.props.chats.map((chat: Chat) => {
						if (!chat.otherUser) return;

						return <TouchableWithoutFeedback onPress={ (): boolean => this.props.navigation.navigate('Chat', { chatId: chat.chatId }) }>
							<View style={ styles.chatContainer }>
								<View
									style={ styles.otherUserAvatarContainer }
								>
									<Image
										source={ chat.otherUser.avatar ? { uri: chat.otherUser.avatar } : require('../../../assets/images/no-avatar.jpg') }
										style={ styles.otherUserAvatar }
									/>
								</View>
								<View style={ styles.chatInfo }>
									<View style={ styles.topRow }>
										<Text
											style={ styles.otherUserName }
										>{ chat.otherUser.firstName } { chat.otherUser.lastName }</Text>
										<View style={ styles.newMessageCountContainer }>
											<Badge
												size={ 26 }
												style={ styles.newMessageCount }
											>3</Badge>
										</View>
									</View>

									<View style={ styles.messageRow }>
										<Text
											numberOfLines={ 2 }
											style={ styles.lastMessage }
										>{ chat.lastMessage }</Text>
									</View>

									<View style={ styles.bottomRow }>
										<Text
											style={ styles.updatedAt }
										>{ chat.readableDurations.updatedAt }</Text>
									</View>
								</View>
							</View>
						</TouchableWithoutFeedback>;
					})
				}
			</ScrollView>
		);
	}
}

const mapStateToProps = (state: AppState): AllChatState => ({
	...state.allChatsReducer
});

export default connect(mapStateToProps, {
	getChats
})(AllChats);
