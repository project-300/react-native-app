import React, { Component } from 'react';
import { Appbar, Divider, Menu } from 'react-native-paper';
import { CommonProps } from './types/common';
import { storeLogout, userType } from './auth';
import { View } from 'react-native';
import { Colours, Theme, ToggleDarkMode } from './constants/theme';
import { Auth } from 'aws-amplify';
import { clearDeviceId } from './app';
import { AppState } from './store';
import { CurrentJourneyState, CustomNavigationState } from './types/redux-reducer-state-types';
import { connect } from 'react-redux';
import { PassengerPickup } from './screens/passenger-pickup';
import toastr from './helpers/toastr';
import { setCurrentJourney, resetCurrentJourneyUpdatedFlag } from './redux/actions';
import { AppActions } from './types/redux-action-types';
import { Journey } from '@project-300/common-types';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface Props extends CommonProps, CustomNavigationState, CurrentJourneyState {
	title?: string;
	subtitle?: string;
	backButton: boolean;
	options: {
		display: boolean;
		logout: boolean;
		settings: boolean;
		becomeDriver: boolean;
		darkMode: boolean;
	};
	customOptions?: CustomOption[];
	setCurrentJourney(journey?: Journey): AppActions;
	resetCurrentJourneyUpdatedFlag(): AppActions;
}

interface State {
	optionsVisible: boolean;
	driverUpgradeAvailable: boolean;
}

export interface CustomOption {
	action(): any;
	title: string;
}

export class HeaderBar extends Component<Props, State> {

	public constructor(props: Props) {
		super(props);

		this.state = {
			optionsVisible: false,
			driverUpgradeAvailable: false
		};
	}

