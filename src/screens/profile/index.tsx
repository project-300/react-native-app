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
import { Props, State } from './interfaces';
import WS from '../../api/websocket';
import { UserProfileState } from '../../types/redux-reducer-state-types';
import { AppState } from '../../store';
import ImagePicker from 'react-native-image-picker';
import toastr from '../../helpers/toastr';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { EditTypes } from '../../types/common';
import { User, UserType } from '@project-300/common-types';
import Animated, { Easing } from 'react-native-reanimated';
import { UpdateUserField } from './update-user-field';
import { UpdatePassword } from './update-password';
import { Button, Divider, FAB, IconButton, Title } from 'react-native-paper';
import { InterestChip } from '../../components/miscellaneous/interest-chip';
import { UpdateInterests } from './interests';
import {
	userProfileSubRequest,
	userProfileUnsub,
	updateUserField,
	getInterestsList,
	uploadAvatar,
	updatePassword,
	updateInterests
} from '../../redux/actions';
import { AnimatedStyles } from '../../animations/styles';
import { ImagePickerResponse } from '../../types/images';

const { height, width } = Dimensions.get('window');
const { timing, interpolate, Extrapolate, set } = Animated;

export const EditFields =  {
	EMAIL: { type: 'Email Address', field: EditTypes.EMAIL },
	FIRST_NAME: { type: 'First Name', field: EditTypes.FIRST_NAME },
	LAST_NAME: { type: 'Last Name', field: EditTypes.LAST_NAME },
	PASSWORD: { type: 'Password', field: EditTypes.PASSWORD },
	INTERESTS: { type: 'Interests', field: EditTypes.INTERESTS }
};

export class Profile extends Component<Props, State> {

	private readonly fall: Animated.Value<number>;
	private readonly panelOpen: Animated.Value<number>;
	private readonly beginEditing: Animated.Value<number>;
	private readonly panelHeight: Animated.Node<number>;
	private readonly editIconOpacity: Animated.Node<number>;
	private readonly editImageOpacity: Animated.Node<number>;
	private readonly editFieldsHeight: Animated.Node<number>;
	private readonly panelLeftX: Animated.Node<number>;
	private readonly panelRightX: Animated.Node<number>;
	private readonly panelOpacity: Animated.Node<number>;

	private initialState: State = {
		editType: null,
		editing: false,
		readyToEdit: false,
		isSwiping: false, // Screen is swiping between view and edit,
		panelOpen: false
	};

	public constructor(props: Props) {
		super(props);

		this.fall = new Animated.Value(1);
		this.panelOpen = new Animated.Value(0);
		this.beginEditing = new Animated.Value(0);

		this.panelHeight = interpolate(this.panelOpen, {
			inputRange: [ 0, 1 ],
			outputRange: [ 0, height ],
			extrapolate: Extrapolate.CLAMP
		});

		this.editIconOpacity = interpolate(this.beginEditing, {
			inputRange: [ 0, 1 ],
			outputRange: [ 0, 1 ],
			extrapolate: Extrapolate.CLAMP
		});

		this.editImageOpacity = interpolate(this.beginEditing, {
			inputRange: [ 0, 1 ],
			outputRange: [ 1, 0.6 ],
			extrapolate: Extrapolate.CLAMP
		});

		this.editFieldsHeight = interpolate(this.beginEditing, {
			inputRange: [ 0, 1 ],
			outputRange: [ 0, 200 ],
			extrapolate: Extrapolate.CLAMP
		});

		this.panelOpacity = interpolate(this.beginEditing, {
			inputRange: [ 0, 1 ],
			outputRange: [ 1, 0 ],
			extrapolate: Extrapolate.CLAMP
		});

		this.panelLeftX = interpolate(this.beginEditing, {
			inputRange: [ 0, 1 ],
			outputRange: [ width / 4, (-width / 2) - 150 ],
			extrapolate: Extrapolate.CLAMP
		});

		this.panelRightX = interpolate(this.beginEditing, {
			inputRange: [ 0, 1 ],
			outputRange: [ (width / 2) + 150, -width / 4 ],
			extrapolate: Extrapolate.CLAMP
		});

		this.state = this.initialState;
	}

	public async componentDidMount(): Promise<void> {
		this.props.userProfileSubRequest();
		await WS.subscribe('user/profile');

		await this.props.getInterestsList();
	}

	public async componentWillUnmount(): Promise<void> {
		this.props.userProfileUnsub();
		await WS.unsubscribe('user/profile');
		this.setState(this.initialState);
	}

	private _changeImage = (): void => {
		const options = {
			title: 'Upload Avatar',
			storageOptions: {
				skipBackup: true,
				path: 'images'
			}
		};

		ImagePicker.showImagePicker(options, async (img: ImagePickerResponse) => {
			if (img.error) {
				toastr.error('An error occurred');
			} else if (!img.didCancel) {
				if (!img.data || !img.fileSize) return toastr.error('Error - Invalid image selected');

				await this.props.uploadAvatar(img);
			}
		});
	}

	private _userTypeIcon = (): string => {
		const userType = this.props.user && this.props.user.userType;

		if (!userType || userType.toUpperCase() === UserType.PASSENGER) return 'user';
		if (userType.toUpperCase() === UserType.DRIVER) return 'car';
		if (userType.toUpperCase() === UserType.ADMIN) return 'user-shield';

		return 'user';
	}

