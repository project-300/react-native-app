import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { CommonProps } from '../../types/common';
import { Journey, PassengerBrief } from '@project-300/common-types';
import { GeneralJourneyActionsState, PassengerPickupState } from '../../types/redux-reducer-state-types';

export interface Styles {
	container: ViewStyle;
	spinner: TextStyle;
	passengersList: ViewStyle;
	passengerContainer: ViewStyle;
	passengerListAvatarContainer: ViewStyle;
	passengerListAvatar: ImageStyle;
	passengerName: TextStyle;
	passengerToggle: ViewStyle;
	passengerCancel: TextStyle;
}

export interface Props extends CommonProps, PassengerPickupState, GeneralJourneyActionsState {
	journey: Journey | undefined;
	getPassengerPickupJourney(journeyId: string, createdAt: string): Promise<void>;
	beginPickup(journeyId: string, createdAt: string): Promise<void>;
	driverConfirmPassengerPickup(journeyId: string, createdAt: string, passengerId: string): Promise<boolean>;
	driverCancelPassengerPickup(journeyId: string, createdAt: string, passengerId: string): Promise<boolean>;
	cancelJourney(journeyId: string, createdAt: string): Promise<boolean>;
}

export interface State {
	journeyKey: { journeyId: string; createdAt: string };
	showConfirmModal: boolean;
	showCancelModal: boolean;
	selectedPassenger?: PassengerBrief;
}