	public componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>): void {
		if (prevProps.navigateToRoute !== this.props.navigateToRoute)
			this.props.navigation.navigate(this.props.navigateToRoute, this.props.navigationParams);
	}

	private _goBack = (): void => { this.props.navigation.goBack(); };

	private _openMenu = (): void => this.setState({ optionsVisible: true });

	private _closeMenu = (): void => this.setState({ optionsVisible: false });

	private _logout = async (): Promise<void> => {
		this._closeMenu();
		await Auth.signOut(); // Sign out from Cognito
		await storeLogout().then(() => this.props.navigation.navigate('Login')); // Sign out from local storage
		await clearDeviceId(); // Remove DeviceId (used for websockets)
	}

	private _becomeDriver = (): void => {
		this._closeMenu();
		this.props.navigation.navigate('DriverApplication');
	}

	private _settings = (): void => {
		this._closeMenu();
		this.props.navigation.navigate('Settings'); // No settings screen
	}

	private _goToCurrentJourney = (): void => {
		const { currentJourney, travellingAs } = this.props;
		if (!currentJourney) return;
		const { journeyStatus } = currentJourney;
		let route: string | null = null;

		if (this._travellingAs(travellingAs, 'Driver')) route = this._getDriverJourneyRoute(journeyStatus);
		if (this._travellingAs(travellingAs, 'Passenger')) route = this._getPassengerJourneyRoute(journeyStatus);

		if (!route) this.props.setCurrentJourney(undefined);

		if (!route && this._journeyStatus(journeyStatus, 'CANCELLED'))
			return toastr.warning('Your current journey has been Cancelled');
		if (!route && this._journeyStatus(journeyStatus, 'FINISHED'))
			return toastr.warning('Your current journey has Finished');

		if (route) this.props.navigation.navigate(route, {
			journeyKey: {
				journeyId: currentJourney.journeyId,
				createdAt: currentJourney.times.createdAt
			}
		});

		this.props.resetCurrentJourneyUpdatedFlag();
	}

	private _getPassengerJourneyRoute = (journeyStatus: string): string | null => {
		let route: string | null;

		switch (journeyStatus) {
			case 'NOT_STARTED':
				route = 'MyJourneys';
				break;
			case 'PICKUP':
				route = 'DriverTrackingMap';
				break;
			case 'WAITING':
			case 'STARTED':
			case 'PAUSED':
			case 'ARRIVED':
				route = 'PassengerJourneyOverview';
				break;
			case 'FINISHED':
				route = 'JourneyReview';
				break;
			case 'CANCELLED':
				route = null;
				break;
			default:
				route = 'MyJourneys';
		}

		return route;
	}

	private _getDriverJourneyRoute = (journeyStatus: string): string | null => {
		let route: string | null;

		switch (journeyStatus) {
			case 'NOT_STARTED':
			case 'PICKUP':
				route = 'PassengerPickup';
				break;
			case 'WAITING':
			case 'STARTED':
			case 'PAUSED':
			case 'ARRIVED':
				route = 'JourneyMap';
				break;
			case 'FINISHED':
				route = null;
				break;
			case 'CANCELLED':
				route = null;
				break;
			default:
				route = 'PassengerPickup';
		}

		return route;
	}

	private _journeyStatus = (currentStatus: string, expectedStatus: string): boolean => currentStatus === expectedStatus;

	private _travellingAs = (userType: string, expectedType: string): boolean => userType === expectedType;

	public componentDidMount = async (): Promise<void> => {
		const uType: string = await userType() as string;

		this.setState({ driverUpgradeAvailable: uType === 'Passenger' }); // Only allow passenger to upgrade
	}

	public render(): React.ReactElement {
		const { currentJourney } = this.props;

		return (
			<Appbar.Header>
				{
					this.props.backButton &&
						<Appbar.BackAction
							onPress={ this._goBack }
							color={ Theme.accent }
						/>
				}

				<Appbar.Content
					title={ this.props.title }
					subtitle={ this.props.subtitle }
					color={ Theme.accent }
					titleStyle={ { fontWeight: 'bold' } }
					style={ { alignSelf: 'center' } }
				/>

				<View>
					{
						currentJourney &&
							<Appbar.Action
								icon='car'
								onPress={ this._goToCurrentJourney }
								color={ Colours.primary }
							/>
					}

					{
						this.props.hasUpdated &&
							<Icon
								style={ { position: 'absolute', top: 11, right: 12 } }
								name={ 'circle' }
								size={ 10 }
								color={ Colours.red }
								solid
							/>
					}
				</View>

				{
					this.props.options && this.props.options.display &&
						<Menu
							visible={ this.state.optionsVisible }
							onDismiss={ this._closeMenu }
							anchor={
								<Appbar.Action
									icon='dots-vertical'
									onPress={ this._openMenu }
									color={ Theme.accent }
								/>
							}
						>

							{
								this.props.options.becomeDriver && this.state.driverUpgradeAvailable &&
									<Menu.Item
										onPress={ this._becomeDriver }
										title='Become a Driver'
									/>
							}

							{
								this.props.options.settings &&
									<Menu.Item
										onPress={ this._settings }
										title='Settings'
									/>
							}

							{
								this.props.options.darkMode &&
									<Menu.Item
										onPress={ ToggleDarkMode }
										title='Dark Mode'
									/>
							}

							{
								this.props.customOptions &&
									this.props.customOptions.map(
										(op: CustomOption) => <Menu.Item
											onPress={ op.action }
											title={ op.title }
										/>
									)
							}

							{
								this.props.options.logout &&
									<View>
										<Divider />
										<Menu.Item
											onPress={ this._logout }
											title='Logout'
										/>
									</View>
							}
						</Menu>
				}
			</Appbar.Header>
		);
	}

}

const mapStateToProps = (state: AppState): CurrentJourneyState => ({
	...state.currentJourneyReducer,
	...state.customNavigationReducer
});

export default connect(mapStateToProps, {
	setCurrentJourney,
	resetCurrentJourneyUpdatedFlag
})(HeaderBar);
