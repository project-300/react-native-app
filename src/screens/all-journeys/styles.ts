import { StyleSheet, TextStyle } from 'react-native';
import { Styles } from './interfaces';
import { Colours, Theme } from '../../constants/theme';

const styles: Styles = StyleSheet.create<Styles>({
	container: {
		flex: 1,
		backgroundColor: Colours.offWhite
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

	centerText: {
		alignSelf: 'center',
		fontWeight: 'bold',
		padding: 20
	},

	bold: {
		fontWeight: 'bold'
	},

	cardHeader: {
		justifyContent: 'center'
	},

	journeyHeading: {
		fontSize: 16
	},

	textRow: {
		marginBottom: 10
	},

	centerSelf: {
		alignSelf: 'center'
	},

	centerItems: {
		alignItems: 'center'
	},

	acceptedLiftNoticeContainer: {
		backgroundColor: '#69ff6b',
		paddingVertical: 10,
		paddingHorizontal: 20,
		marginBottom: 20,
		borderRadius: 4
	},

	placeNames: {
		fontSize: 22
	},

	seatsLeft: {
		fontSize: 14,
		color: '#555'
	},

	generalInfoContainer: {
		paddingTop: 20
	},

	liftRowContainer: {
		padding: 20,
		backgroundColor: 'white',
		margin: 10,
		borderWidth: 0.5,
		borderRadius: 8
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
		right: 0,
		bottom: 0,
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.4,
		shadowRadius: 6,
		elevation: 12
	},

	searchField: {
		margin: 10,
		backgroundColor: 'white'
	},

	searchFieldSpinner: {
		position: 'absolute',
		right: 20,
		top: 28
	},

	searchFieldIcon: {
		position: 'absolute',
		right: 25,
		top: 35
	},

	noLifts: {
		fontWeight: 'bold',
		fontSize: 20,
		marginTop: 20
	},

	reloadIcon: {
		alignSelf: 'center',
		margin: 10
	},

	reloadSpinner: {
		margin: 10
	}
});

export const priceBadgeText = (fontSize: number): TextStyle => ({
	color: Theme.primary,
	fontWeight: 'bold',
	fontSize
});

export default styles;
