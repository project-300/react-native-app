import React, { Component, ReactElement, useEffect, useState } from 'react';
import {
	Text,
	ScrollView,
	TouchableOpacity,
	View,
	Animated
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Props, State, Place } from './interfaces';
import { HomeState } from '../../types/redux-reducer-state-types';
import { AppState } from '../../store';
import MapView, {PROVIDER_GOOGLE, Marker, LatLng} from 'react-native-maps'
import { Container, Content, Footer, Form, Item, Label, Input, DatePicker, H1 } from 'native-base' 
import Icon from 'react-native-vector-icons/FontAwesome5'

export class NewJourney extends Component<Props, State> {

	constructor(props: Props) {
		super(props)
		
		const searchURL: string = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Cloone&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyDQNhb6465V-c534C2yFaN21niagWV2Ve0'
        const positionStart: LatLng = {
            latitude: 54.2796206,
            longitude: -8.4634921
        };
        const positionEnd: LatLng = {
            latitude: 53.392075,
			longitude: -6.282735
        } 
        const midLatitude: number = (positionStart.latitude + positionEnd.latitude) / 2
        const midLongitude: number = (positionStart.longitude + positionEnd.longitude) / 2
        const delta: number = Math.sqrt(Math.pow(positionStart.latitude - positionEnd.latitude, 2) + Math.pow(positionStart.longitude - positionEnd.longitude, 2)) + 0.5

		this.state = {
			formTop: undefined,
			positionStart,
			positionEnd,
            journeyRegion: {
                latitude: midLatitude,
				longitude: midLongitude,
				latitudeDelta: delta,
      			longitudeDelta: delta
			},
			places: []
        }
	}
	
	
    // setDate(newDate: Date) {
	// 	this.setState({ leavingAt: newDate });
	// }
	
	async searchPlaces(query: string) {
		await fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${query}&inputtype=textquery&fields=formatted_address,name,geometry&key=AIzaSyDQNhb6465V-c534C2yFaN21niagWV2Ve0`)
		.then((response) => response.json())
		.then((responseJson) => {
			var places:Place[] = []
			responseJson.candidates.map(res => {
				places.push({
					formatted_address: res.formatted_address,
					name: res.name,
					location: res.geometry.location
				})
				}
			)
			this.setState({places})
		})
		console.log(this.state.places)
	}

	openForm() {
		this.setState({formTop: 0})
	}

	public render(): ReactElement {
		return (
			<Container style={ styles.container }>
                <MapView
                style = {styles.map}
                provider = {PROVIDER_GOOGLE}
                initialRegion = { this.state.journeyRegion}
                >
                    <Marker
                        coordinate={this.state.positionStart}
                    >
                    </Marker>
                    {/* <Marker 
                        coordinate={this.state.positionEnd}
                    >
                    </Marker> */}
                </MapView>
                <View style = {[styles.form, { top: this.state.formTop }]}>
                <Form>
					<H1 onPress={(): void => this.openForm()} style={styles.header}>Your Destination</H1>
					<Item regular style={styles.input}>
						<Input 
						onFocus = {(): void => this.openForm()}
						placeholder="Destination" 
						onChangeText={(query) => this.searchPlaces(query)}
						/>
					</Item>
					{/* {this.state.places.map((object, i) => <>)} */}
						{/* <Item floatingLabel>
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
						</Item> */}
					</Form>
                </View>
			</Container>
		);
	}
}

const mapStateToProps = (state: AppState): HomeState => ({ });

export default connect(mapStateToProps, { })(NewJourney);

