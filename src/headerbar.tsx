import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { CommonProps } from './types/common';

export interface Props extends CommonProps {
	title?: string;
	subtitle?: string;
	backButton: boolean;
}

export default class HeaderBar extends React.Component<Props> {

	public constructor(props: Props) {
		super(props);

		this.state = { };
	}

	private _goBack = (): boolean => this.props.navigation.goBack();

	// private _handleSearch = (): void => console.log('Searching');

	private _handleMore = (): void => console.log('Shown more');

	public render(): React.ReactElement {
		return (
			<Appbar.Header>
				{ this.props.backButton && <Appbar.BackAction
					onPress={ this._goBack }
				/>}
				<Appbar.Content
					title={ this.props.title }
					subtitle={ this.props.subtitle }
				/>
				{/*<Appbar.Action icon="magnify" onPress={ this._handleSearch } />*/}
				<Appbar.Action icon='dots-vertical' onPress={ this._handleMore } />
			</Appbar.Header>
		);
	}

}
