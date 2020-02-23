import { Dimensions, StyleSheet } from 'react-native';
import { Styles } from './interfaces';

const { width, height } = Dimensions.get('window');

const styles: Styles = StyleSheet.create<Styles>({
	container: {
		flex: 1
	},

	chatWindow: {
		padding: 20
	},

	messageBubble: {
		backgroundColor: '#555',
		padding: 20,
		marginVertical: 10,
		borderRadius: 16,
		width: width * 0.9 - 40
	},

	messageText: {
		color: 'white',
		fontSize: 16
	},

	ownUserMessage: {
		alignSelf: 'flex-end',
		alignItems: 'flex-end',
		backgroundColor: '#999'
	},

	sendButton: {
		position: 'absolute',
		right: 20,
		top: 16
	},

	messageInput: {
		paddingRight: 40,
		padding: 20,
		borderTopWidth: 0.5,
		borderColor: '#AAA'
	}
});

export default styles;
