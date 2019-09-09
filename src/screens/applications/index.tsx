import React, { Component, ReactElement } from 'react';
import {
	ScrollView,
	AppState,
	FlatList,
	Text,
	View,
	TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { DriverApplication, Props, State } from './interfaces';
import WS from '../../api/websocket';
import { ADMIN_DRIVER_APPLICATIONS } from '../../constants/websocket-subscriptions';
import { storeApplications, approveApplication, deleteApplication } from '../../redux/actions';

class Applications extends Component<Props, State> {

	public constructor(props: Props) {
		super(props);
	}

	public async componentDidMount(): Promise<void> {
		await WS.subscribe(ADMIN_DRIVER_APPLICATIONS);
	}

	public async componentWillUnmount(): Promise<void> {
		await WS.unsubscribe(ADMIN_DRIVER_APPLICATIONS);
	}

	private _approve = async (userId: string): Promise<void> => {
		await this.props.approveApplication(userId);
	}

	private _delete = async (userId: string): Promise<void> => {
		await this.props.deleteApplication(userId);
	}

	private _renderRow = ({ item, index }: { item: DriverApplication; index: number }): ReactElement => {
		const approvalButton =
			<TouchableOpacity
				style={ styles.button }
				onPress={ (): Promise<void> => this._approve(item.userId) }
			>
				<Text style={ styles.buttonText }>Approve</Text>
			</TouchableOpacity>;

		return (
			<View
				style={ styles.applicationRow }>
				<Text style={ styles.title }>
					Application #{ index + 1 }
				</Text>
				<Text>
					User ID: { item.userId }
				</Text>
				<Text>
					Approved: { item.approved ? 'Yes ---' : 'No' }
					{ item.times.approved ? ` at ${item.times.approved}` : '' }
				</Text>
				{ approvalButton }
				<TouchableOpacity
					style={ styles.button }
					onPress={ (): Promise<void> => this._delete(item.userId) }
				>
					<Text style={ styles.buttonText }>Delete</Text>
				</TouchableOpacity>
			</View>
		);
	}

	public render(): ReactElement {
		return (
			<ScrollView style={ styles.container }>
				<Text>This is a temporary WebSockets demo screen.</Text>
				<Text>There are { this.props.applications.length } applications.</Text>

				<FlatList
					data={ this.props.applications }
					extraData={ this.props }
					renderItem={ this._renderRow }
					keyExtractor={ (item: DriverApplication): string => item.userId }
				/>
			</ScrollView>
		);
	}
}

const mapStateToProps = (state: AppState): AppState => ({
	...state.driverApplicationReducer
});

export default connect(mapStateToProps, {
	storeApplications,
	approveApplication,
	deleteApplication
})(Applications);
