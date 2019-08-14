import React, { Component, ReactElement } from 'react';
import {
	Text,
	ScrollView,
	Button
} from 'react-native';
import { connect } from 'react-redux';
import { storeLogout } from '../../auth';
import { AppState } from '../../store';
import styles from './styles';
import { State, Props, LinkStateProp, LinkDispatchProps } from './interfaces';
import { fetchLifts } from '../../actions/lifts';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../types/redux-action-types';
import { bindActionCreators } from 'redux';

class Home extends Component<Props, State> {

	public constructor(props: Props) {
		super(props);
	}

	public componentDidMount(): void {
		this.props.onFetchLifts();
	}

	private renderList(): void {
		console.log(this.props.allLifts);
	}

	private _logout = (): Promise<boolean> => storeLogout().then(() => this.props.navigation.navigate('Login'));

	public render(): ReactElement {
		return (
			<ScrollView style={ styles.container }>
				{ /* <Text
					style={ styles.text }>
					Home Screen
				</Text>
				<Button
					onPress={ this._logout }
					title={ 'Logout' } /> */}
				{ /* <Text>{ this.props.lifts}</Text> */}
				{ this.renderList() }
			</ScrollView>
		);
	}
}

const mapStateToProps = (state: AppState): LinkStateProp => ({
	allLifts: state.allLifts
});

const mapDispatchtoProps = (dispatch: ThunkDispatch<any, any, AppActions>): LinkDispatchProps => ({
	onFetchLifts: bindActionCreators(fetchLifts, dispatch)
});

export default connect(mapStateToProps, mapDispatchtoProps)(Home);
