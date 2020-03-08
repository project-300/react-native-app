import { Dimensions, StyleSheet } from 'react-native';
import { Styles } from './interfaces';
import { Colours } from '../../constants/theme';

const { width } = Dimensions.get('window');

const styles: Styles = StyleSheet.create<Styles>({
	container: {
		flex: 1,
		backgroundColor: Colours.whiteGrey,
		padding: 20
	},

	spinner: {
		marginTop: 20
	},

	passengersList: {
		flex: 1,
		flexDirection: 'column'
	},

	passengerContainer: {
		flex: 1,
		flexDirection: 'row',
		shadowColor: Colours.black,
		shadowOffset: {
			width: 0,
			height: 0
		},
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 4,
		borderWidth: 0.5,
		borderColor: '#DDD',
		padding: 12,
		marginVertical: 10,
		borderRadius: 4,
		backgroundColor: Colours.white,
		alignItems: 'center'
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
		flex: 3
	},

	passengerListAvatar: {
		height: 70,
		width: 70,
		borderRadius: 35,
		borderWidth: 0.5,
		borderColor: '#DDD'
	},

	passengerName: {
		flex: 5,
		fontSize: 18
	},

	passengerOptionContainer: {
		flexDirection: 'row',
		marginLeft: 20,
		backgroundColor: Colours.white,
		flex: 1
	},

	passengerOption: {
		padding: 4,
		width: 36,
		height: 36,
		borderRadius: 18,
		borderWidth: 0.5,
		borderColor: '#CCC',
		justifyContent: 'center',
		alignItems: 'center'
	},

	optionSpinnerContainer: {
		flex: 1,
		marginLeft: 20
	},

	passengerOptionIcon: {
		fontSize: 24,
		alignSelf: 'center'
	},

	modalContent: {
		justifyContent: 'center',
		alignSelf: 'center',
		width: width * 0.8
	},

	modalText: {
		fontSize: 16,
		color: Colours.white,
		marginVertical: 20,
		textAlign: 'center',
		fontWeight: '500'
	},

	modalCancelButton: {
		backgroundColor: 'white',
		marginTop: 10
	},

	modalImage: {
		width: width * 0.5,
		height: width * 0.5,
		borderRadius: width * 0.25,
		alignSelf: 'center'
	},

	places: {
		textAlign: 'center',
		fontSize: 20,
		fontWeight: '600',
		marginBottom: 20,
		color: Colours.darkGrey
	},

	textBlock: {
		marginBottom: 10
	},

	button: {
		marginTop: 20
	},

	summaryText: {
		marginVertical: 10,
		textAlign: 'center',
		fontSize: 15,
		fontWeight: '500'
	}
});

export default styles;
