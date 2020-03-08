import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { CommonProps } from '../../types/common';
import { Journey, PassengerBrief } from '@project-300/common-types';
import { PassengerPickupState } from '../../types/redux-reducer-state-types';

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
	modalContent: ViewStyle;
	modalText: TextStyle;
	modalCancelButton: ViewStyle;
	modalImage: ImageStyle;
}

export interface Props extends CommonProps, PassengerPickupState {
	journey: Journey | undefined;
	getPassengerPickupJourney(journeyId: string, createdAt: string): Promise<void>;
	driverConfirmPassengerPickup(journeyId: string, createdAt: string, passengerId: string): Promise<boolean>;
	driverCancelPassengerPickup(journeyId: string, createdAt: string, passengerId: string): Promise<boolean>;
}

export interface State {
	journeyKey: { journeyId: string; createdAt: string };
	showConfirmModal: boolean;
	showCancelModal: boolean;
	selectedPassenger?: PassengerBrief;
}
