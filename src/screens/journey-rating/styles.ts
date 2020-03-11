import { StyleSheet } from 'react-native';
import { Styles } from './interfaces';
import { Colours } from '../../constants/theme';

const styles: Styles = StyleSheet.create<Styles>({
	container: {
		flex: 1,
		backgroundColor: Colours.whiteGrey,
		paddingHorizontal: 20
	}
});

export default styles;
