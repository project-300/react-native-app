import { TextStyle, ViewStyle } from 'react-native';
import { CommonProps } from '../../types/common';
import { CurrentJourneyState } from '../../types/redux-reducer-state-types';

export interface Styles {
	container: ViewStyle;
	contentContainer: ViewStyle;
	content: ViewStyle;
	locations: TextStyle;
	title: TextStyle;
	titleLine: TextStyle;
	actionLogList: ViewStyle;
	actionLog: TextStyle;
	actionLogText: TextStyle;
	actionLogTime: TextStyle;
}

export interface Props extends CommonProps, CurrentJourneyState {

}

export interface State { }
