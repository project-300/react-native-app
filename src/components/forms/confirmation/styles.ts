import { StyleSheet } from 'react-native';
import { Styles } from './interfaces';
import { Colours } from '../../../constants/theme';

const styles: Styles = StyleSheet.create<Styles>({
	container: {
		flex: 1,
		justifyContent: 'center'
	},

	text: {
		fontWeight: '500',
		fontSize: 16,
		textAlign: 'center',
		marginVertical: 40,
		marginHorizontal: 10,
		color: Colours.white
	}
});

export default styles;
