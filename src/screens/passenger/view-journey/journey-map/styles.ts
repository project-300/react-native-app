import { StyleSheet } from 'react-native';
import { Styles } from './interfaces';

const styles: Styles = StyleSheet.create<Styles>({
	mapContainer: {
		flex: 1,
		...StyleSheet.absoluteFillObject
	},

	map: {
		...StyleSheet.absoluteFillObject
	}
});

export default styles;
