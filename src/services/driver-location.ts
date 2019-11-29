import { AsyncStorage } from 'react-native';
import { Coords } from '../types/common';

class DriverLocation {

	public static setCurrentPosition = (c: Coords): Promise<void> => AsyncStorage.setItem('region', JSON.stringify(c));

	public static getCurrentPosition = async (): Promise<Coords> => {
		const pos: string | null = await AsyncStorage.getItem('region');

		return pos ? JSON.parse(pos) as Coords : { latitude: 37.78825, longitude: -122.4324 };
	}

}

export default DriverLocation;
