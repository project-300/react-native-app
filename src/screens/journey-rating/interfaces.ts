import { TextStyle, ViewStyle } from 'react-native';
import { CommonProps } from '../../types/common';
import { CurrentJourneyState } from '../../types/redux-reducer-state-types';

export interface Styles {
	container: ViewStyle;
}

export interface Props extends CommonProps, CurrentJourneyState {

}

export interface State { }
