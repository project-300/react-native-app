import { StyleSheet } from 'react-native';
import { Styles } from './interfaces';

const styles: Styles = StyleSheet.create<Styles>({
	container: {
		flex: 1,
		justifyContent: 'center'
	},

	text: {
		fontWeight: 'bold',
		fontSize: 16,
		textAlign: 'center',
		marginVertical: 40,
		marginHorizontal: 10
	}
});

export default styles;
