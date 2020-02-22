import { TextStyle, ViewStyle } from 'react-native';
import { CommonProps } from '../../types/common';
import { Journey, LastEvaluatedKey } from '@project-300/common-types';
import { AppActions } from '../../types/redux-action-types';

export interface Styles {
	container: ViewStyle;
	button: TextStyle;
	buttonText: TextStyle;
	applicationRow: ViewStyle;
	centerText: TextStyle;
	bold: TextStyle;
	cardHeader: ViewStyle;
	journeyHeading: TextStyle;
	textRow: TextStyle;
	centerSelf: ViewStyle;
	centerItems: ViewStyle;
	generalInfoContainer: ViewStyle;
	liftRowContainer: ViewStyle;
	priceBadge: ViewStyle;
	placeNames: TextStyle;
	seatsLeft: TextStyle;
	noLifts: TextStyle;
	searchField: ViewStyle;
	searchFieldSpinner: ViewStyle;
	searchFieldIcon: ViewStyle;
	reloadIcon: ViewStyle;
	reloadSpinner: ViewStyle;
}

export interface Props extends CommonProps {
	journeys: Journey[];
	lastEvaluatedKey?: LastEvaluatedKey;
	isFetching: boolean;
	isSearching: boolean;
	showingSearchResults: boolean;
	isFullList: boolean;
	getAllJourneys(isFirstCall: boolean, lastEvaluatedKey?: LastEvaluatedKey): Promise<boolean>;
	clearJourneys(): AppActions;
	searchJourneys(query: string, isFirstCall: boolean, lastEvaluatedKey?: LastEvaluatedKey): Promise<boolean>;
	updateAddUserJourney(journey: Journey): Promise<boolean>;
}

export interface State {
	searchText: string;
}
