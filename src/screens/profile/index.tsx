import React, { Component, ReactElement } from 'react';
import {
	ScrollView,
	Text,
	View,
	TouchableOpacity,
	Dimensions,
	SafeAreaView,
	TouchableWithoutFeedback,
	Image
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Props, State, AnimationValues, AnimationStyles } from './interfaces';
import { UserProfileState } from '../../types/redux-reducer-state-types';
import { AppState } from '../../store';
import ImagePicker from 'react-native-image-picker';
import toastr from '../../helpers/toastr';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { EditTypes } from '../../types/common';
import { User } from '@project-300/common-types';
import Animated, { Easing } from 'react-native-reanimated';
import { UpdateUserField } from './update-user-field';
import { UpdatePassword } from './update-password';
import { ActivityIndicator, Button, Divider, FAB, IconButton, Title } from 'react-native-paper';
import { InterestChip } from '../../components/miscellaneous/interest-chip';
import { UpdateInterests } from './interests';
import {
	updateUserField,
	getInterestsList,
	uploadAvatar,
	updatePassword,
	updateInterests,
	uploadAvatarRequest,
	getUserProfile
} from '../../redux/actions';
import { AnimatedStyles } from '../../animations/styles';
import { ImagePickerResponse } from '../../types/images';
import { NavigationEvents } from 'react-navigation';
import { interpolateAnimation } from '../../animations/animations';
import { Colours, Theme } from '../../constants/theme';
import { userId } from '../../auth';
import { TapGestureHandler } from 'react-native-gesture-handler';

const { height, width } = Dimensions.get('window');
const { timing } = Animated;

export const EditFields =  {
	EMAIL: { type: 'Email Address', field: EditTypes.EMAIL },
	FIRST_NAME: { type: 'First Name', field: EditTypes.FIRST_NAME },
	LAST_NAME: { type: 'Last Name', field: EditTypes.LAST_NAME },
	PASSWORD: { type: 'Password', field: EditTypes.PASSWORD },
	INTERESTS: { type: 'Interests', field: EditTypes.INTERESTS },
	PHONE: { type: 'Phone Number', field: EditTypes.PHONE }
};

export class Profile extends Component<Props, State> {

	private animatedValues: AnimationValues = {
		fall: new Animated.Value(1),
		panelOpen: new Animated.Value(0),
		beginEditing: new Animated.Value(0)
	};

	private animatedStyles: AnimationStyles = {
		panelHeight: 0,
		editIconOpacity: 0,
		editImageOpacity: 0,
		editFieldsHeight: 0,
		panelLeftX: 0,
		panelRightX: 0,
		panelOpacity: 0
	};

	private initialState: State = {
		isOtherUser: true,
		editType: null,
		editing: false,
		readyToEdit: false,
		isSwiping: false, // Screen is swiping between view and edit,
		panelOpen: false
	};

	public constructor(props: Props) {
		super(props);
		this.state = this.initialState;
	}

	private _mountScreen = async (): Promise<void> => { // Triggered when this screen renders (navigated to)
		const uId: string = this.props.navigation.getParam('userId');

		this.setState({ isOtherUser: !!uId });

		this._setupAnimations();
		await this.props.getUserProfile(uId || await userId() as string);
		await this.props.getInterestsList();
		this._setHeaderTitle(false);
	}

	private _unmountScreen = (): void => { // Triggered when the screen is navigated away from
		this._setHeaderTitle(false);
		this.setState(this.initialState); // Reset the state of the component for next mount
	}

