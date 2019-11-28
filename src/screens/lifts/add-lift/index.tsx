import React, { Component, ReactElement } from 'react';
import {
	ScrollView,
	TouchableOpacity,
	FlatList,
	View
} from 'react-native';
import { AppState } from '../../../store';
import { connect } from 'react-redux';
import styles from './styles';
import WS from '../../../api/websocket';
import { GET_NEW_LIFTS } from '../../../constants/websocket-subscriptions';
import { addLift } from '../../../redux/actions';
import { userId } from '../../../auth';
import { LiftObject } from '@project-300/common-types';
import { Container, Content, Form, Item, Input, Label, Button, Text, Footer, FooterTab, DatePicker } from 'native-base';
import MapView, {PROVIDER_GOOGLE}  from 'react-native-maps'

import liftsReducer from '../../../redux/reducers/get-lifts';
import { Props, State } from './interfaces';

class AddLift extends Component<Props, State> {

	setDate(newDate: Date) {
		this.setState({ leavingAt: newDate });
	}

	constructor(props: Props) {
		super(props)

		this.state = {
			positionStart: {
				latitude: 37.78825,
				longitude: -122.4324,
				latitudeDelta: 0.015,
      			longitudeDelta: 0.0121
			},
			positionEnd: {
				latitude: 37.78825,
				longitude: -122.4324,
				latitudeDelta: 0.015,
      			longitudeDelta: 0.0121
			},
			leavingAt: new Date()
		}
		this.setDate = this.setDate.bind(this)


	// 	fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?inputtype=textquery&location=${this.state.positionStart.latitude},${this.state.positionStart.longitude}&radius=50000&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=${MAPS_API_KEY}`, {
    //   	method: 'GET'
    // })
	}

	public render(): ReactElement {
		return(
			<View>
				<MapView
				provider={PROVIDER_GOOGLE}
				style={ styles.map }
				>
				</MapView>
				{/* <Content padder>
					<Form>
						<Item floatingLabel>
							<Label>Destination</Label>
							<Input />
						</Item>
						<Item floatingLabel>
							<Label>Leaving From</Label>
							<Input />
						</Item>
						<Item floatingLabel>
							<Label>Leaving At</Label>
							<Input />
							<DatePicker
								defaultDate={new Date(2018, 4, 4)}
								minimumDate={new Date(2018, 1, 1)}
								maximumDate={new Date(2018, 12, 31)}
								locale={"en"}
								timeZoneOffsetInMinutes={undefined}
								modalTransparent={false}
								animationType={"fade"}
								androidMode={"default"}
								placeHolderText="Select date"
								textStyle={{ color: "green" }}
								placeHolderTextStyle={{ color: "#d3d3d3" }}
								onDateChange={this.setDate}
								disabled={false}
							/>
						</Item>
						<Item floatingLabel last>
							<Label>Price Per Seat</Label>
							<Input keyboardType={ 'number-pad' }/>
						</Item>
					</Form>
				</Content> */}
				{/* <Footer>
					<FooterTab>
						<Button full><Text>Add Lift</Text></Button>
					</FooterTab>
				</Footer> */}
			</View>
			);
	}
}

const mapStateToProps = (state: AppState) => ({
	...state.getLiftsReducer
});

export default connect(mapStateToProps, { addLift })(AddLift);
