import React, { Component, ReactElement } from 'react';
import {
	ScrollView,
	Text,
	View,
	Image,
	TouchableOpacity,
	Dimensions, SafeAreaView
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Props, State } from './interfaces';
import WS from '../../api/websocket';
import { userProfileSubRequest, userProfileUnsub } from '../../redux/actions';
import { UserProfileState } from '../../types/redux-reducer-state-types';
import { AppState } from '../../store';
import ImagePicker, { Response as ImageResponse } from 'react-native-image-picker';
import toastr from '../../helpers/toastr';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { EditTypes } from '../../types/common';
import { uploadAvatar } from '../../redux/actions/';

export const EditFields =  {
	EMAIL: { type: 'Email Address', field: EditTypes.EMAIL },
	FIRST_NAME: { type: 'First Name', field: EditTypes.FIRST_NAME },
	LAST_NAME: { type: 'Last Name', field: EditTypes.LAST_NAME }
};

export class Profile extends Component<Props, State> {

	public constructor(props: Props) {
		super(props);
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

		const { user, navigation } = this.props;
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
						<Text style={ styles.userTypeTagText }>{ user.userType }</Text>
					</View>

					<Text style={ styles.username }>{ user.username }</Text>

					<TouchableOpacity
						onPress={ (): boolean => navigation.navigate('UpdateUserField', { ...EditFields.EMAIL, value: user.email, headerDetails: { title: 'Update Email' } }) }
						style={ { ...styles.editRow, ...styles.editRowFirstItem } }
					>
						<Text style={ styles.label }>{ EditFields.EMAIL.type }</Text>
						<Text style={ styles.editText }>{ user.email }</Text>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={ (): boolean => navigation.navigate('UpdateUserField', { ...EditFields.FIRST_NAME, value: user.firstName }) }
						style={ styles.editRow }
					>
						<Text style={ styles.label }>{ EditFields.FIRST_NAME.type }</Text>
						<Text style={ styles.editText }>{ user.firstName || 'Add my first name' }</Text>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={ (): boolean => navigation.navigate('UpdateUserField', { ...EditFields.LAST_NAME, value: user.lastName }) }
						style={ styles.editRow }
					>
						<Text style={ styles.label }>{ EditFields.LAST_NAME.type }</Text>
						<Text style={ styles.editText }>{ user.lastName || 'Add my last name' }</Text>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={ (): boolean => navigation.navigate('UpdatePassword') }
						style={ styles.editRow }
					>
						<Text style={ styles.label }>Password</Text>
						<Text style={ styles.editText }>******</Text>
					</TouchableOpacity>
				</ScrollView>
			</SafeAreaView>
		);
	}
}

const mapStateToProps = (state: AppState): UserProfileState => ({
	...state.userProfileReducer
});

export default connect(mapStateToProps, { userProfileSubRequest, userProfileUnsub, uploadAvatar })(Profile);
