import React, { Component, ReactElement } from 'react';
import {
  ScrollView,
  FlatList,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Props, State } from './interfaces';
import { AppState } from '../../store';
import { AllJourneysListState } from '../../types/redux-reducer-state-types';
import { Journey } from '@project-300/common-types';
import { getAllJourneys, updateAddUserJourney } from '../../redux/actions';
import {
  Container,
  Tab,
  Tabs,
  Content,
  Card,
  CardItem,
  Body
} from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';

class AllJourneys extends Component<Props, State> {
  public constructor(props: Props) {
    super(props);
  }

  public async componentDidMount(): Promise<void> {
    await this.props.getAllJourneys();
  }

  private async _joinJourney(journey: Journey): Promise<void> {
    await this.props.updateAddUserJourney(journey);
  }

  private _renderRow = ({
    item,
    index
  }: {
    item: Journey;
    index: number;
  }): ReactElement => {
    const journey: Journey = item;
    return (
      <Card>
        <CardItem header bordered style={styles.cardHeader}>
          <Text style={styles.journeyHeading}>
            <Text style={styles.bold}>{journey.origin.name}</Text> to{' '}
            <Text style={styles.bold}>{journey.destination.name}</Text>
          </Text>
        </CardItem>
        <CardItem bordered>
          <Body>
            <Text>The journey begins at {journey.times.leavingAt}</Text>
            <Text>
              {journey.seatsLeft} / {journey.totalNoOfSeats} seats left
            </Text>
            <Text>{journey.pricePerSeat} euro per seat</Text>
          </Body>
        </CardItem>
        <CardItem footer bordered>
          {/* <TouchableOpacity
            style={styles.button}
            onPress={() => this._joinJourney(journey)}
          >
            <Text style={styles.buttonText}>Join</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.button}
            onPress={(): void => {
              this.props.navigation.navigate('ViewJourney', journey);
            }}
          >
            <Text style={styles.buttonText}>View</Text>
          </TouchableOpacity>
        </CardItem>
      </Card>
    );
  };

  public render(): ReactElement {
    return (
      <Container>
        <Content>
          <Spinner visible={this.props.isFetching} />
          <ScrollView style={styles.container}>
            <FlatList
              data={this.props.journeys}
              renderItem={this._renderRow}
              keyExtractor={(item: Journey): string => item.journeyId}
            />
          </ScrollView>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state: AppState): AllJourneysListState => ({
  ...state.allJourneysReducer
});

export default connect(mapStateToProps, {
  getAllJourneys,
  updateAddUserJourney
})(AllJourneys);
