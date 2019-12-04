import { TextStyle, ViewStyle } from 'react-native';
import { CommonProps } from '../../../types/common';
import { Coords, Journey, Place } from '@project-300/common-types';

export interface Styles {
  container: ViewStyle;
  mapContainer: ViewStyle;
  button: TextStyle;
  buttonText: TextStyle;
  map: ViewStyle;
  bottomPanel: ViewStyle;
  spinner: ViewStyle;
  spinnerTextStyle: TextStyle;
}

export interface Props extends CommonProps {
  journey: Journey;
  updateAddUserJourney(journey: Journey): Promise<boolean>;
  isFetching: boolean;
}

export interface State {
  journey: Journey;
  mapRegion: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  route: Coords[];
}
