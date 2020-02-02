import {
	USER_PROFILE_SUB_REQUEST,
	USER_PROFILE_SUB_RECEIVED,
	USER_PROFILE_SUB_FAILURE,
	USER_PROFILE_UNSUB,
	UPLOAD_AVATAR_REQUEST,
	UPLOAD_AVATAR_SUCCESS,
	UPLOAD_AVATAR_FAILURE, REMOVE_INTERESTS
} from '../../../constants/redux-actions';
import { UserProfileState } from '../../../types/redux-reducer-state-types';
import { RemoveInterests, UserProfileActionTypes } from '../../../types/redux-action-types';
import { User, SubscriptionPayload } from '@project-300/common-types';
import _ from 'lodash';

const initialState: UserProfileState = {
	subscribing: false,
	receivedData: false,
	user: null,
	uploadingAvatar: false
};

const userProfileReducer = (state: UserProfileState = initialState, action: UserProfileActionTypes): UserProfileState => {
	switch (action.type) {
		case USER_PROFILE_SUB_REQUEST:
			return { ...state, subscribing: true, receivedData: false };
		case USER_PROFILE_SUB_RECEIVED:
			const payload: SubscriptionPayload = action.payload;
			const user: User = payload.data as User;
			return { ...state, subscribing: false, receivedData: true, user };
		case USER_PROFILE_SUB_FAILURE:
			return { ...state, subscribing: false, receivedData: false };
		case USER_PROFILE_UNSUB:
			return { ...state, subscribing: false, receivedData: false, user: null };
		case UPLOAD_AVATAR_REQUEST:
			return { ...state, uploadingAvatar: true };
		case UPLOAD_AVATAR_SUCCESS:
			return { ...state, uploadingAvatar: false };
		case UPLOAD_AVATAR_FAILURE:
			return { ...state, uploadingAvatar: false };
		case REMOVE_INTERESTS:
			const toRemove: string[] = (action as RemoveInterests).toRemove;
			const currentUser = state.user as User;
			currentUser.interests = _.difference(currentUser.interests, toRemove);
			return { ...state, user: currentUser };
		default:
			return state;
	}
};

export default userProfileReducer;
