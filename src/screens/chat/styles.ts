import { Dimensions, StyleSheet } from 'react-native';
import { Styles } from './interfaces';

const { width } = Dimensions.get('window');

const styles: Styles = StyleSheet.create<Styles>({
	container: {
		flex: 1
	},

	chatWindow: {
		padding: 20,
		marginBottom: 50
	},

	messagesContainer: {
		marginBottom: 30
	},

	messageContainer: {
		width: width * 0.9,
		flexDirection: 'row'
	},

	messageBubble: {
		backgroundColor: '#CCC',
		padding: 12,
		marginVertical: 10,
		borderRadius: 16,
		width: width * 0.8
	},

	messageText: {
		color: 'white',
		fontSize: 16
	},

	messageTime: {
		fontSize: 12,
		alignSelf: 'flex-end',
		marginTop: 10
	},

	avatar: {
		width: 40,
		height: 40,
		borderRadius: 20,
		alignSelf: 'flex-end',
		bottom: 10
	},

	senderAvatar: {
		right: 10
	},

	ownAvatar: {
		right: -10
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
		padding: 20,
		borderTopWidth: 0.5,
		borderColor: '#AAA'
	}
});

export default styles;
