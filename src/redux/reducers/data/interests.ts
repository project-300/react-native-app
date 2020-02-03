import {
	INTERESTS_REQUEST,
	INTERESTS_SUCCESS,
	INTERESTS_FAILURE
} from '../../../constants/redux-actions';
import { InterestsState } from '../../../types/redux-reducer-state-types';
import { InterestsSuccess, InterestsActionTypes } from '../../../types/redux-action-types';

const initialState: InterestsState = {
	requestingInterests: false,
	interests: []
};

const interestsListReducer = (state: InterestsState = initialState, action: InterestsActionTypes): InterestsState => {
	switch (action.type) {
		case INTERESTS_REQUEST:
			return { ...state, requestingInterests: true };
		case INTERESTS_SUCCESS:
			const interests = (action as InterestsSuccess).interests;
			return { ...state, requestingInterests: false, interests };
		case INTERESTS_FAILURE:
			return { ...state, requestingInterests: false };
		default:
			return state;
	}
};

export default interestsListReducer;
