import { NAVIGATE_TO } from '../../constants/redux-actions';
import { CustomNavigationState } from '../../types/redux-reducer-state-types';
import { NavigationActionTypes } from '../../types/redux-action-types';

const initialState: CustomNavigationState = {
	navigateToRoute: '',
	navigationParams: { }
};

const customNavigationReducer = (state: CustomNavigationState = initialState, action: NavigationActionTypes): CustomNavigationState => {
	switch (action.type) {
		case NAVIGATE_TO:
			return { ...state, navigateToRoute: action.route, navigationParams: action.params };
		default:
			return state;
	}
};

export default customNavigationReducer;
