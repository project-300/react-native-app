import {
	USER_PROFILE_SUB_REQUEST,
	USER_PROFILE_SUB_RECEIVED,
	USER_PROFILE_SUB_FAILURE,
	USER_PROFILE_UNSUB,
	UPLOAD_AVATAR_REQUEST,
	UPLOAD_AVATAR_SUCCESS,
	UPLOAD_AVATAR_FAILURE,
	UPDATE_INTERESTS_FAILURE,
	UPDATE_INTERESTS_SUCCESS,
	UPDATE_INTERESTS_REQUEST
} from '../../../constants/redux-actions';
import { AppActions } from '../../../types/redux-action-types';
import { SubscriptionPayload } from '@project-300/common-types';
import { Dispatch } from 'redux';
import toastr from '../../../helpers/toastr';
import { HttpResponse, S3SecretKeyResult } from '../../../types/http-responses';
import HttpAPI from '../../../api/http';
import { Response as ResizedResponse } from 'react-native-image-resizer';
import { ReduceImage } from '../../../helpers/image-resizing';
import { S3_CONFIG } from '../../../../environment/env';
import { userId } from '../../../auth';
import { RNS3 } from 'react-native-aws3';
import { S3_CONFIG_TYPE } from '../../../types/aws';
import { ImagePickerResponse } from '../../../types/images';

export const userProfileSubRequest = (): AppActions => ({ type: USER_PROFILE_SUB_REQUEST });

export const userProfileUnsub = (): AppActions => ({ type: USER_PROFILE_UNSUB });

export const userProfileSubReceived = (payload: SubscriptionPayload): AppActions => ({ type: USER_PROFILE_SUB_RECEIVED, payload });

export const userProfileSubFailure = (payload: SubscriptionPayload): AppActions => ({ type: USER_PROFILE_SUB_FAILURE, payload });

export const uploadAvatarRequest = (): AppActions => ({ type: UPLOAD_AVATAR_REQUEST });

export const uploadAvatarSuccess = (): AppActions => ({ type: UPLOAD_AVATAR_SUCCESS });

export const uploadAvatarFailure = (): AppActions => ({ type: UPLOAD_AVATAR_FAILURE });

export const updateInterestsRequest = (): AppActions => ({ type: UPDATE_INTERESTS_REQUEST });

export const updateInterestsSuccess = (interests: string[]): AppActions => ({ type: UPDATE_INTERESTS_SUCCESS, interests });

export const updateInterestsFailure = (): AppActions => ({ type: UPDATE_INTERESTS_FAILURE });

export const updateInterests = (interests: string[]): (dispatch: Dispatch) => Promise<void | boolean> => {
	return async (dispatch: Dispatch): Promise<void | boolean > => {
		dispatch(updateInterestsRequest());

		try {
			const saveRes = await HttpAPI.updateInterests({
				interests,
				userId: await userId()
			});

			if (saveRes.success) {
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

			const saveRes = await HttpAPI.updateAvatar({
				avatarURL: uploadRes.body.postResponse.location,
				userId: await userId()
			});

			if (saveRes.success) {
				dispatch(uploadAvatarSuccess());
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
