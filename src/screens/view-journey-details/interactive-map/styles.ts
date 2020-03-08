import { StyleSheet } from 'react-native';
import { Styles } from './interfaces';

const styles: Styles = StyleSheet.create<Styles>({
	container: {
		flex: 1
	},

	mapContainer: {
		flex: 1,
		...StyleSheet.absoluteFillObject
	},

	map: {
		flex: 1,
		...StyleSheet.absoluteFillObject
	}
});

export default styles;
