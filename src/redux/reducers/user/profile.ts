import {
	USER_PROFILE_SUB_REQUEST,
	USER_PROFILE_SUB_RECEIVED,
	USER_PROFILE_SUB_FAILURE,
	USER_PROFILE_UNSUB,
	UPLOAD_AVATAR_REQUEST,
	UPLOAD_AVATAR_SUCCESS,
	UPLOAD_AVATAR_FAILURE,
	UPDATE_INTERESTS_REQUEST,
	UPDATE_INTERESTS_SUCCESS,
	UPDATE_INTERESTS_FAILURE
} from '../../../constants/redux-actions';
import { UserProfileState } from '../../../types/redux-reducer-state-types';
import { UpdateInterests, UserProfileActionTypes } from '../../../types/redux-action-types';
import { User, SubscriptionPayload } from '@project-300/common-types';

const initialState: UserProfileState = {
	subscribing: false,
	receivedData: false,
	user: null,
	uploadingAvatar: false,
	updatingInterests: false
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
		case UPDATE_INTERESTS_REQUEST:
			return { ...state, updatingInterests: true };
		case UPDATE_INTERESTS_SUCCESS:
			const interests: string[] = (action as UpdateInterests).interests;
			const currentUser = state.user as User;
			currentUser.interests = interests;
			return { ...state, user: currentUser, updatingInterests: false };
		case UPDATE_INTERESTS_FAILURE:
			return { ...state, updatingInterests: false };
		default:
			return state;
	}
};

export default userProfileReducer;
