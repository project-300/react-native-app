import React, { Component, ReactElement } from 'react';
import {
	ScrollView,
	Text,
	View,
	Image
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Props, State } from './interfaces';
import WS from '../../api/websocket';
import { userProfileSubRequest, userProfileUnsub } from '../../redux/actions';
import { UserProfileState } from '../../types/redux-reducer-state-types';
import { AppState } from '../../store';

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

	public render(): ReactElement {
		if (!this.props.user) return <View />; 		// Add loading spinner

		return (
			<View>
				<ScrollView>
					<Image
						source={ { uri: this.props.user.avatar || 'https://pecb.com/conferences/wp-content/uploads/2017/10/no-profile-picture.jpg' } }
						style={ styles.profileImage }
					/>
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
