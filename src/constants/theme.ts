import { AsyncStorage } from 'react-native';
import { setDarkMode } from '../redux/actions';
import { store } from '../store';

export const Theme = {
	primary: 'white',
	accent: '#177cd4'
};

export const ContrastTheme = {
	colors: {
		primary: '#177cd4',
		accent: 'white'
	}
};

export const AuthTheme = {
	colors: {
		primary: '#177cd4',
		accent: 'white',
		underlineColor: 'transparent'
	}
};

export const RedTheme = {
	colors: {
		primary: 'red',
		accent: 'white'
	}
};

export const DarkTheme = {
	primary: 'black',
	accent: 'white',
	text: 'white'
};

export const Colours = {
	whiteGrey: '#FCFCFC',
	lightGrey: '#AAA',
	lighterGrey: '#CCC',
	lightestGrey: '#EEE',
	middleGrey: '#777',
	darkGrey: '#333',
	black: '#000',
	white: '#FFF',
	offWhite: '#FDFDFD',
	primary: '#177cd4',
	primaryLight: '#65A6E1',
	green: '#00a629',
	red: '#d10000'
};

/*
	This theme is used by react-native-paper (Imported in app.tsx).
	The colours are also imported in other components to style certain elements not supplied by react-native-paper.
*/

export const ToggleDarkMode = async (): Promise<void> => {
	const isDarkMode: boolean = await IsDarkMode();
	if (!isDarkMode) await AsyncStorage.setItem('darkMode', 'true');
	else await AsyncStorage.removeItem('darkMode');

	store.dispatch(setDarkMode());
};

export const IsDarkMode = async (): Promise<boolean> => {
	const darkMode: string | null = await AsyncStorage.getItem('darkMode');
	return darkMode && darkMode === 'true' || false;
};
