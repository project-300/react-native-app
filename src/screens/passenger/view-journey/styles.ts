import { Dimensions, StyleSheet } from 'react-native';
import { Styles } from './interfaces';

const { width, height } = Dimensions.get('window');

const styles: Styles = StyleSheet.create<Styles>({
	container: {
		flex: 1,
		backgroundColor: '#F5FCFF',
		justifyContent: 'flex-end'
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
		height: '100%',
		padding: 20
	},

	places: {
		padding: 20,
		borderRadius: 4,
		marginBottom: 10,
		alignItems: 'center'
	},

	origin: {
		marginBottom: 20
	},

	placeText: {
		fontSize: 22
	},

	centerItems: {
		alignItems: 'center'
	},

	infoRow: {
		fontSize: 18,
		marginVertical: 10
	},

	bold: {
		fontWeight: 'bold'
	},

	actionButton: {
		padding: 8,
		marginVertical: 10
	},

	overlay: {
		position: 'absolute',
		left: -20,
		top: -20,
		right: -20,
		bottom: -height,
		backgroundColor: 'black',
		padding: 20
	},

	overlayButtonContainer: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: height / 10
	},

	overlayButton: {
		padding: 8,
		backgroundColor: 'white'
	}
});

export default styles;
