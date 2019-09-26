import React, { Component, ReactElement } from 'react';
import {
	ScrollView,
	Text,
	View,
	Image,
	TouchableOpacity, Dimensions
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
import ImageResizer, { Response as ResizedResponse } from 'react-native-image-resizer';
import toastr from '../../helpers/toastr';
import { SecretKeyResult } from '../../types/http-responses';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ReduceImage } from '../../helpers/image-resizing';

const options = {
	title: 'Select Avatar',
	storageOptions: {
		skipBackup: true,
		path: 'images'
	}
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

		const avatarSize = Dimensions.get('screen').width / 2;
		const avatarCircle = { width: avatarSize, height: avatarSize, borderRadius: avatarSize / 2 };

		return (
			<View>
				<ScrollView>
					<TouchableOpacity
						onPress={ this._changeImage }
						style={ { ...styles.profileImageContainer, ...avatarCircle } }
					>
						<Image
							source={ { uri: this.props.user.avatar || 'https://pecb.com/conferences/wp-content/uploads/2017/10/no-profile-picture.jpg' } }
							style={ avatarCircle }
						/>
					</TouchableOpacity>

					<View style={ styles.userTypeTag }>
						<Text style={ styles.userTypeTagText }>{ this.props.user.userType }</Text>
					</View>

					<Text style={ styles.username }>{ this.props.user.username }</Text>

					<Text
						style={ styles.email }
						onPress={ (): void => {
							if (!this.props.user || !this.props.user.email) return;
							this.props.navigation.navigate('UpdateEmail', { email: this.props.user.email });
						} }
					>
						{ this.props.user.email } <Icon name='pen' size={ 22 } style={ { paddingLeft: 10, color: 'grey' } } />
					</Text>

					<Text
						onPress={ (): boolean => this.props.navigation.navigate('UpdatePassword') }
						style={ styles.updatePassword }
					>Change My Password</Text>
				</ScrollView>
			</View>
		);
	}
}

const mapStateToProps = (state: AppState): UserProfileState => ({
	...state.userProfileReducer
});

export default connect(mapStateToProps, { userProfileSubRequest, userProfileUnsub })(Profile);
