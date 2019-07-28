import { StyleSheet } from 'react-native';
import { Styles } from './interfaces';

const styles = StyleSheet.create<Styles>({
	container: {
		flex: 1,
		backgroundColor: '#F5FCFF'
	},

	text: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10
	}
});

export default styles;
