import React, { Component } from 'react';
import { Appbar, Divider, Menu } from 'react-native-paper';
import { CommonProps } from './types/common';
import { storeLogout, userType } from './auth';
import { View } from 'react-native';
import { Theme, ToggleDarkMode } from './constants/theme';
import { Auth } from 'aws-amplify';
import { clearDeviceId } from './app';

interface Props extends CommonProps {
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
}

interface State {
	optionsVisible: boolean;
	driverUpgradeAvailable: boolean;
}

export interface CustomOption {
	action(): any;
	title: string;
}

export default class HeaderBar extends Component<Props, State> {

	public constructor(props: Props) {
		super(props);

		this.state = {
			optionsVisible: false,
			driverUpgradeAvailable: false
		};
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

	public componentDidMount = async (): Promise<void> => {
		const uType: string = await userType() as string;

		this.setState({ driverUpgradeAvailable: uType === 'Passenger' }); // Only allow passenger to upgrade
	}

	public render(): React.ReactElement {
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
				/>

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
