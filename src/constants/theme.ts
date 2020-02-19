// export const Theme = {
// 	primary: '#3700B3',
// 	accent: '#03DAC5'
// };

import { AsyncStorage } from 'react-native';
import { AUTH_KEY } from './storage-keys';
import { setDarkMode } from '../redux/actions';
import { store } from '../store';

export const Theme = {
	primary: 'white',
	accent: '#3700B3'
};

export const DarkTheme = {
	primary: 'black',
	accent: 'white'
};

export const Colours = {
	whiteGrey: '#F7F7F7',
	lightGrey: '#AAA',
	middleGrey: '#777',
	darkGrey: '#333',
	black: '#000',
	white: '#FFF',
	offWhite: '#FDFDFD'
};

/*
	This theme is used by react-native-paper (Imported in app.tsx).
	The colours are also imported in other components to style certain elements not supplied by react-native-paper.
*/

export const ToggleDarkMode = async (turnOn: boolean): Promise<void> => {
	if (turnOn) await AsyncStorage.setItem('darkMode', 'true');
	else await AsyncStorage.removeItem('darkMode');

	store.dispatch(setDarkMode());
};

export const IsDarkMode = async (): Promise<boolean> => {
	const darkMode: string | null = await AsyncStorage.getItem('darkMode');
	return darkMode && darkMode === 'true' || false;
};
