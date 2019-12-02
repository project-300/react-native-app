import { TextStyle, ViewStyle } from 'react-native';
import { CommonProps } from '../../types/common';
import { Journey } from '@project-300/common-types';

export interface Styles {
  container: ViewStyle;
  button: TextStyle;
  buttonText: TextStyle;
  applicationRow: ViewStyle;
  centerText: TextStyle;
  bold: TextStyle;
  cardHeader: ViewStyle;
  journeyHeading: TextStyle;
}

export interface Props extends CommonProps {
  //   applications: DriverApplicationObject[];
  //   isApplying: boolean;
  //   approveApplication(userId: string): Promise<boolean>;
  //   deleteApplication(userId: string): Promise<boolean>;
  journeys: Journey[];
  fetchingData: boolean;
  getAllJourneys(): Promise<void>;
}

export interface State {
  //   applications: [];
}
