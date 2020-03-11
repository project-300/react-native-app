import React, { Component, ReactElement } from 'react';
import { ScrollView, View } from 'react-native';
import styles from './styles';
import { Props, State } from './interfaces';
import { ActivityIndicator, Button, List, TextInput } from 'react-native-paper';
import { ContrastTheme, Theme } from '../../../constants/theme';
import formStyles from '../../../styles/forms';

export class UpdateInterests extends Component<Props, State> {

	public constructor(props: Props) {
		super(props);

		this.state = {
			interests: this.props.currentInterests || []
		};
	}

	private _selectInterest = (interest: string): void => {
		let interests = this.state.interests;
		const curIndex = interests.indexOf(interest);
		if (curIndex > -1) interests.splice(curIndex, 1);
		else interests = interests.concat(interest);
		this.setState({ interests });
	}

	private _updateInterests = async (): Promise<void> => {
		await this.props.updateInterests(this.state.interests);
		this.props.close();
	}

	private _interestIcon = (interest: string): string =>
		this.state.interests.indexOf(interest) > -1 ?
			'checkbox-marked-circle' :
			'checkbox-blank-circle-outline'

	public render(): ReactElement {
		return (
			<View style={ styles.container }>
				<View
					style={
						{
							height: this.props.panelOpen ?
								'80%' :
								'100%'
						}
					}>
					<ScrollView>
						{
							this.props.allInterests && this.props.allInterests.map(
								(interest: string) => {
									return (
										<View>
											<List.Item
												title={ interest }
												left={
													(props: object): ReactElement =>
														<List.Icon
															{ ...props }
															color={ Theme.accent }
															icon={ this._interestIcon(interest) }
														/>
												}
												onPress={ (): void => this._selectInterest(interest) }
											/>
										</View>
									);
								}
							)
						}
					</ScrollView>
				</View>

				{
					this.props.panelOpen &&
						<View style={ styles.buttonsContainer }>
							{
								this.props.isUpdating ?
									<ActivityIndicator
										animating={ this.props.isUpdating }
										color={ Theme.primary }
										size='large'
										style={ styles.spinner }
									/>
									:
									<View style={ { width: '100%', alignItems: 'center' } }>
										<View style={ styles.buttonContainer }>
											<Button
												mode='contained'
												style={ formStyles.button }
												disabled={ this.props.isUpdating }
												onPress={ this._updateInterests }
												theme={ ContrastTheme }
											>
												UPDATE MY { this.props.type }
											</Button>
										</View>

										<View style={ styles.buttonContainer }>
											<Button
												mode='outlined'
												style={ formStyles.button }
												onPress={ this.props.close }
												theme={ ContrastTheme }
											>
												CANCEL
											</Button>
										</View>
									</View>
							}
						</View>
				}
			</View>
		);
	}
}
