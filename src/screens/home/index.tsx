import React, { Component, ReactElement } from 'react';
import { Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { userType } from '../../auth';
import styles from './styles';
import { Props, State } from './interfaces';
import { NavigationEvents } from 'react-navigation';
import { HomeState } from '../../types/redux-reducer-state-types';
import { AppState } from '../../store';

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

	public render(): ReactElement {
		const BUTTONS = [ 'Driver', 'Passenger', 'Cancel' ];
		const CANCEL_INDEX = 2;

		return (
			<View style={ { flex: 1 } }>
				<SafeAreaView style={ styles.container }>
					<View style={ { flex: 1 } }>
						<NavigationEvents onDidFocus={ this._setUserType } />
						<TouchableOpacity
							onPress={ (): void => {
								// this.state.driverView ?
								// 	ActionSheet.show(
								// 		{
								// 			options: BUTTONS,
								// 			cancelButtonIndex: CANCEL_INDEX,
								// 			title: 'View Journeys As'
								// 		},
								// 		(i: number) => {
								// 			if (BUTTONS[i] === 'Cancel') return;
								// 			this.props.navigation.navigate('MyJourneys', { driverView: BUTTONS[i] === 'Driver' });
								// 		}
								// 	) :
									this.props.navigation.navigate('MyJourneys', { driverView: false });
							} }
							style={ styles.button }>
							<Text style={ styles.buttonText }>My Journeys</Text>
						</TouchableOpacity>
					</View>
				</SafeAreaView>
			</View>
		);
	}
}

const mapStateToProps = (state: AppState): HomeState => ({ });

export default connect(mapStateToProps, { })(Home);
