import { StyleSheet } from 'react-native';
import { Styles } from './interfaces';
import { Colours } from '../../../constants/theme';

const styles: Styles = StyleSheet.create<Styles>({
	container: {
		flex: 1,
		padding: 20
	},

	chatContainer: {
		borderWidth: 0.5,
		borderColor: Colours.lightGrey,
		backgroundColor: 'white',
		marginVertical: 10,
		padding: 10,
		borderRadius: 2,
		flexDirection: 'row',
		flex: 0.2,
		shadowOffset: {
			width: -2,
			height: 2
		},
		shadowOpacity: 0.2,
		shadowRadius: 4,
		elevation: 12
	},

	otherUserAvatarContainer: {
		flex: 1
	},

	otherUserAvatar: {
		width: 70,
		height: 70,
		borderRadius: 35
	},

	chatInfo: {
		flex: 3,
		flexDirection: 'column'
	},

	topRow: {
		flex: 1,
		flexDirection: 'row',
		marginBottom: 20
	},

	messageRow: {
		flex: 2,
		flexDirection: 'column'
	},

	bottomRow: {
		flex: 1,
		flexDirection: 'row-reverse',
		marginTop: 10
	},

	otherUserName: {
		right: 0,
		// marginLeft: 20,
		flex: 4,
		fontWeight: 'bold',
		fontSize: 20
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
		fontSize: 16
	},

	updatedAt: {
		fontSize: 12
	}
});

export default styles;
