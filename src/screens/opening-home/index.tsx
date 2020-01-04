import React, { Component, ReactElement } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Props, State } from './interfaces';
import { HomeState } from '../../types/redux-reducer-state-types';
import { AppState } from '../../store';
import { Container, H1 } from 'native-base';

export class OpeningHome extends Component<Props, State> {
	public constructor(props: Props) {
		super(props);
	}

	public render(): ReactElement {
		const { navigate } = this.props.navigation;

		return (
			<Container style={ styles.container }>
				<Text style={ styles.title }>Project 300</Text>
				<TouchableOpacity
					onPress={ (): boolean => navigate('Login') }
					style={ styles.button }
				>
					<Text style={ styles.buttonText }>Login</Text>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={ (): boolean => navigate('SignUp') }
					style={ styles.button }
				>
					<Text style={ styles.buttonText }>Sign up</Text>
				</TouchableOpacity>
			</Container>
		);
	}
}

const mapStateToProps = (state: AppState): HomeState => ({ });

export default connect(mapStateToProps, { })(OpeningHome);