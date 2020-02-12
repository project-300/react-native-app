import {
	USER_PROFILE_REQUEST,
	USER_PROFILE_RECEIVED,
	USER_PROFILE_FAILURE,
	UPLOAD_AVATAR_REQUEST,
	UPLOAD_AVATAR_SUCCESS,
	UPLOAD_AVATAR_FAILURE,
	UPDATE_INTERESTS_FAILURE,
	UPDATE_INTERESTS_SUCCESS,
	UPDATE_INTERESTS_REQUEST
} from '../../../constants/redux-actions';
import { AppActions } from '../../../types/redux-action-types';
import { User } from '@project-300/common-types';
import { Dispatch } from 'redux';
import toastr from '../../../helpers/toastr';
import { GetUserProfileResult, HttpResponse, S3SecretKeyResult } from '../../../types/http-responses';
import HttpAPI from '../../../api/http';
import { Response as ResizedResponse } from 'react-native-image-resizer';
import { ReduceImage } from '../../../helpers/image-resizing';
import { S3_CONFIG } from '../../../../environment/env';
import { RNS3 } from 'react-native-aws3';
import { S3_CONFIG_TYPE } from '../../../types/aws';
import { ImagePickerResponse } from '../../../types/images';
import { UserService } from '../../../services/user';

export const userProfileRequest = (): AppActions => ({ type: USER_PROFILE_REQUEST });

export const userProfileReceived = (user: User): AppActions => ({ type: USER_PROFILE_RECEIVED, user });

export const userProfileFailure = (): AppActions => ({ type: USER_PROFILE_FAILURE });

export const uploadAvatarRequest = (): AppActions => ({ type: UPLOAD_AVATAR_REQUEST });

export const uploadAvatarSuccess = (avatarURL: string): AppActions => ({ type: UPLOAD_AVATAR_SUCCESS, avatarURL });

export const uploadAvatarFailure = (): AppActions => ({ type: UPLOAD_AVATAR_FAILURE });

export const updateInterestsRequest = (): AppActions => ({ type: UPDATE_INTERESTS_REQUEST });

export const updateInterestsSuccess = (interests: string[]): AppActions => ({ type: UPDATE_INTERESTS_SUCCESS, interests });

export const updateInterestsFailure = (): AppActions => ({ type: UPDATE_INTERESTS_FAILURE });

export const updateInterests = (interests: string[]): (dispatch: Dispatch) => Promise<void | boolean> => {
	return async (dispatch: Dispatch): Promise<void | boolean > => {
		dispatch(updateInterestsRequest());

		try {
			const res: { success: boolean } = await UserService.updateUser({ interests });

			if (res.success) {
				dispatch(updateInterestsSuccess(interests));
				toastr.success(`Your interests has been successfully updated`);
				return true;
			}

			throw Error('Unable to update interests');
		} catch (err) {
			dispatch(updateInterestsFailure());
			toastr.error(err.message || err.description);
			return false;
		}
	};
};

export const uploadAvatar = (img: ImagePickerResponse): (dispatch: Dispatch) => Promise<void | boolean> => {
	return async (dispatch: Dispatch): Promise<void | boolean > => {
		dispatch(uploadAvatarRequest());

		try {
			const keyResponse: HttpResponse = await HttpAPI.getS3SecretKey();

			if (!keyResponse.success) throw Error('Unable to upload avatar');

			const secretKey: string = (keyResponse as S3SecretKeyResult).secretKey;
			const rs: ResizedResponse = await ReduceImage(img, 500);

			const file = {
				uri: rs.uri,
				name: img.fileName && img.fileName.toLowerCase(),
				type: img.type || 'image/jpeg'
			};

			const config: S3_CONFIG_TYPE = {
				...S3_CONFIG,
				keyPrefix: 'avatars/',
				secretKey,
				successActionStatus: 201
			};

			const uploadRes = await RNS3.put(file, config); // Upload to AWS S3 Bucket

			if (uploadRes.status !== 201) return toastr.error('Unable to upload new avatar');
			const avatarURL: string = uploadRes.body.postResponse.location;

			const saveRes = await UserService.updateUser({ avatar: avatarURL });

			if (saveRes.success) {
				dispatch(uploadAvatarSuccess(avatarURL));
				toastr.success(`Your avatar has been successfully updated`);
				return true;
			}

			throw Error('Unable to upload avatar');
		} catch (err) {
			dispatch(uploadAvatarFailure());
			toastr.error(err.message);
			return false;
		}
	};
};

export const getUserProfile = (userId: string): (dispatch: Dispatch) => Promise<void | boolean> => {
	return async (dispatch: Dispatch): Promise<void | boolean> => {
		dispatch(userProfileRequest());

		try {
			const profileRes: { success: true; user: User } = await UserService.getUser(userId);
			const user: User = (profileRes as GetUserProfileResult).user;

			if (profileRes.success) {
				dispatch(userProfileReceived(user));
				return true;
			}

			throw Error('Unable to retrieve profile');
		} catch (err) {
			dispatch(userProfileFailure());
			toastr.error(err.message);
			return false;
		}
	};
};
