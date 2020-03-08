import React, { Component, ReactElement } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Props, State } from './interfaces';
import { PassengerPickupState } from '../../types/redux-reducer-state-types';
import { AppState } from '../../store';
import {
	getPassengerPickupJourney,
	driverConfirmPassengerPickup,
	driverCancelPassengerPickup,
	cancelJourney
} from '../../redux/actions';
import { ActivityIndicator, Button, Modal, Portal } from 'react-native-paper';
import { Colours, ContrastTheme, RedTheme } from '../../constants/theme';
import { PassengerBrief } from '@project-300/common-types';
import Icon from 'react-native-vector-icons/FontAwesome5';
import formStyles from '../../styles/forms';

export class PassengerPickup extends Component<Props, State> {

	public constructor(props: Props) {
		super(props);

		const journeyKey: { journeyId: string; createdAt: string } = this.props.navigation.getParam('journeyKey');

		console.log(journeyKey);

		this.state = {
			journeyKey,
			showConfirmModal: false,
			showCancelModal: false,
			selectedPassenger: undefined
		};
	}

	public async componentDidMount(): Promise<void> {
		const { journeyKey: { journeyId, createdAt } } = this.state;
		await this.props.getPassengerPickupJourney(journeyId, createdAt);
	}

	// public async componentWillUnmount(): Promise<void> {
	//
	// }

	private _showConfirmModal = (passenger: PassengerBrief): void => {
		this.setState({ selectedPassenger: passenger, showConfirmModal: true, showCancelModal: false });
	}

	private _showCancelModal = (passenger: PassengerBrief): void => {
		this.setState({ selectedPassenger: passenger, showCancelModal: true, showConfirmModal: false });
	}

	private _confirmPassengerPickup = async (passenger: PassengerBrief): Promise<void> => {
		const { journeyKey: { journeyId, createdAt } } = this.state;
		this._hideModals();
		const result: boolean = await this.props.driverConfirmPassengerPickup(journeyId, createdAt, passenger.userId);
		if (!result) this._showConfirmModal(passenger);
	}

	private _cancelPassengerPickup = async (passenger: PassengerBrief): Promise<void> => {
		const { journeyKey: { journeyId, createdAt } } = this.state;
		this._hideModals();
		const result: boolean = await this.props.driverCancelPassengerPickup(journeyId, createdAt, passenger.userId);
		if (!result) this._showConfirmModal(passenger);
	}

	private _hideModals = (): void => {
		this.setState({ showConfirmModal: false, showCancelModal: false });
	}

	private _cancelJourney = async (): Promise<void> => {
		const { journeyKey: { journeyId, createdAt } } = this.state;
		const result: boolean = await this.props.cancelJourney(journeyId, createdAt);
		if (result) this.props.navigation.navigate('MyJourneys');
	}

	private _renderConfirmModal = (): ReactElement => {
		const { selectedPassenger } = this.state;

		return (
			<Modal
				visible={ this.state.showConfirmModal }
				onDismiss={ this._hideModals }
			>
				{
					selectedPassenger &&
						<View style={ styles.modalContent }>
							{
								selectedPassenger.avatar &&
								<Image
									style={ styles.modalImage }
									source={ { uri: selectedPassenger.avatar } }
								/>
							}

							<Text
								style={ styles.modalText }
							>Are you sure you want to confirm pickup for { selectedPassenger.firstName } { selectedPassenger.lastName }?</Text>

							<Button
								mode={ 'contained' }
								theme={ ContrastTheme }
								onPress={ (): Promise<void> => this._confirmPassengerPickup(selectedPassenger) }
							>Confirm Pickup</Button>

							<Button
								style={ styles.modalCancelButton }
								mode={ 'outlined' }
								theme={ ContrastTheme }
								onPress={ this._hideModals }
							>Cancel</Button>
						</View>
				}
			</Modal>
		);
	}

	private _renderCancelModal = (): ReactElement => {
		const { selectedPassenger } = this.state;

		return (
			<Modal
				visible={ this.state.showCancelModal }
				onDismiss={ this._hideModals }
			>
				{
					selectedPassenger &&
						<View style={ styles.modalContent }>
							{
								selectedPassenger.avatar &&
								<Image
									style={ styles.modalImage }
									source={ { uri: selectedPassenger.avatar } }
								/>
							}

							<Text
								style={ styles.modalText }
							>Are you sure you want to cancel pickup for { selectedPassenger.firstName } { selectedPassenger.lastName }?</Text>

							<Button
								mode={ 'contained' }
								theme={ { colors: { primary: 'red', accent: 'white' } } }
								onPress={ (): Promise<void> => this._cancelPassengerPickup(selectedPassenger) }
							>Cancel Pickup</Button>

							<Button
								style={ styles.modalCancelButton }
								mode={ 'outlined' }
								theme={ ContrastTheme }
								onPress={ this._hideModals }
							>Go Back</Button>
						</View>
				}
			</Modal>
		);
	}

	private _renderModals = (): ReactElement => {
		return (
			<Portal>
				{ this._renderConfirmModal() }
				{ this._renderCancelModal() }
			</Portal>
		);
	}

