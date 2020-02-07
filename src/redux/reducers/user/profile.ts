import {
	USER_PROFILE_REQUEST,
	USER_PROFILE_RECEIVED,
	USER_PROFILE_FAILURE,
	USER_PROFILE_UNSUB,
	UPLOAD_AVATAR_REQUEST,
	UPLOAD_AVATAR_SUCCESS,
	UPLOAD_AVATAR_FAILURE,
	UPDATE_INTERESTS_REQUEST,
	UPDATE_INTERESTS_SUCCESS,
	UPDATE_INTERESTS_FAILURE,
	UPDATE_USER_REQUEST,
	UPDATE_USER_SUCCESS,
	UPDATE_USER_FAILURE,
	UPDATE_PASSWORD_REQUEST,
	UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAILURE
} from '../../../constants/redux-actions';
import { UserProfileState } from '../../../types/redux-reducer-state-types';
import {
	UpdateAvatarSuccess,
	UpdateInterestsSuccess,
	UpdateUserFieldSuccess,
	UserProfileActionTypes,
	UserProfileSubReceived
} from '../../../types/redux-action-types';
import { User } from '@project-300/common-types';

const initialState: UserProfileState = {
	subscribing: false,
	receivedData: false,
	user: null,
	uploadingAvatar: false,
	isUpdating: false
};

const userProfileReducer = (state: UserProfileState = initialState, action: UserProfileActionTypes): UserProfileState => {
	let user: User;

	switch (action.type) {
		case USER_PROFILE_REQUEST:
			return { ...state, subscribing: true, receivedData: false };
		case USER_PROFILE_RECEIVED:
			user = (action as UserProfileSubReceived).user;
			return { ...state, subscribing: false, receivedData: true, user };
		case USER_PROFILE_FAILURE:
			return { ...state, subscribing: false, receivedData: false };
		case USER_PROFILE_UNSUB:
			return { ...state, subscribing: false, receivedData: false, user: null };
		case UPLOAD_AVATAR_REQUEST:
			return { ...state, uploadingAvatar: true };
		case UPLOAD_AVATAR_SUCCESS:
			user = state.user as User;
			const { avatarURL } = (action as UpdateAvatarSuccess);
			user.avatar = avatarURL;
			return { ...state, uploadingAvatar: false, user };
		case UPLOAD_AVATAR_FAILURE:
			return { ...state, uploadingAvatar: false };
		case UPDATE_INTERESTS_REQUEST:
			return { ...state, isUpdating: true };
		case UPDATE_INTERESTS_SUCCESS:
			const interests: string[] = (action as UpdateInterestsSuccess).interests;
			const currentUser = state.user as User;
			currentUser.interests = interests;
			return { ...state, user: currentUser, isUpdating: false };
		case UPDATE_INTERESTS_FAILURE:
			return { ...state, isUpdating: false };
		case UPDATE_USER_REQUEST:
			return { ...state, isUpdating: true };
		case UPDATE_USER_SUCCESS:
			user = state.user as User;
			const { field, value } = (action as UpdateUserFieldSuccess);
			user[field] = value;
			return { ...state, isUpdating: false, user };
		case UPDATE_USER_FAILURE:
			return { ...state, isUpdating: false };
		case UPDATE_PASSWORD_REQUEST:
			return { ...state, isUpdating: true };
		case UPDATE_PASSWORD_SUCCESS:
			return { ...state, isUpdating: false };
		case UPDATE_PASSWORD_FAILURE:
			return { ...state, isUpdating: false };
		default:
			return state;
	}
};

export default userProfileReducer;
