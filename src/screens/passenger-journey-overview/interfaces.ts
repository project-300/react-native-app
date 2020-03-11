import { TextStyle, ViewStyle } from 'react-native';
import { CommonProps } from '../../types/common';
import { CurrentJourneyState } from '../../types/redux-reducer-state-types';
import { AppActions } from '../../types/redux-action-types';

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
	rateExperienceButton: ViewStyle;
}

export interface Props extends CommonProps, CurrentJourneyState {
	requestRating(): AppActions;
}

export interface State {
	userId?: string;
}
