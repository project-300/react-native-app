import React, { Component, ReactElement } from 'react';
import { Text, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { storeLogout, userType } from '../../auth';
import styles from './styles';
import { Props, State } from './interfaces';
import { NavigationEvents, NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { HomeState } from '../../types/redux-reducer-state-types';
import { AppState } from '../../store';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ActionSheet } from 'native-base';

export class Home extends Component<Props, State> {
	public constructor(props: Props) {
		super(props);

		this.state = {
			driverView: false
		};
	}

	private _setUserType = async (): Promise<void> => {
		const uType: string = await userType() as string;

		this.setState({ driverView: uType === 'Driver' });
	}

	public static navigationOptions = ({ navigation }: { navigation: NavigationScreenProp<NavigationState, NavigationParams> }): { } => {
		return {
			headerRight: (
				<TouchableOpacity
					onPress={ (): boolean => navigation.navigate('Profile') }
				>
					<Icon
						name={ 'user' }
						size={ 22 }
						style={ { paddingLeft: 10, color: 'grey', marginRight: 20 } }
					/>
				</TouchableOpacity>
			)
		};
	}

	private _logout = (): Promise<boolean> => storeLogout().then(() => this.props.navigation.navigate('OpeningHome'));

	public render(): ReactElement {
		const BUTTONS = [ 'Driver', 'Passenger', 'Cancel' ];
		const CANCEL_INDEX = 2;

		return (
			<ScrollView contentContainerStyle={ styles.container }>
				<NavigationEvents onDidFocus={ this._setUserType } />
				{
					!this.state.driverView &&
						<TouchableOpacity
							onPress={ (): boolean => this.props.navigation.navigate('DriverApplication') }
							style={ styles.button }>
							<Text style={ styles.buttonText }>Want to become a driver?</Text>
						</TouchableOpacity>
				}

				{
					this.state.driverView &&
						<TouchableOpacity
							onPress={ (): boolean => this.props.navigation.navigate('NewJourney') }
							style={ styles.button }>
							<Text style={ styles.buttonText }>Create A Journey</Text>
						</TouchableOpacity>
				}

				<TouchableOpacity
					onPress={ (): void => {
						this.state.driverView ?
							ActionSheet.show(
								{
									options: BUTTONS,
									cancelButtonIndex: CANCEL_INDEX,
									title: 'View Journeys As'
								},
								(i: number) => {
									if (BUTTONS[i] === 'Cancel') return;
									this.props.navigation.navigate('MyJourneys', { driverView: BUTTONS[i] === 'Driver' });
								}
							) :
							this.props.navigation.navigate('MyJourneys', { driverView: false });
					} }
					style={ styles.button }>
					<Text style={ styles.buttonText }>My Journeys</Text>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={ (): boolean => this.props.navigation.navigate('AllJourneys') }
					style={ styles.button }
				>
					<Text style={ styles.buttonText }>Find A Lift</Text>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={ this._logout }
					style={ styles.logoutButton }>
					<Text style={ styles.logoutButtonText }>Logout</Text>
				</TouchableOpacity>
			</ScrollView>
		);
	}
}

const mapStateToProps = (state: AppState): HomeState => ({ });

export default connect(mapStateToProps, { })(Home);
