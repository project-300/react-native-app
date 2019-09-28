import React, { Component, ReactElement } from 'react';
import {
	ScrollView,
	Text,
	View,
	Image,
	TouchableOpacity,
	Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Props, State } from './interfaces';
import WS from '../../api/websocket';
import { userProfileSubRequest, userProfileUnsub } from '../../redux/actions';
import { UserProfileState } from '../../types/redux-reducer-state-types';
import { AppState } from '../../store';
import { RNS3 } from 'react-native-aws3';
import HttpAPI from '../../api/http';
import { userId } from '../../auth';
import ImagePicker, { Response as ImageResponse } from 'react-native-image-picker';
import { Response as ResizedResponse } from 'react-native-image-resizer';
import toastr from '../../helpers/toastr';
import { SecretKeyResult } from '../../types/http-responses';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ReduceImage } from '../../helpers/image-resizing';
import { EditTypes } from '../../types/common';

const options = {
	title: 'Select Avatar',
	storageOptions: {
		skipBackup: true,
		path: 'images'
	}
};

export const EditFields =  {
	EMAIL: { type: 'Email Address', field: EditTypes.EMAIL },
	FIRST_NAME: { type: 'First Name', field: EditTypes.FIRST_NAME },
	LAST_NAME: { type: 'Last Name', field: EditTypes.LAST_NAME }
};

class Profile extends Component<Props, State> {

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
		ImagePicker.showImagePicker(options, async (img: ImageResponse) => {
			if (img.didCancel) {
				console.log('User cancelled image picker');
			} else if (img.error) {
				toastr.error('An error occurred');
			} else {
				const keyResponse: SecretKeyResult = await HttpAPI.getS3SecretKey();

				if (!keyResponse.success) return toastr.error('Unable to retrieve S3 key');

				const rs: ResizedResponse = await ReduceImage(img, 500);

				const file = {
					uri: rs.uri,
					name: img.fileName,
					type: img.type
				};

				const config = {
					keyPrefix: 'avatars/',
					bucket: 'react-native-test-upload',
					region: 'eu-west-1',
					accessKey: 'AKIAIQPEVSX4RIRRKUDQ',
					secretKey: keyResponse.secretKey,
					successActionStatus: 201
				};

				const res = await RNS3.put(file, config); // Upload to AWS S3 Bucket

				const backend = await HttpAPI.updateAvatar({
					avatarURL: res.body.postResponse.location,
					userId: await userId()
				});
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
			<View style={ styles.container }>
				<ScrollView>
					<TouchableOpacity
						onPress={ this._changeImage }
						style={ { ...styles.profileImageContainer, ...avatarCircle } }
					>
						<Image
							source={ { uri: user.avatar || 'https://pecb.com/conferences/wp-content/uploads/2017/10/no-profile-picture.jpg' } }
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
						onPress={ (): boolean => navigation.navigate('UpdateUserField', { ...EditFields.EMAIL, value: user.email }) }
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
			</View>
		);
	}
}

const mapStateToProps = (state: AppState): UserProfileState => ({
	...state.userProfileReducer
});

export default connect(mapStateToProps, { userProfileSubRequest, userProfileUnsub })(Profile);
