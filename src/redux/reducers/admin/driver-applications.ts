import {
	STORE_APPLICATIONS
} from '../../../constants/redux-actions';
import { AdminDriverApplicationsState } from '../../../types/redux-reducer-state-types';
import { AdminDriverApplicationsActionTypes } from '../../../types/redux-action-types';
import SubReceiver from '../../subscriptions';
import { CollectionItem, SubscriptionPayload } from '@project-300/common-types';

const initialState: AdminDriverApplicationsState = {
	applications: []
};

const adminDriverApplicationsReducer = (
	state: AdminDriverApplicationsState = initialState,
	action: AdminDriverApplicationsActionTypes): AdminDriverApplicationsState => {
	switch (action.type) {
		case STORE_APPLICATIONS:
			const applications = SubReceiver.updateCollection(
				action.payload as SubscriptionPayload,
				[ ...state.applications ] as CollectionItem[]
			);

			if (!applications) return { ...state };
			return { ...state, applications };
		default:
			return state;
	}
};

export default adminDriverApplicationsReducer;
