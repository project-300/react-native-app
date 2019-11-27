import React, { Component, ReactElement } from 'react';
import {
	Text,
	ScrollView,
	TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { storeLogout } from '../../auth';
import styles from './styles';
import { Props, State } from './interfaces';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { HomeState } from '../../types/redux-reducer-state-types';
import { AppState } from '../../store';
import Icon from 'react-native-vector-icons/FontAwesome5';

export class Home extends Component<Props, State> {

	public constructor(props: Props) {
		super(props);
	}

	public static navigationOptions = ({ navigation }: { navigation: NavigationScreenProp<NavigationState, NavigationParams> }): { } => {
		return {
			headerRight: (
				<TouchableOpacity
					onPress={ (): boolean => navigation.navigate('Profile') }
				>
					<Icon name='user' size={ 22 } style={ { paddingLeft: 10, color: 'grey', marginRight: 20 } } />
				</TouchableOpacity>
			)
		};
	}

	private _logout = (): Promise<boolean> => storeLogout().then(() => this.props.navigation.navigate('Login'));

	public render(): ReactElement {
		return (
			<ScrollView contentContainerStyle={ styles.container }>
				<TouchableOpacity
					onPress={ (): boolean => this.props.navigation.navigate('Applications') }
					style={ styles.button }>
					<Text style={ styles.buttonText }>Applications (Testing only)</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={ (): boolean => this.props.navigation.navigate('DriverApplication') }
					style={ styles.button }>
					<Text style={ styles.buttonText }>Want to become a driver?</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={ (): boolean => this.props.navigation.navigate('DriverMyJourneys') }
					style={ styles.button }>
					<Text style={ styles.buttonText }>My Journeys</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={ this._logout }
					style={ styles.button }>
					<Text style={ styles.buttonText }>Logout</Text>
				</TouchableOpacity>
			</ScrollView>
		);
	}
}

const mapStateToProps = (state: AppState): HomeState => ({ });

export default connect(mapStateToProps, { })(Home);
