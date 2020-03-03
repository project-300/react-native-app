import React, { Component, ReactElement } from 'react';
import {
	ScrollView,
	View,
	Text,
	Image,
	TouchableWithoutFeedback
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Props, State } from './interfaces';
import { getChats } from '../../../redux/actions';
import { AppState } from '../../../store';
import { AllChatState } from '../../../types/redux-reducer-state-types';
import { Chat } from '@project-300/common-types';
import { ActivityIndicator, Badge } from 'react-native-paper';

export class AllChats extends Component<Props, State> {

	public constructor(props: Props) {
		super(props);
	}

	public async componentDidMount(): Promise<void> {
		await this.props.getChats(); // Already subscribed in /app.tsx, but resubscribing in case connection was lost
	}

	private _setBadgeCount = (isEditing: boolean): void => {
		this.props.navigation.setParams({
			headerDetails: {
				title: isEditing ? 'Editing Profile' : 'My Profile'
			}
		});
	}

	public render(): ReactElement {
		return (
			<ScrollView contentContainerStyle={ styles.container }>
				{
					!this.props.chats.length && !this.props.fetchingChats &&
						<View
							style={ styles.noActiveChats }
						>
							<Text
								style={ styles.noActiveChatsText }
							>
								You have no active chats
							</Text>

							<Image
								resizeMode={ 'contain' }
								style={ styles.chatLogo }
								source={ require('../../../assets/images/chat.png') }
							/>
						</View>
				}

				{
					this.props.fetchingChats &&
						<ActivityIndicator
							size={ 40 }
							color={ 'red' }
						/>
				}

				{
					this.props.chats.map((chat: Chat) => {
						if (!chat.otherUser) return;

						return <TouchableWithoutFeedback
							key={ chat.chatId }
							onPress={ (): void => {
								this.props.navigation.navigate('Chat', {
									otherUserId: chat.otherUser && chat.otherUser.userId,
									chatId: chat.chatId });
							}
						}>
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
												visible={ !!chat.unreadCount }
												size={ 26 }
												style={ styles.newMessageCount }
											>{ chat.unreadCount }</Badge>
										</View>
									</View>

									<View style={ styles.messageRow }>
										<Text
											numberOfLines={ 2 }
											style={ [ styles.lastMessage, chat.unreadCount && { fontWeight: 'bold' } ] }
										>{ chat.lastMessage }</Text>
									</View>

									<View style={ styles.bottomRow }>
										<Text
											style={ styles.updatedAt }
										>{ chat.readableDurations && chat.readableDurations.updatedAt }</Text>
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
