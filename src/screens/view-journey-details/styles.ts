import { Dimensions, StyleSheet } from 'react-native';
import { Styles } from './interfaces';
import { Colours, Theme } from '../../constants/theme';

const { width, height } = Dimensions.get('window');

const styles: Styles = StyleSheet.create<Styles>({
	container: {
		backgroundColor: Colours.whiteGrey,
		flex: 1
	},

	mapImageTouchable: {
		width,
		height: height / 2
	},

	mapImageContainer: {
		width,
		overflow: 'hidden',
		justifyContent: 'center'
	},

	mapImage: {
		width,
		height: height / 2
	},

	mapImageTopIcon: {
		position: 'absolute',
		top: 15,
		right: 15
	},

	mapImageBottomIcon: {
		position: 'absolute',
		bottom: 15,
		right: 15
	},

	clickToExpandText: {
		position: 'absolute',
		alignSelf: 'center',
		fontWeight: 'bold',
		fontSize: 20,
		color: '#222'
	},

	content: {
		flex: 1,
		borderTopWidth: 0.5,
		borderColor: '#DDD'
		// marginHorizontal: 20
	},

	infoBlock: {
		padding: 20,
		paddingTop: 30,
		borderRadius: 4,
		marginBottom: 10,
		marginTop: 40,
		backgroundColor: Colours.white,
		shadowColor: Colours.black,
		shadowOffset: {
			width: 0,
			height: 0
		},
		shadowOpacity: 0.1,
		shadowRadius: 4,
		// elevation: 1,
		flex: 1,
		flexDirection: 'column',
		borderWidth: 0.5,
		borderColor: '#CCC',
		alignSelf: 'stretch',
		zIndex: 100
	},

	placeText: {
		fontSize: 22,
		marginBottom: 20,
		width: width * 0.6
	},

	centerItems: {
		alignItems: 'center'
	},

	infoRow: {
		fontSize: 16,
		marginVertical: 10
	},

	bold: {
		fontWeight: '500'
	},

	actionButton: {
		marginVertical: 10,
		flex: 1
	},

	overlay: {
		position: 'absolute',
		left: -20,
		top: -20,
		right: -20,
		bottom: -height,
		backgroundColor: 'black',
		padding: 20,
		zIndex: 500
	},

	overlayButtonContainer: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: height / 10,
		marginHorizontal: 20,
		zIndex: 501
	},

	overlayButton: {
		padding: 8,
		backgroundColor: 'white'
	},

	priceBadge: {
		backgroundColor: Theme.accent,
		padding: 5,
		width: 64,
		height: 64,
		borderRadius: 32,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		right: 20,
		top: -32,
		shadowColor: Colours.black,
		shadowOffset: {
			width: 0,
			height: 0
		},
		shadowOpacity: 0.4,
		shadowRadius: 4,
		elevation: 3,
		zIndex: 100
	}
});

export default styles;
