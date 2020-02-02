import {
	USER_PROFILE_SUB_REQUEST,
	USER_PROFILE_SUB_RECEIVED,
	USER_PROFILE_SUB_FAILURE,
	USER_PROFILE_UNSUB,
	UPLOAD_AVATAR_REQUEST,
	UPLOAD_AVATAR_SUCCESS,
	UPLOAD_AVATAR_FAILURE,
	REMOVE_INTERESTS
} from '../../../constants/redux-actions';
import { AppActions } from '../../../types/redux-action-types';
import { SubscriptionPayload } from '@project-300/common-types';
import { Dispatch } from 'redux';
import toastr from '../../../helpers/toastr';
import { HttpResponse } from '../../../types/http-responses';
import HttpAPI from '../../../api/http';
import { Response as ResizedResponse } from 'react-native-image-resizer';
import { ReduceImage } from '../../../helpers/image-resizing';
import { S3_CONFIG } from '../../../../environment/env';
import { userId } from '../../../auth';
import { Response as ImageResponse } from 'react-native-image-picker';
import { RNS3 } from 'react-native-aws3';
import { S3_CONFIG_TYPE } from '../../../types/aws';

export const userProfileSubRequest = (): AppActions => ({ type: USER_PROFILE_SUB_REQUEST });

export const userProfileUnsub = (): AppActions => ({ type: USER_PROFILE_UNSUB });

export const userProfileSubReceived = (payload: SubscriptionPayload): AppActions => ({ type: USER_PROFILE_SUB_RECEIVED, payload });

export const userProfileSubFailure = (payload: SubscriptionPayload): AppActions => ({ type: USER_PROFILE_SUB_FAILURE, payload });

export const uploadAvatarRequest = (): AppActions => ({ type: UPLOAD_AVATAR_REQUEST });

export const uploadAvatarSuccess = (): AppActions => ({ type: UPLOAD_AVATAR_SUCCESS });

export const uploadAvatarFailure = (): AppActions => ({ type: UPLOAD_AVATAR_FAILURE });

export const removeInterests = (toRemove: string[]): AppActions => ({ type: REMOVE_INTERESTS, toRemove });

export const uploadAvatar = (img: ImageResponse): (dispatch: Dispatch) => Promise<void | boolean> => {
	return async (dispatch: Dispatch): Promise<void | boolean > => {
		dispatch(uploadAvatarRequest());

		try {
			const keyResponse: HttpResponse = await HttpAPI.getS3SecretKey();

			if (!keyResponse.success) throw Error('Unable to upload avatar');

			const rs: ResizedResponse = await ReduceImage(img, 500);

			const file = {
				uri: rs.uri,
				name: img.fileName.toLowerCase(),
				type: img.type || 'image/jpeg'
			};

			const config: S3_CONFIG_TYPE = {
				...S3_CONFIG,
				keyPrefix: 'avatars/',
				secretKey: keyResponse.secretKey,
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
