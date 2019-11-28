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
		backgroundColor: '#02b2cc',
		padding: 10,
		borderRadius: 4,
		marginTop: 10,
		width: '100%'
	},

	buttonText: {
		alignSelf: 'center',
		color: 'white',
		fontWeight: 'bold'
	},

	map: {
		...StyleSheet.absoluteFillObject
	},

	bottomPanel: {
		marginTop: 200,
		backgroundColor: 'white',
		width: '100%',
		padding: 20,
		elevation: 20
	}
});

export default styles;
