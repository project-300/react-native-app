import React, { Component, ReactElement } from 'react';
import { Chip } from 'react-native-paper';
import styles from '../../screens/profile/styles';

interface Props {
	text: string;
	selected?: boolean;
	onPress?(): void;
	onClose?(): void;
}

export class InterestChip extends Component<Props> {

	public constructor(props: Props) {
		super(props);
	}

	public render(): ReactElement {
		return (
			<Chip
				mode='outlined'
				selected={ this.props.selected }
				onPress={ this.props.onPress }
				onClose={ this.props.onClose }
				style={ styles.interestChip }>
					{ this.props.text }
			</Chip>
		);
	}

}
