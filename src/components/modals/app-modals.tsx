import React, { Component, ReactElement } from 'react';
import { Button, Modal, Portal, Text } from 'react-native-paper';
import { CommonProps } from '../../types/common';
import { Image, View } from 'react-native';
import { ContrastTheme } from '../../constants/theme';
import { AppState } from '../../store';
import { CurrentJourneyState, PassengerConfirmPickupState, PassengerJourneyRatingState } from '../../types/redux-reducer-state-types';
import { connect } from 'react-redux';
import {
	setCurrentJourney,
	resetCurrentJourneyUpdatedFlag,
	clearPickupAlerts,
	passengerConfirmPickup,
	passengerCancelPickup,
	passengerJourneyRating,
	navigateTo,
	stopRequestRating,
	clearCurrentJourney
} from '../../redux/actions';
import { AppActions } from '../../types/redux-action-types';
import { DriverBrief, Journey } from '@project-300/common-types';
import modalStyles from '../../styles/modal';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface Props extends CommonProps, CurrentJourneyState, PassengerConfirmPickupState, PassengerJourneyRatingState {
	setCurrentJourney(journey?: Journey): AppActions;
	resetCurrentJourneyUpdatedFlag(): AppActions;
	clearPickupAlerts(): AppActions;
	passengerConfirmPickup(journeyId: string, createdAt: string): Promise<boolean>;
	passengerCancelPickup(journeyId: string, createdAt: string): Promise<boolean>;
	passengerJourneyRating(journeyId: string, createdAt: string, rating: number): Promise<boolean>;
	navigateTo(route: string, params?: any): AppActions;
	stopRequestRating(): AppActions;
	clearCurrentJourney(): AppActions;
}

interface State {
	showConfirmModal: boolean;
	showStartedPickupModal: boolean;
	showRateJourneyModal: boolean;
	journeyRating: number;
}

export class ModalLayer extends Component<Props, State> {

	public constructor(props: Props) {
		super(props);

		this.state = {
			showConfirmModal: false,
			showStartedPickupModal: false,
			showRateJourneyModal: false,
			journeyRating: 0
		};
	}

	private _travellingAs = (userType: string, expectedType: string): boolean => userType === expectedType;

	public componentDidMount = async (): Promise<void> => {
	}

	public componentDidUpdate = (prevProps: Readonly<Props>, prevState: Readonly<State>): void => {
		const currentJourney = this.props.currentJourney;
		const { travellingAs } = this.props;
		const prevJourney = prevProps.currentJourney;

		if (
			(!prevProps.passengerConfirmPickupAlert && this.props.passengerConfirmPickupAlert) ||
			(!prevProps.awaitingConfirmation && this.props.awaitingConfirmation)
		) this.setState({ showConfirmModal: true });

		if (
			currentJourney &&
			prevJourney &&
			this._travellingAs(travellingAs, 'Passenger') &&
			currentJourney.journeyStatus === 'PICKUP' &&
			prevJourney.journeyStatus === 'NOT_STARTED'
		) this.setState({ showStartedPickupModal: true });

		if (
			prevProps.currentJourney && this.props.currentJourney &&
			prevProps.currentJourney.journeyStatus !== this.props.currentJourney.journeyStatus &&
			this.props.currentJourney.journeyStatus === 'FINISHED' &&
			this._travellingAs(travellingAs, 'Passenger')
		) this.setState({ showRateJourneyModal: true });

		if (
			!prevProps.requestRating && this.props.requestRating
		) this.setState({ showRateJourneyModal: true });
	}

	private _hideModals = (): void => {
		this.setState({ showConfirmModal: false, showStartedPickupModal: false, showRateJourneyModal: false });
		this.props.clearPickupAlerts();
	}

	private _confirmPickup = async (): Promise<void> => {
		const { currentJourney } = this.props;
		if (!currentJourney) return;
		const { journeyId, times: { createdAt } } = currentJourney;

		this.setState({ showConfirmModal: false });
		const result: boolean = await this.props.passengerConfirmPickup(journeyId, createdAt);
		if (!result) this.setState({ showConfirmModal: true });
	}

	private _trackMyDriver = (): void => {
		const { currentJourney } = this.props;
		if (!currentJourney) return;

		this.setState({ showStartedPickupModal: false });
		this.props.resetCurrentJourneyUpdatedFlag();

		this.props.navigateTo(
			'DriverTrackingMap',
			{
				journeyKey: {
					journeyId: currentJourney.journeyId,
					createdAt: currentJourney.times.createdAt
				}
			}
		);
	}

