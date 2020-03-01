import { StyleSheet } from 'react-native';
import { Styles } from './interfaces';

const styles: Styles = StyleSheet.create<Styles>({
	container: {
		flex: 1,
		backgroundColor: '#F5FCFF',
		justifyContent: 'flex-end'
	},

	mapContainer: {
		flex: 1,
		...StyleSheet.absoluteFillObject
	},

	button: {
		backgroundColor: '#38A073',
		paddingVertical: 14,
		width: '100%'
	},

	buttonText: {
		alignSelf: 'center',
		color: 'white',
		fontWeight: 'bold',
		fontSize: 24
	},

	map: {
		...StyleSheet.absoluteFillObject
	},

	bottomPanel: {
		position: 'absolute',
		bottom: 0,
		backgroundColor: 'white',
		width: '100%',
		elevation: 20
	},

	spinner: {
		position: 'absolute',
		top: 100
	},

	spinnerTextStyle: {
		color: '#FFF'
	}
});

export default styles;
