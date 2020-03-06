import { Dimensions, StyleSheet } from 'react-native';
import { Styles } from './interfaces';
import { Theme, Colours } from '../../constants/theme';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create<Styles>({
	container: {
		...StyleSheet.absoluteFill as object,
		backgroundColor: Colours.whiteGrey
	},

	avatar: {
		width,
		height: height * 0.35
	},

	userTypeTag: {
		backgroundColor: Theme.accent,
		// width: 50,
		paddingVertical: 5,
		paddingHorizontal: 15,
		borderRadius: 25,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		top: -10,
		left: 20,
		shadowOffset: {
			width: 0,
			height: 0
		},
		shadowOpacity: 0.3,
		shadowRadius: 6,
		elevation: 12
	},

	userTypeTagText: {
		color: Colours.white,
		fontWeight: 'bold'
	},

	name: {
		alignSelf: 'center',
		fontSize: 22,
		fontWeight: 'bold',
		marginBottom: 4,
		color: Colours.black,
		marginBottom: 20
	},

	editRow: {
		paddingVertical: 20
	},

	label: {
		color: Colours.middleGrey,
		fontSize: 16,
		marginBottom: 10
	},

	editText: {
		color: Colours.black,
		fontWeight: 'bold',
		fontSize: 18
	},

	panel: {
		backgroundColor: Colours.white
	},

	sectionContainer: {
		top: -30,
		backgroundColor: Colours.white,
		width: width * 0.92,
		padding: 20,
		paddingTop: 16,
		alignSelf: 'center',
		borderRadius: 10,
		shadowColor: Colours.black,
		shadowOffset: {
			width: 0,
			height: 0
		},
		shadowOpacity: 0.1,
		shadowRadius: 6,
		elevation: 6,
		borderWidth: 0.5,
		borderColor: '#DDD',
		marginBottom: 20
	},

	statsItem: {
		flexGrow: 1,
		alignContent: 'center'
	},

	statsItemText: {
		alignSelf: 'center',
		fontWeight: 'bold',
		paddingTop: 20,
		fontSize: 18,
		color: Colours.black
	},

	statsItemDesc: {
		alignSelf: 'center',
		marginTop: 6,
		fontSize: 14,
		color: Colours.middleGrey
	},

	fab: {
		position: 'absolute',
		margin: 16,
		right: 0,
		bottom: 0
	},

	editAvatarContainer: {
		backgroundColor: 'white',
		zIndex: 50,
		alignSelf: 'center',
		justifyContent: 'center',
		position: 'absolute',
		width: 100,
		height: 100,
		borderRadius: 50,
		shadowColor: Colours.black,
		shadowOffset: {
			width: 0,
			height: 0
		},
		shadowOpacity: 0.1,
		shadowRadius: 6,
		elevation: 12,
		borderWidth: 0.5,
		borderColor: Colours.lightGrey
	},

	editAvatarIcon: {
		alignSelf: 'center',
		left: 5,
		top: -2
	},

	outerColumnContainer: {
		flexDirection: 'row',
		alignContent: 'stretch'
	},

	loadingText: {
		alignSelf: 'center',
		fontWeight: 'bold',
		fontSize: 20,
		marginTop: height / 3
	},

	halfWidth: {
		width: '50%'
	},

	statsContainer: {
		flexDirection: 'row',
		alignContent: 'stretch'
	},

	messageIconBadge: {
		backgroundColor: Theme.accent,
		padding: 5,
		width: 64,
		height: 64,
		borderRadius: 32,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		right: 20,
		top: -30,
		shadowColor: Colours.black,
		shadowOffset: {
			width: 0,
			height: 0
		},
		shadowOpacity: 0.4,
		shadowRadius: 4,
		elevation: 6
	}
});

export default styles;