	private _setupAnimations = (): void => {
		this.animatedValues = {
			fall: new Animated.Value(1),
			panelOpen: new Animated.Value(0),
			beginEditing: new Animated.Value(0)
		};

		this.animatedStyles = {
			panelHeight: interpolateAnimation(this.animatedValues.panelOpen, [ 0, 1 ], [ 0, height ]),
			editIconOpacity: interpolateAnimation(this.animatedValues.beginEditing, [ 0, 1 ], [ 0, 1 ]),
			editImageOpacity: interpolateAnimation(this.animatedValues.beginEditing, [ 0, 1 ], [ 1, 0.6 ]),
			editFieldsHeight: interpolateAnimation(this.animatedValues.beginEditing, [ 0, 1 ], [ 0, 200 ]),
			panelOpacity: interpolateAnimation(this.animatedValues.beginEditing, [ 0, 1 ], [ 1, 0 ]),
			panelLeftX: interpolateAnimation(this.animatedValues.beginEditing, [ 0, 1 ], [ width / 4, (-width / 2) - 150 ]),
			panelRightX: interpolateAnimation(this.animatedValues.beginEditing, [ 0, 1 ], [ (width / 2) + 150, -width / 4 ])
		};
	}

	private _changeImage = async (): Promise<void> => {
		const options = {
			title: 'Upload Avatar',
			storageOptions: {
				skipBackup: true,
				path: 'images'
			}
		};

		await ImagePicker.showImagePicker(options, async (img: ImagePickerResponse) => { // Native image picker pops up
			if (img.error) {
				toastr.error('An error occurred');
			} else if (!img.didCancel) {
				if (!img.data || !img.fileSize) return toastr.error('Error - Invalid image selected');

				await this.props.uploadAvatar(img);
			}
		});
	}

	private openForm = (editType: string): void => { // Form will slide up from bottom
		this.setState({ editType });

		timing(this.animatedValues.panelOpen, {
			duration: 500,
			toValue: 1,
			easing: Easing.inOut(Easing.ease)
		}).start(() => this.setState({ panelOpen: true }));
	}

	private closeForm = (): void => { // Form will slide back down
		this.setState({ panelOpen: false });

		timing(this.animatedValues.panelOpen, {
			duration: 500,
			toValue: 0,
			easing: Easing.inOut(Easing.ease)
		}).start(() => this.setState({ editType: null }));
	}

	private _handleEditFabPress = (): void => {
		const isBeginningEdit = !this.state.editing;

		if (this.state.isSwiping) return;

		this.setState({ isSwiping: true });

		if (isBeginningEdit) {
			this._setHeaderTitle(true);

			this.setState({ editing: true }, () => {
				timing(this.animatedValues.beginEditing, {
					duration: 600,
					toValue: 1,
					easing: Easing.inOut(Easing.ease)
				}).start(() => this.setState({ readyToEdit: true, isSwiping: false }));
			});
		} else {
			this._setHeaderTitle(false);

			this.setState({ readyToEdit: false }, () => {
				timing(this.animatedValues.beginEditing, {
					duration: 600,
					toValue: 0,
					easing: Easing.inOut(Easing.ease)
				}).start(() => this.setState({ editing: false, isSwiping: false }));
			});
		}
	}

	private _openUserChat = (): void => {
		if (this.props.user) this.props.navigation.navigate('Chat', { otherUserId: this.props.user.userId });
	}

	private _setHeaderTitle = (isEditing: boolean): void => {
		this.props.navigation.setParams({
			headerDetails: {
				title: isEditing ?
					'Edit Profile' :
					(this.state.isOtherUser && this.props.user ?
						`${this.props.user.firstName} ${this.props.user.lastName}` :
						'My Profile'
					)
			}
		});
	}

	private _renderInterests = (): ReactElement | undefined => {
		const { user } = this.props;

		if (!user) return;

		return (
			<View style={ [ styles.sectionContainer ] }>
				<Title style={ { marginBottom: 20 } }>Interests</Title>

				{
					!this.state.isOtherUser &&
						<IconButton
							icon={ user.interests && user.interests.length ? 'pencil' : 'plus' }
							onPress={ (): void => this.openForm(EditTypes.INTERESTS) }
							color={ Theme.accent }
							size={ 26 }
							style={ { position: 'absolute', top: 8, right: 6 } }
						/>
				}

				<View>
					<View style={ {
						flexDirection: 'row',
						flexWrap: 'wrap'
					} }>
						{
							user.interests && user.interests.map(
								(interest: string) => {
									return (
										<InterestChip
											text={ interest }
											key={ interest }
										/>
									);
								}
							)
						}
					</View>

					{
						!user.interests || !user.interests.length &&
							<View>
								<Text>
									You currently don't have any interests selected
								</Text>
								<Button
									mode='outlined'
									onPress={ (): void => this.openForm(EditTypes.INTERESTS) }
									style={ { marginTop: 20 } }
								>
									Add Interests
								</Button>
							</View>
					}
				</View>
			</View>
		);
	}

