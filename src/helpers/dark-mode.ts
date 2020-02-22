import { TextStyle } from 'react-native';

type buttonTypes = 'text' | 'outlined' | 'contained' | undefined;

export class DarkMode {

	public static textColorSwitch = (isDarkMode: boolean, darkMode: string, lightMode: string): TextStyle => {
		return {
			color: isDarkMode ? darkMode : lightMode
		};
	}

	public static bgColorSwitch = (isDarkMode: boolean, darkMode: string, lightMode: string): TextStyle => {
		return {
			backgroundColor: isDarkMode ? darkMode : lightMode
		};
	}

	public static bwTextColorSwitch = (isDarkMode: boolean): TextStyle => {
		return {
			color: isDarkMode ? 'white' : 'black'
		};
	}

	public static bwBgColorSwitch = (isDarkMode: boolean): TextStyle => {
		return {
			color: isDarkMode ? 'black' : 'white'
		};
	}

	public static optionSwitch = (isDarkMode: boolean, darkMode: string, lightMode: string): string => {
		return isDarkMode ? darkMode : lightMode;
	}

	public static bwSwitch = (isDarkMode: boolean): string => {
		return isDarkMode ? 'black' : 'white';
	}

	public static buttonSwitch = (isDarkMode: boolean, darkMode: buttonTypes, lightMode: buttonTypes): buttonTypes => {
		return isDarkMode ? darkMode : lightMode;
	}

}
