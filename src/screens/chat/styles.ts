import { Dimensions, StyleSheet } from 'react-native';
import { Styles } from './interfaces';
import { Colours } from '../../constants/theme';

const { width } = Dimensions.get('window');

let avatarContainerFlex: number = 1;
if (width <= 375) avatarContainerFlex = 1.4;

let chatWindowPadding: number = 20;
if (width <= 375) chatWindowPadding = 10;

const styles: Styles = StyleSheet.create<Styles>({
	container: {
		flex: 1
	},

	chatWindow: {
		padding: chatWindowPadding,
		marginBottom: 60
	},

	messagesContainer: {
		marginBottom: 30
	},

	messageContainer: {
		flex: 1,
		flexDirection: 'row'
	},

	messageBubble: {
		backgroundColor: '#CCC',
		padding: 12,
		marginVertical: 10,
		borderRadius: 16,
		flex: 5
	},

	messageText: {
		color: 'white',
		fontSize: 16
	},

	messageTime: {
		fontSize: 12,
		alignSelf: 'flex-end',
		marginTop: 10,
		color: 'black'
	},

	avatarContainer: {
		flex: avatarContainerFlex,
		alignSelf: 'flex-end',
		shadowColor: Colours.black,
		shadowOffset: {
			width: 0,
			height: 0
		},
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2
	},

	avatar: {
		width: 50,
		height: 50,
		borderRadius: 25,
		bottom: 10
	},

	ownAvatar: {
		alignSelf: 'flex-end'
	},

	userOwnMessageBubble: {
		alignSelf: 'flex-end',
		backgroundColor: '#177cd4'
	},

	userOwnMessageText: {
		color: 'black'
	},

	sendButton: {
		position: 'absolute',
		right: 20,
		top: 16
	},

	sendButtonIcon: {
		color: '#177cd4'
	},

	messageInput: {
		paddingRight: 40,
		height: 60,
		padding: 20,
		borderTopWidth: 0.5,
		borderColor: '#AAA'
	}
});

export default styles;
