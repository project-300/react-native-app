import {
	FETCHING_LIFTS_REQUEST,
	FETCHING_LIFTS_SUCCESS,
	FETCHING_LIFTS_FAILURE
} from '../constants/redux-actions';

const initialState = {
	isFetching: false,
	errorMessage: '',
	lifts: []
};

const liftsReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCHING_LIFTS_REQUEST:
			return { ...state, isFetching: true };
		case FETCHING_LIFTS_FAILURE:
			return { ...state, isFetching: false, errorMessage: action.payload };
		case FETCHING_LIFTS_SUCCESS:
			return { ...state, isFetching: false, lifts: action.payload };
		default:
			return state;
	}
};

export default liftsReducer;
