import { Dimensions, StyleSheet } from 'react-native';
import { Styles } from './interfaces';

const { width } = Dimensions.get('window');

const styles: Styles = StyleSheet.create<Styles>({
	closeButton: {
		height: 40,
		width: 40,
		backgroundColor: 'white',
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		top: -40,
		left: (width / 2) - 20,
		shadowOffset: {
			width: 2,
			height: 2
		},
		shadowColor: 'black',
		shadowOpacity: 0.2,
		elevation: 3
	}
});

export default styles;
