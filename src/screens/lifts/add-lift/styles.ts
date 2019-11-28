import { StyleSheet } from 'react-native';
import { Styles } from './interfaces';

const styles = StyleSheet.create<Styles>({
	container: {
		backgroundColor: '#FFF'
    },
    map: {
        ...StyleSheet.absoluteFillObject
    }
});

export default styles;