	private _submitRating = async (): Promise<void> => {
		const { currentJourney } = this.props;
		if (!currentJourney) return;
		const { journeyId, times: { createdAt } } = currentJourney;

		this.setState({ showRateJourneyModal: false });
		const result: boolean = await this.props.passengerJourneyRating(journeyId, createdAt, this.state.journeyRating);
		if (!result) this.setState({ showRateJourneyModal: true });
		this.props.stopRequestRating();
		this.props.clearCurrentJourney();
	}

	private _renderPickupConfirmationModal = (): ReactElement => {
		const { currentJourney } = this.props;
		if (!currentJourney) return;
		const driver: DriverBrief = currentJourney.driver;

		return (
			<Modal
				visible={ this.state.showConfirmModal }
				onDismiss={ this._hideModals }
			>
				{
					currentJourney &&
						<View style={ modalStyles.modalContent }>
							{
								currentJourney.driver.avatar &&
								<Image
									style={ modalStyles.modalImage }
									source={ { uri: currentJourney.driver.avatar } }
								/>
							}

							<Text
								style={ modalStyles.modalText }
							>{ driver.firstName } { driver.lastName } has confirmed your pickup.</Text>

							<Button
								mode={ 'contained' }
								theme={ ContrastTheme }
								onPress={ this._confirmPickup }
							>Confirm Pickup</Button>

							<Button
								style={ modalStyles.modalCancelButton }
								mode={ 'outlined' }
								theme={ ContrastTheme }
								onPress={ this._hideModals }
							>Close</Button>
						</View>
				}
			</Modal>
		);
	}

	private _renderStartedPickupModal = (): ReactElement => {
		const { currentJourney } = this.props;
		if (!currentJourney) return;
		const driver: DriverBrief = currentJourney.driver;

		return (
			<Modal
				visible={ this.state.showStartedPickupModal }
				onDismiss={ this._hideModals }
			>
				{
					currentJourney &&
						<View style={ modalStyles.modalContent }>
							{
								currentJourney.driver.avatar &&
								<Image
									style={ modalStyles.modalImage }
									source={ { uri: currentJourney.driver.avatar } }
								/>
							}

							<Text
								style={ modalStyles.modalText }
							>{ driver.firstName } { driver.lastName } has started passenger pickup.</Text>

							<Button
								mode={ 'contained' }
								theme={ ContrastTheme }
								onPress={ this._trackMyDriver }
							>Track My Driver</Button>

							<Button
								style={ modalStyles.modalCancelButton }
								mode={ 'outlined' }
								theme={ ContrastTheme }
								onPress={ this._hideModals }
							>Close</Button>
						</View>
				}
			</Modal>
		);
	}

	private _renderRateJourneyModal = (): ReactElement => {
		const { currentJourney } = this.props;
		if (!currentJourney) return;

		return (
			<Modal
				visible={ this.state.showRateJourneyModal }
				onDismiss={ this._hideModals }
			>
				{
					currentJourney &&
						<View style={ modalStyles.modalContent }>
							<Text
								style={ modalStyles.modalText }
							>You have arrived at your destination. Rate your experience below.</Text>

							<View style={ modalStyles.ratingContainer }>
								<View style={ modalStyles.ratingStarContainer }>
									{
										[ 1, 2, 3, 4, 5 ].map((rating: number) => {
											return <Icon
												name={ 'star' }
												style={ modalStyles.ratingStar }
												solid={ this.state.journeyRating >= rating }
												onPress={ (): void => this.setState({ journeyRating: rating }) }
											/>;
										})
									}
								</View>
							</View>

							<Button
								mode={ 'contained' }
								theme={ ContrastTheme }
								onPress={ this._submitRating }
							>Submit</Button>

							<Button
								style={ modalStyles.modalCancelButton }
								mode={ 'outlined' }
								theme={ ContrastTheme }
								onPress={ this._hideModals }
							>Close</Button>
						</View>
				}
			</Modal>
		);
	}

	public render(): React.ReactElement {
		return (
			<Portal>
				{ this._renderPickupConfirmationModal() }
				{ this._renderStartedPickupModal() }
				{ this._renderRateJourneyModal() }
			</Portal>
		);
	}

}

const mapStateToProps = (state: AppState): CurrentJourneyState => ({
	...state.currentJourneyReducer,
	...state.passengerConfirmPickupReducer,
	...state.passengerJourneyRatingReducer
});

export default connect(mapStateToProps, {
	setCurrentJourney,
	resetCurrentJourneyUpdatedFlag,
	clearPickupAlerts,
	passengerConfirmPickup,
	passengerCancelPickup,
	passengerJourneyRating,
	navigateTo,
	stopRequestRating,
	clearCurrentJourney
})(ModalLayer);