	private _renderAvatar = (user: User): ReactElement => {
		return (
			<TouchableWithoutFeedback onPress={ this.state.editing ? this._changeImage : undefined }>
				<Animated.View
					style={ [
						{ justifyContent: 'center' },
						AnimatedStyles.opacity(this.animatedStyles.editImageOpacity)
					] }
				>
					{
						this.state.editing &&
							<Animated.View
								style={ [
									styles.editAvatarContainer,
									AnimatedStyles.opacity(this.animatedStyles.editIconOpacity)
								] }>
								{
									this.props.uploadingAvatar ?
										<ActivityIndicator animating={ true } color={ Theme.accent } size='large' /> :
										<Icon
											name='edit'
											size={ 60 }
											color={ Theme.accent }
											style={ styles.editAvatarIcon }
										/>
								}
							</Animated.View>
					}
					<Image
						source={
							user.avatar ?
								{ uri: user.avatar }
								: require('./../../assets/images/no-avatar.jpg')
						}
						style={ styles.avatar }
					/>
				</Animated.View>
			</TouchableWithoutFeedback>
		);
	}

	private _renderViewColumn = (user: User): ReactElement => {
		return(
			<Animated.View
				style={ [
					styles.halfWidth,
					AnimatedStyles.translateX(this.animatedStyles.panelLeftX)
				] }>
				<View style={ styles.sectionContainer }>
					<View style={ styles.userTypeTag }>
						<Text style={ styles.userTypeTagText }>{ this.props.user && this.props.user.userType }</Text>
					</View>

					{
						this.state.isOtherUser &&
							<TapGestureHandler onHandlerStateChange={ this._openUserChat }>
								<View
									style={ styles.messageIconBadge }
								>
									<Icon name={ 'comment' } size={ 30 } color={ Colours.white } solid />
								</View>
							</TapGestureHandler>
					}

					<Text style={ styles.name }>{ user.firstName } { user.lastName }</Text>

					<Divider />

					<View style={ styles.statsContainer }>
						<View style={ styles.statsItem }>
							<Text style={ styles.statsItemText }>
								2,304
							</Text>
							<Text style={ styles.statsItemDesc }>
								KM Travelled
							</Text>
						</View>
						<View style={ styles.statsItem }>
							<Text style={ styles.statsItemText }>
								453
							</Text>
							<Text style={ styles.statsItemDesc }>
								KG CO2 Saved
							</Text>
						</View>
						<View style={ styles.statsItem }>
							<Text style={ styles.statsItemText }>
								41
							</Text>
							<Text style={ styles.statsItemDesc }>
								Lifts Given
							</Text>
						</View>
					</View>
				</View>

				{ this._renderInterests() }
			</Animated.View>
		);
	}

	private _renderEditColumn = (user: User): ReactElement => {
		return (
			<Animated.View
				style={ [
					{ width: '50%' },
					AnimatedStyles.translateX(this.animatedStyles.panelRightX)
				] }>
				<View style={ styles.sectionContainer }>
					<TouchableOpacity
						onPress={ (): void => { this.openForm(EditTypes.FIRST_NAME); } }
						style={ styles.editRow }
					>
						<Text style={ styles.label }>{ EditFields.FIRST_NAME.type }</Text>
						<Text style={ styles.editText }>{ user.firstName || 'Add my first name' }</Text>
					</TouchableOpacity>

					<Divider />

					<TouchableOpacity
						onPress={ (): void => { this.openForm(EditTypes.LAST_NAME); } }
						style={ styles.editRow }
					>
						<Text style={ styles.label }>{ EditFields.LAST_NAME.type }</Text>
						<Text style={ styles.editText }>{ user.lastName || 'Add my last name' }</Text>
					</TouchableOpacity>

					<Divider />

					<TouchableOpacity
						onPress={ (): void => { this.openForm(EditTypes.PHONE); } }
						style={ styles.editRow }
					>
						<Text style={ styles.label }>{ EditFields.PHONE.type }</Text>
						<Text style={ styles.editText }>{ user.phone }</Text>
					</TouchableOpacity>

					<Divider />

					<TouchableOpacity
						onPress={ (): void => { this.openForm(EditTypes.PASSWORD); } }
						style={ styles.editRow }
					>
						<Text style={ styles.label }>Password</Text>
						<Text style={ styles.editText }>******</Text>
					</TouchableOpacity>
				</View>
			</Animated.View>
		);
	}

