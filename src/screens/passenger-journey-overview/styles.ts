import { StyleSheet } from 'react-native';
import { Styles } from './interfaces';
import { Colours } from '../../constants/theme';

const styles: Styles = StyleSheet.create<Styles>({
	container: {
		flex: 1,
		backgroundColor: Colours.whiteGrey,
		paddingHorizontal: 20
	},

	contentContainer: {
		backgroundColor: Colours.white,
		borderBottomWidth: 0.5,
		borderColor: '#CCC',
		marginHorizontal: -20,
		paddingVertical: 10,
		shadowColor: Colours.black,
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.2,
		shadowRadius: 5,
		elevation: 3,
		zIndex: 100
	},

	content: {
		backgroundColor: Colours.white,
		padding: 20,
		marginHorizontal: 20
	},

	locations: {
		fontSize: 16,
		color: Colours.darkGrey,
		alignSelf: 'center',
		textAlign: 'center'
	},

	title: {
		flexDirection: 'column',
		marginBottom: 20
	},

	titleLine: {
		fontWeight: '500',
		fontSize: 20,
		alignSelf: 'center',
		textAlign: 'center',
		color: Colours.primary
	},

	actionLogList: {
		paddingTop: 20
	},

	actionLog: {
		backgroundColor: Colours.white,
		borderWidth: 0.5,
		borderColor: '#CCC',
		borderRadius: 4,
		padding: 20,
		marginVertical: 5,
		flexDirection: 'column',
		flex: 1
	},

	actionLogText: {
		color: Colours.darkGrey,
		fontSize: 16
	},

	actionLogTime: {
		color: Colours.middleGrey,
		fontSize: 12,
		alignSelf: 'flex-end',
		paddingTop: 10
	},

	rateExperienceButton: {
		marginHorizontal: 20
	}
});

export default styles;
