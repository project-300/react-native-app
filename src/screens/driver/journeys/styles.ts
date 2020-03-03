import { Dimensions, StyleSheet } from 'react-native';
import { Styles } from './interfaces';
import { Colours, Theme } from '../../../constants/theme';

const { width } = Dimensions.get('window');

const containerPadding: number = 10;
const cardWidth: number = width - (containerPadding * 2);

const styles: Styles = StyleSheet.create<Styles>({
	container: {
		paddingHorizontal: containerPadding,
		backgroundColor: Colours.whiteGrey
	},

	button: {
		backgroundColor: '#194781',
		padding: 10,
		borderRadius: 4,
		width: '100%'
	},

	buttonText: {
		alignSelf: 'center',
		color: 'white',
		fontWeight: 'bold'
	},

	applicationRow: {
		margin: 4,
		padding: 10,
		backgroundColor: '#ffedcc'
	},

	bold: {
		fontWeight: 'bold'
	},

	cardHeader : {
		justifyContent: 'center'
	},

	journeyHeading: {
		fontSize: 16
	},

	textRow: {
		marginBottom: 10
	},

	journeyCard: {
		backgroundColor: 'white',
		borderWidth: 1,
		borderColor: '#DDD',
		marginVertical: 10,
		borderRadius: 6,
		shadowColor: Colours.black,
		shadowOffset: {
			width: 0,
			height: 0
		},
		shadowOpacity: 0.1,
		shadowRadius: 6,
		elevation: 2
	},

	triangle: {
		width: 0,
		height: 0,
		backgroundColor: 'transparent',
		borderStyle: 'solid',
		borderRightWidth: width - (containerPadding * 2) - 2,
		borderTopWidth: 45,
		borderRightColor: 'transparent',
		borderTopColor: 'white',
		transform: [
			{ rotate: '180deg' }
		],
		position: 'absolute',
		bottom: 0
	},

	journeyCardHeader: {
		backgroundColor: Theme.accent,
		height: 80,
		padding: 10,
		borderTopLeftRadius: 4,
		borderTopRightRadius: 4
	},

	journeyContent: {
		flex: 1,
		flexDirection: 'column'
	},

	journeyLocations: {
		fontSize: 20,
		color: 'white'
	},

	cardLink: {
		fontSize: 16,
		marginLeft: 10,
		marginRight: 10,
		color: Theme.accent,
		fontWeight: '500'
	},

	journeyInfo: {
		flex: 1,
		alignSelf: 'center',
		paddingBottom: 15,
		paddingTop: 5
	},

	journeyOptions: {
		flexDirection: 'row-reverse',
		borderTopWidth: 0.5,
		borderTopColor: '#CCC',
		width: '100%',
		padding: 10
	},

	journeyInfoTextContainer: {
		alignSelf: 'flex-start',
		alignItems: 'center'
	},

	journeyInfoText: {
		fontSize: 16,
		color: '#555'
	},

	passengerJourneyCardHeader: {
		backgroundColor: 'orange',
		height: 80,
		padding: 10,
		borderTopLeftRadius: 4,
		borderTopRightRadius: 4
	},

	passengerTriangle: {
		width: 0,
		height: 0,
		backgroundColor: 'transparent',
		borderStyle: 'solid',
		borderRightWidth: width - (containerPadding * 2),
		borderBottomWidth: 45,
		borderRightColor: 'transparent',
		borderBottomColor: 'white',
		position: 'absolute',
		bottom: 0
	},

	passengerJourneyLocations: {
		fontSize: 20,
		color: 'white',
		alignSelf: 'flex-end'
	},

	fab: {
		position: 'absolute',
		margin: 16,
		right: 0,
		bottom: 0
	},

	passengerPanel: {
		backgroundColor: Colours.whiteGrey
	},

	passengerListContainer: {
		marginTop: 20
	},

	passengerListItem: {
		flexDirection: 'row',
		backgroundColor: 'white',
		padding: 10,
		borderRadius: 4,
		marginBottom: 10,
		borderWidth: 0.5,
		borderColor: '#CCC',
		shadowColor: Colours.black,
		shadowOffset: {
			width: 0,
			height: 0
		},
		shadowOpacity: 0.1,
		shadowRadius: 6,
		elevation: 6
	},

	passengerListAvatarContainer: {
		shadowColor: Colours.black,
		shadowOffset: {
			width: 0,
			height: 0
		},
		shadowOpacity: 0.1,
		shadowRadius: 6,
		elevation: 6,
		flex: 1
	},

	passengerListAvatar: {
		height: 70,
		width: 70,
		borderRadius: 35,
		borderWidth: 0.5,
		borderColor: '#DDD'
	},

	passengerListName: {
		fontSize: 22,
		alignSelf: 'center',
		justifyContent: 'flex-start',
		flex: 3
	},

	passengerListInfo: {
		flexDirection: 'column',
		paddingTop: 20
	},

	centerText: {
		textAlign: 'center',
		alignSelf: 'center',
		paddingBottom: 10,
		fontSize: 16
	},

	passengerArrowIcon: {
		alignSelf: 'center',
		color: '#555'
	}
});

export default styles;