	private openForm = (editType: string): void => {
		this.setState({ editType });

		timing(this.panelOpen, {
			duration: 500,
			toValue: 1,
			easing: Easing.inOut(Easing.ease)
		}).start(() => this.setState({ panelOpen: true }));
	}

	private closeForm = (): void => {
		this.setState({ panelOpen: false });

		timing(this.panelOpen, {
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
				timing(this.beginEditing, {
					duration: 600,
					toValue: 1,
					easing: Easing.inOut(Easing.ease)
				}).start(() => this.setState({ readyToEdit: true, isSwiping: false }));
			});
		} else {
			this._setHeaderTitle(false);

			this.setState({ readyToEdit: false }, () => {
				timing(this.beginEditing, {
					duration: 600,
					toValue: 0,
					easing: Easing.inOut(Easing.ease)
				}).start(() => this.setState({ editing: false, isSwiping: false }));
			});
		}
	}

	private _setHeaderTitle = (isEditing: boolean): void => {
		this.props.navigation.setParams({
			headerDetails: {
				title: isEditing ? 'Editing Profile' : 'My Profile'
			}
		});
	}

	private _renderInterests = (): ReactElement | undefined => {
		const { user } = this.props;

		if (!user) return;

		return (
			<View style={ [ styles.sectionContainer ] }>
				<Title style={ { marginBottom: 20 } }>Interests</Title>

				<IconButton
					icon={ user.interests && user.interests.length ? 'pencil' : 'plus' }
					onPress={ (): void => this.openForm(EditTypes.INTERESTS) }
					color='black'
					size={ 26 }
					style={ { position: 'absolute', top: 8, right: 6 } }
				/>

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
						!user.interests.length &&
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
						AnimatedStyles.opacity(this.editImageOpacity)
					] }
				>
					{
						this.state.editing &&
							<Animated.View
								style={ [
									styles.editAvatarContainer,
									AnimatedStyles.opacity(this.editIconOpacity)
								] }>
								<Icon
									name='edit'
									size={ 60 }
									color='black'
									style={ styles.editAvatarIcon }
								/>
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

	public render(): ReactElement {
		if (!this.props.user || !this.props.user.email) { // Replace with loading spinner
			return <View>
				<Text style={ styles.loadingText }>Loading...</Text>
			</View>;
		}

		const { user } = this.props;

		return (
			<SafeAreaView style={ styles.container }>
				<ScrollView>
					{ this._renderAvatar(user) }

					<View style={ styles.outerColumnContainer }>
						<Animated.View
							style={ [
								styles.halfWidth,
								AnimatedStyles.translateX(this.panelLeftX)
							] }>
							<View style={ styles.sectionContainer }>
								<View style={ styles.userTypeTag }>
									<Icon
										style={ styles.userTypeTagText }
										name={ this._userTypeIcon() }
										size={ 20 }
										solid
									/>
								</View>
								<Text style={ styles.username }>{ user.username }</Text>
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

						<Animated.View
							style={ [
								{ width: '50%' },
								AnimatedStyles.translateX(this.panelRightX)
							] }>
							<View style={ styles.sectionContainer }>
								<TouchableOpacity
									onPress={ (): void => { this.openForm(EditTypes.EMAIL); } }
									style={ styles.editRow }
								>
									<Text style={ styles.label }>{ EditFields.EMAIL.type }</Text>
									<Text style={ styles.editText }>{ user.email }</Text>
								</TouchableOpacity>

								<Divider />

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
									onPress={ (): void => { this.openForm(EditTypes.PASSWORD); } }
									style={ styles.editRow }
								>
									<Text style={ styles.label }>Password</Text>
									<Text style={ styles.editText }>******</Text>
								</TouchableOpacity>
							</View>
						</Animated.View>
					</View>
				</ScrollView>

				<FAB
					style={ styles.fab }
					icon={
						this.state.editing ?
							'check-outline' :
							'pencil-outline'
					}
					onPress={ this._handleEditFabPress }
				/>

				<Animated.View
					style={ [
						styles.panel,
						AnimatedStyles.height(this.panelHeight)
					] }>
					{
						this.state.editType === EditTypes.EMAIL &&
							<UpdateUserField
								updateUserField={ this.props.updateUserField }
								type={ EditFields.EMAIL.type }
								field={ EditFields.EMAIL.field }
								close={ this.closeForm }
								value={ user.email } />
					}

					{
						this.state.editType === EditTypes.FIRST_NAME &&
							<UpdateUserField
								updateUserField={ this.props.updateUserField }
								type={ EditFields.FIRST_NAME.type }
								field={ EditFields.FIRST_NAME.field }
								close={ this.closeForm }
								value={ user.firstName } />
					}

					{
						this.state.editType === EditTypes.LAST_NAME &&
							<UpdateUserField
								updateUserField={ this.props.updateUserField }
								type={ EditFields.LAST_NAME.type }
								field={ EditFields.LAST_NAME.field }
								close={ this.closeForm }
								value={ user.lastName } />
					}

					{
						this.state.editType === EditTypes.PASSWORD &&
							<UpdatePassword
								updatePassword={ this.props.updatePassword }
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
							/>
					}
				</Animated.View>
			</SafeAreaView>
		);
	}
}

const mapStateToProps = (state: AppState): UserProfileState => ({
	...state.userProfileReducer,
	...state.updateUserFieldReducer,
	...state.interestsListReducer
});

export default connect(mapStateToProps, {
	userProfileSubRequest,
	userProfileUnsub,
	uploadAvatar,
	updateUserField,
	updatePassword,
	updateInterests,
	getInterestsList
})(Profile);
