import React, { Component, ReactElement } from 'react';
import {
	ScrollView,
	Text,
	View,
	Image,
	TouchableOpacity,
	Dimensions,
	SafeAreaView
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Props, State } from './interfaces';
import WS from '../../api/websocket';
import { userProfileSubRequest, userProfileUnsub, updateUserField } from '../../redux/actions';
import { UserProfileState } from '../../types/redux-reducer-state-types';
import { AppState } from '../../store';
import ImagePicker, { Response as ImageResponse } from 'react-native-image-picker';
import toastr from '../../helpers/toastr';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { EditTypes } from '../../types/common';
import { uploadAvatar, updatePassword } from '../../redux/actions/';
import { UserType } from '@project-300/common-types';
import Animated, { Easing } from 'react-native-reanimated';
import { UpdateUserField } from './update-user-field';
import { UpdatePassword } from './update-password';

const { height } = Dimensions.get('window');
const { timing, interpolate, Extrapolate } = Animated;

export const EditFields =  {
	EMAIL: { type: 'Email Address', field: EditTypes.EMAIL },
	FIRST_NAME: { type: 'First Name', field: EditTypes.FIRST_NAME },
	LAST_NAME: { type: 'Last Name', field: EditTypes.LAST_NAME },
	PASSWORD: { type: 'Password', field: EditTypes.PASSWORD }
};

export class Profile extends Component<Props, State> {

	private readonly fall: Animated.Value<number>;
	private readonly panelOpen: Animated.Value<number>;
	private readonly panelHeight: Animated.Node<number>;

	public constructor(props: Props) {
		super(props);

		this.fall = new Animated.Value(1);
		this.panelOpen = new Animated.Value(0);

		this.panelHeight = interpolate(this.panelOpen, {
			inputRange: [ 0, 1 ],
			outputRange: [ 0, height ],
			extrapolate: Extrapolate.CLAMP
		});

		this.state = {
			editType: null
		};
	}

	public async componentDidMount(): Promise<void> {
		this.props.userProfileSubRequest();
		await WS.subscribe('user/profile');
	}

	public async componentWillUnmount(): Promise<void> {
		this.props.userProfileUnsub();
		await WS.unsubscribe('user/profile');
	}

	private _changeImage = (): void => {
		const options = {
			title: 'Upload Avatar',
			storageOptions: {
				skipBackup: true,
				path: 'images'
			}
		};

		ImagePicker.showImagePicker(options, async (img: ImageResponse) => {
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
			duration: 1000,
			toValue: 1,
			easing: Easing.inOut(Easing.ease)
		}).start();
	}

	private closeForm = (): void => {
		timing(this.panelOpen, {
			duration: 500,
			toValue: 0,
			easing: Easing.inOut(Easing.ease)
		}).start(() => {
			this.setState({ editType: null });
		});
	}

	public render(): ReactElement {
		if (!this.props.user || !this.props.user.email) { // Replace with loading spinner
			return <View>
				<Text style={ {
					alignSelf: 'center',
					fontWeight: 'bold',
					fontSize: 20,
					marginTop: Dimensions.get('window').height / 3
				} }>Loading...</Text>
			</View>;
		}

		const { user } = this.props;
		const avatarSize = Dimensions.get('screen').width / 2;
		const avatarCircle = { width: avatarSize, height: avatarSize, borderRadius: avatarSize / 2 };

		return (
			<SafeAreaView style={ styles.container }>
				<ScrollView>
					<TouchableOpacity
						onPress={ this._changeImage }
						style={ { ...styles.profileImageContainer, ...avatarCircle } }
					>
						<Image
							source={ user.avatar ? { uri: user.avatar } : require('./../../assets/images/no-avatar.jpg') }
							style={ avatarCircle }
						/>
						<View style={ styles.editIconContainer }>
							<Icon name='pen' size={ 14 } style={ { color: 'white' } } />
						</View>
					</TouchableOpacity>

					<View style={ styles.userTypeTag }>
						<Text style={ styles.userTypeTagText }>{ user.userType } <Icon name={ this._userTypeIcon() } size={ 16 } solid /></Text>
					</View>

					<Text style={ styles.username }>{ user.username }</Text>

					<TouchableOpacity
						onPress={ (): void => { this.openForm(EditTypes.EMAIL); } }
						style={ { ...styles.editRow, ...styles.editRowFirstItem } }
					>
						<Text style={ styles.label }>{ EditFields.EMAIL.type }</Text>
						<Text style={ styles.editText }>{ user.email }</Text>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={ (): void => { this.openForm(EditTypes.FIRST_NAME); } }
						style={ styles.editRow }
					>
						<Text style={ styles.label }>{ EditFields.FIRST_NAME.type }</Text>
						<Text style={ styles.editText }>{ user.firstName || 'Add my first name' }</Text>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={ (): void => { this.openForm(EditTypes.LAST_NAME); } }
						style={ styles.editRow }
					>
						<Text style={ styles.label }>{ EditFields.LAST_NAME.type }</Text>
						<Text style={ styles.editText }>{ user.lastName || 'Add my last name' }</Text>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={ (): void => { this.openForm(EditTypes.PASSWORD); } }
						style={ styles.editRow }
					>
						<Text style={ styles.label }>Password</Text>
						<Text style={ styles.editText }>******</Text>
					</TouchableOpacity>
				</ScrollView>

				<Animated.View style={ [ styles.panel, { height: this.panelHeight } ] }>
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
				</Animated.View>
			</SafeAreaView>
		);
	}
}

const mapStateToProps = (state: AppState): UserProfileState => ({
	...state.userProfileReducer, ...state.updateUserFieldReducer
});

export default connect(mapStateToProps, {
	userProfileSubRequest,
	userProfileUnsub,
	uploadAvatar,
	updateUserField,
	updatePassword
})(Profile);
