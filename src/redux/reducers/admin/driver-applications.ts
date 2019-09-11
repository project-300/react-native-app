import {
	STORE_APPLICATIONS
} from '../../../constants/redux-actions';
import { AdminDriverApplicationsState } from '../../../types/redux-reducer-state-types';
import { AdminDriverApplicationsActionTypes } from '../../../types/redux-action-types';
import SubReceiver, { CollectionItem } from '../../subscriptions';

const initialState: AdminDriverApplicationsState = {
	applications: []
};

const adminDriverApplicationsReducer = (
	state: AdminDriverApplicationsState = initialState,
	action: AdminDriverApplicationsActionTypes): AdminDriverApplicationsState => {
	switch (action.type) {
		case STORE_APPLICATIONS:
			const applications = SubReceiver.updateCollection(action.payload, [ ...state.applications ] as CollectionItem[]);
			return { ...state, applications };
		default:
			return state;
	}
};

export default adminDriverApplicationsReducer;