	private _renderNavigationEvents = (): ReactElement =>
		<NavigationEvents onWillFocus={ this._mountScreen } onDidBlur={ this._unmountScreen } />

	public render(): ReactElement {
		if (!this.props.user || !this.props.user.email) { // Replace with loading spinner
			return <View>
				{ this._renderNavigationEvents() }
				<Text style={ styles.loadingText }>Loading...</Text>
			</View>;
		}

		const { user } = this.props;

		return (
			<SafeAreaView style={ styles.container }>
				{ this._renderNavigationEvents() }

				<ScrollView>
					{ this._renderAvatar(user) }

					<View style={ styles.outerColumnContainer }>
						{ this._renderViewColumn(user) }
						{ !this.state.isOtherUser && this._renderEditColumn(user) }
					</View>
				</ScrollView>

				{
					!this.state.isOtherUser &&
						<FAB
							style={ styles.fab }
							icon={
								this.state.editing ?
									'check-outline' :
									'pencil-outline'
							}
							onPress={ this._handleEditFabPress }
						/>
				}

				<Animated.View
					style={ [
						styles.panel,
						AnimatedStyles.height(this.animatedStyles.panelHeight)
					] }>
					{
						this.state.editType === EditTypes.FIRST_NAME &&
							<UpdateUserField
								updateUserField={ this.props.updateUserField }
								isUpdating={ this.props.isUpdating }
								type={ EditFields.FIRST_NAME.type }
								field={ EditFields.FIRST_NAME.field }
								close={ this.closeForm }
								value={ user.firstName } />
					}

					{
						this.state.editType === EditTypes.LAST_NAME &&
							<UpdateUserField
								updateUserField={ this.props.updateUserField }
								isUpdating={ this.props.isUpdating }
								type={ EditFields.LAST_NAME.type }
								field={ EditFields.LAST_NAME.field }
								close={ this.closeForm }
								value={ user.lastName } />
					}

					{
						this.state.editType === EditTypes.PHONE &&
							<UpdateUserField
								updateUserField={ this.props.updateUserField }
								isUpdating={ this.props.isUpdating }
								type={ EditFields.PHONE.type }
								field={ EditFields.PHONE.field }
								close={ this.closeForm }
								value={ user.phone } />
					}

					{
						this.state.editType === EditTypes.PASSWORD &&
							<UpdatePassword
								updatePassword={ this.props.updatePassword }
								isUpdating={ this.props.isUpdating }
								type={ EditTypes.PASSWORD }
								close={ this.closeForm } />
					}

					{
						this.state.editType === EditTypes.INTERESTS &&
							<UpdateInterests
								type={ EditTypes.INTERESTS }
								close={ this.closeForm }
								allInterests={ this.props.interests }
								currentInterests={ this.props.user.interests }
								panelOpen={ this.state.panelOpen }
								updateInterests={ this.props.updateInterests }
								isUpdating={ this.props.isUpdating }
							/>
					}
				</Animated.View>
			</SafeAreaView>
		);
	}
}

const mapStateToProps = (state: AppState): UserProfileState => ({
	...state.userProfileReducer,
	...state.interestsListReducer
});

export default connect(mapStateToProps, {
	uploadAvatar,
	uploadAvatarRequest,
	updateUserField,
	updatePassword,
	updateInterests,
	getInterestsList,
	getUserProfile
})(Profile);
