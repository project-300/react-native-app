import React, { Component, ReactElement } from 'react';
import {
	ScrollView,
	Text,
	View,
	Image,
	TouchableOpacity
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
				console.log('ImagePicker Error: ', img.error);
			} else {
				const currentWidth: number = img.width;
				const currentHeight: number = img.height;
				let newWidth: number = currentWidth;
				let newHeight: number = currentHeight;

				if (currentWidth > currentHeight && currentWidth > 500) {
					newWidth = 500;
					newHeight = (currentHeight / currentWidth) * newWidth;
				} else if (currentHeight > currentWidth && currentHeight > 500) {
					newHeight = 500;
					newWidth = (currentWidth / currentHeight) * newHeight;
				}

				const rs: ResizedResponse = await ImageResizer.createResizedImage(img.uri, newWidth, newHeight, 'JPEG', 100);

				const file = {
					uri: rs.uri,
					name: img.fileName,
					type: img.type
				};

				const config = {
					keyPrefix: 'avatars/',
					bucket: 'react-native-test-upload',
					region: 'eu-west-1',
					accessKey: '',
					secretKey: '',
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
		if (!this.props.user) return <View />; 		// Add loading spinner

		return (
			<View>
				<ScrollView>
					<TouchableOpacity
						onPress={ this._changeImage }
					>
						<Image
							source={ { uri: this.props.user.avatar || 'https://pecb.com/conferences/wp-content/uploads/2017/10/no-profile-picture.jpg' } }
							style={ styles.profileImage }
						/>
					</TouchableOpacity>
					<Text
						style={ styles.username }
					>{ this.props.user.username }</Text>
					<Text
						style={ styles.email }
					>{ this.props.user.email } <Text
							style={ styles.editButton }
							onPress={ (): void => {
								if (!this.props.user) return;
								this.props.navigation.navigate('UpdateEmail', { email: this.props.user.email });
							} }
						>Change</Text>
					</Text>
				</ScrollView>
			</View>
		);
	}
}

const mapStateToProps = (state: AppState): UserProfileState => ({
	...state.userProfileReducer
});

export default connect(mapStateToProps, { userProfileSubRequest, userProfileUnsub })(Profile);
