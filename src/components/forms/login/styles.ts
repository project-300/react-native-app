import { Dimensions, StyleSheet } from 'react-native';
import { Styles } from './interfaces';

const { width } = Dimensions.get('window');

const styles: Styles = StyleSheet.create<Styles>({
	container: {
		width: width * 0.8,
		alignSelf: 'center'
	}
});

export default styles;
