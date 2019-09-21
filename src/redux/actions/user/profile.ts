import {
	USER_PROFILE_SUB_REQUEST,
	USER_PROFILE_SUB_RECEIVED,
	USER_PROFILE_SUB_FAILURE,
	USER_PROFILE_UNSUB
} from '../../../constants/redux-actions';
import { AppActions } from '../../../types/redux-action-types';
import { SubscriptionPayload } from '@project-300/common-types';

export const userProfileSubRequest = (): AppActions => ({ type: USER_PROFILE_SUB_REQUEST });

export const userProfileUnsub = (): AppActions => ({ type: USER_PROFILE_UNSUB });

export const userProfileSubReceived = (payload: SubscriptionPayload): AppActions => ({ type: USER_PROFILE_SUB_RECEIVED, payload });

export const userProfileSubFailure = (payload: SubscriptionPayload): AppActions => ({ type: USER_PROFILE_SUB_FAILURE, payload });