	public render(): ReactElement {
		const { journey } = this.props;
		const { journeyKey: { journeyId, createdAt } } = this.state;

		if (!journey) return <ActivityIndicator
			color={ Colours.primary }
			size={ 34 }
			style={ styles.spinner }
		/>;

		const { passengers, origin, destination } = journey;

		return (
			<View style={ styles.container }>
				<ScrollView>
					<Text style={ styles.places }>{ origin.name } - { destination.name }</Text>

					<Text style={ styles.textBlock }>Tick off the passengers are you pick them up.</Text>
					<Text style={ styles.textBlock }>Your location is being shared with your passengers to help them locate you easier.</Text>

					<View style={ styles.passengersList }>
						{
							passengers.map((passenger: PassengerBrief) => {
								return <View style={ [
									styles.passengerContainer,
									passenger.driverConfirmedPickup && { borderColor: Colours.green },
									passenger.driverCancelledPickup && { borderColor: Colours.red }
								] }>
									<View
										style={ styles.passengerListAvatarContainer }
									>
										<Image
											source={ passenger.avatar ? { uri: passenger.avatar } : require('../../assets/images/no-avatar.jpg') }
											style={ styles.passengerListAvatar }
										/>
									</View>

									<Text
										style={ styles.passengerName }
									>{ passenger.firstName } { passenger.lastName }</Text>

									{
										this.props.isConfirming === passenger.userId ?
											<View style={ styles.optionSpinnerContainer }>
												<ActivityIndicator
													style={ styles.optionSpinner }
													color={ Colours.primary }
													size={ 32 }
												/>
											</View> :
											<TouchableOpacity
												style={ styles.passengerOptionContainer }
												onPress={ (): void => this._showConfirmModal(passenger) }
												disabled={ passenger.driverConfirmedPickup }
											>
												<View style={ [
													styles.passengerOption,
													passenger.driverConfirmedPickup && { backgroundColor: Colours.lightestGrey }
												] }>
													<Icon
														name={ 'check' }
														color={ passenger.driverConfirmedPickup ? Colours.lightGrey : Colours.green }
														style={ styles.passengerOptionIcon }
													/>
												</View>
											</TouchableOpacity>
									}

										{
											this.props.isCancelling === passenger.userId ?
												<View style={ styles.optionSpinnerContainer }>
													<ActivityIndicator
														color={ Colours.primary }
														size={ 32 }
													/>
												</View> :
												<TouchableOpacity
													style={ styles.passengerOptionContainer }
													onPress={ (): void => this._showCancelModal(passenger) }
													disabled={ passenger.driverCancelledPickup }
												>
													<View style={ [
														styles.passengerOption,
														passenger.driverCancelledPickup && { backgroundColor: Colours.lightestGrey }
													] }>
														<Icon
															name={ 'times' }
															color={ passenger.driverCancelledPickup ? Colours.lightGrey : Colours.red }
															style={ styles.passengerOptionIcon }
														/>
													</View>
												</TouchableOpacity>
										}
								</View>;
							})
						}
					</View>

					{
						this.props.cancelledCount !== passengers.length &&
							<Text style={ styles.summaryText }>{ this.props.pickedUpCount || 0 } / { passengers.length } Passengers Picked Up</Text>
					}

					{
						!!this.props.cancelledCount && this.props.cancelledCount !== passengers.length &&
							<Text style={ styles.summaryText }>You have cancelled pickup for { this.props.cancelledCount } / { passengers.length } Passengers</Text>
					}

					{
						this.props.cancelledCount === passengers.length &&
							<Text style={ [ styles.summaryText, { color: 'red' } ] }>You have cancelled pickup for ALL Passengers</Text>
					}

					{
						this.props.cancelledCount !== passengers.length &&
							<Button
								mode={ 'contained' }
								theme={ ContrastTheme }
								style={ [ formStyles.button, styles.button ] }
								disabled={ this.props.totalCount !== passengers.length }
								onPress={ (): boolean => this.props.navigation.navigate('JourneyMap', { journeyKey: { journeyId, createdAt } }) }
							>Continue</Button>
					}

					{
						this.props.cancelledCount === passengers.length &&
							<Button
								mode={ 'contained' }
								theme={ RedTheme }
								style={ [ formStyles.button, styles.button ] }
								disabled={ this.props.totalCount !== passengers.length }
								onPress={ this._cancelJourney }
								loading={ this.props.isCancellingJourney }
							>{ this.props.isCancellingJourney ? 'Cancelling Journey' : 'Cancel This Journey' }</Button>
					}
				</ScrollView>

				{ this._renderModals() }
			</View>
		);
	}
}

const mapStateToProps = (state: AppState): PassengerPickupState => ({
	...state.passengerPickupReducer,
	...state.generalJourneyActionsReducer
});

export default connect(mapStateToProps, {
	getPassengerPickupJourney,
	driverConfirmPassengerPickup,
	driverCancelPassengerPickup,
	cancelJourney
})(PassengerPickup);
