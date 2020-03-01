import { Dimensions, StyleSheet } from 'react-native';
import { Styles } from './interfaces';
import { Colours } from '../../../constants/theme';

const { width } = Dimensions.get('window');
let avatarSize: number = 80;
if (width <= 375) avatarSize = 70;

const mainContainerPadding: number = 20;
const chatContainerPadding: number = 10;
const chatContainerWidth: number = width - (mainContainerPadding * 2) - (chatContainerPadding * 2);

const styles: Styles = StyleSheet.create<Styles>({
	container: {
		flex: 1,
		padding: mainContainerPadding
	},

	chatContainer: {
		borderWidth: 0.5,
		borderColor: Colours.lightGrey,
		backgroundColor: 'white',
		marginVertical: 10,
		padding: chatContainerPadding,
		borderRadius: 2,
		flexDirection: 'row',
		shadowOffset: {
			width: -2,
			height: 2
		},
		shadowOpacity: 0.2,
		shadowRadius: 4,
		elevation: 6
	},

	otherUserAvatarContainer: {
		flex: 1,
		alignSelf: 'center'
	},

	otherUserAvatar: {
		width: chatContainerWidth * 0.25,
		height: chatContainerWidth * 0.25,
		borderRadius: (chatContainerWidth * 0.25) / 2
	},

	chatInfo: {
		flex: 3,
		flexDirection: 'column',
		paddingLeft: 20
	},

	topRow: {
		flexDirection: 'row',
		marginBottom: 20
	},

	messageRow: {
		flexDirection: 'column'
	},

	bottomRow: {
		flexDirection: 'row-reverse',
		marginTop: 10
	},

	otherUserName: {
		right: 0,
		flex: 4,
		fontWeight: 'bold',
		fontSize: 20,
		color: 'black'
	},

	newMessageCountContainer: {
		flex: 1,
		top: -20,
		right: -20,
		shadowOffset: {
			width: -1,
			height: 1
		},
		shadowOpacity: 0.4,
		shadowRadius: 2,
		elevation: 12
	},

	newMessageCount: {
		width: 26,
		height: 26,
		borderRadius: 8
	},

	lastMessage: {
		fontSize: 16,
		color: 'black'
	},

	updatedAt: {
		fontSize: 12,
		color: '#555'
	},

	noActiveChats: {
		alignItems: 'center',
		marginTop: 40
	},

	noActiveChatsText: {
		fontSize: 18,
		fontWeight: 'bold'
	},

	chatLogo: {
		width: '90%',
		height: undefined,
		aspectRatio: 1
	}
});

export default styles;
