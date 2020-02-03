import React, { Component, ReactElement } from 'react';
import { ScrollView, View } from 'react-native';
import styles from './styles';
import { Props, State } from './interfaces';
import { Button, List } from 'react-native-paper';
import { Colours } from '../../../constants/theme';

export class UpdateInterests extends Component<Props, State> {

	public constructor(props: Props) {
		super(props);

		console.log(this.props);

		this.state = {
			isUpdating: false,
			interests: this.props.currentInterests
		};
	}

	private _selectInterest = (interest: string): void => {
		let interests = this.state.interests;
		const curIndex = interests.indexOf(interest);
		if (curIndex > -1) interests.splice(curIndex, 1);
		else interests = interests.concat(interest);
		this.setState({ interests });
	}

	private _updateInterests = async (): void => {
		console.log(this.state.interests);
		await this.props.updateInterests(this.state.interests);
		this.props.close();
	}

	private _interestIcon = (interest: string): string => {
		return this.state.interests.indexOf(interest) > -1 ? 'checkbox-marked-circle' : 'checkbox-blank-circle-outline';
	}

	public render(): ReactElement {
		return (
			<View style={ styles.container }>
				<View style={ { height: this.props.panelOpen ? '80%' : '100%' } }>
					<ScrollView>
						{
							this.props.allInterests && this.props.allInterests.map(
								(interest: string) => {
									return (
										<View>
											<List.Item
												title={ interest }
												left={ (props: object): ReactElement => <List.Icon { ...props } icon={ this._interestIcon(interest) } /> }
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
						<View style={ {
							alignItems: 'center',
							marginTop: 20,
							position: 'absolute',
							bottom: 0,
							left: 0,
							right: 0,
							zIndex: 2,
							backgroundColor: 'white',
							borderTopWidth: 0.2,
							borderTopColor: Colours.lightGrey,
							paddingVertical: 10,
							shadowColor: Colours.black,
							shadowOffset: {
								width: 0,
								height: -4
							},
							shadowOpacity: 0.2,
							shadowRadius: 6,
							elevation: 12
						} }>
							<View style={ styles.buttonContainer }>
								<Button
									mode={ 'contained'}
									style={ styles.button }
									disabled={ this.state.isUpdating }
									onPress={ this._updateInterests }
								>
									Update { this.props.type }
								</Button>
							</View>

							<View style={ styles.buttonContainer }>
								<Button
									mode={ 'outlined'}
									style={ styles.button }
									onPress={ this.props.close }
								>
									Cancel
								</Button>
							</View>
						</View>
				}
			</View>
		);
	}
}
