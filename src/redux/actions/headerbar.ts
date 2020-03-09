import { CURRENT_JOURNEY_SUB_RECEIVED, CURRENT_JOURNEY, RESET_CURRENT_JOURNEY_UPDATED_FLAG } from '../../constants/redux-actions';
import { AppActions } from '../../types/redux-action-types';
import { Journey, SubscriptionPayload, UserTypes } from '@project-300/common-types';
import { Dispatch } from 'redux';
import { JourneyService } from '../../services/journey';

export const currentJourneySubReceived = (payload: SubscriptionPayload, userId: string): AppActions => ({ type: CURRENT_JOURNEY_SUB_RECEIVED, payload, userId });

export const setCurrentJourney = (onAppLoad: boolean, journey?: Journey, travellingAs?: UserTypes): AppActions => ({ type: CURRENT_JOURNEY, onAppLoad, journey, travellingAs });

export const resetCurrentJourneyUpdatedFlag = (): AppActions => ({ type: RESET_CURRENT_JOURNEY_UPDATED_FLAG });

export const getCurrentJourney = (onAppLoad: boolean = false): (dispatch: Dispatch) => Promise<void> => {
	return async (dispatch: Dispatch): Promise<void> => {
		try {
			const result: { success: boolean; journey: Journey; travellingAs: UserTypes } = await JourneyService.getCurrentJourney();
			console.log(result);

			if (result.success && result.journey) dispatch(setCurrentJourney(onAppLoad, result.journey, result.travellingAs));
		} catch (err) {
			console.log(err);
		}
	};
};
