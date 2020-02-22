import React, { Component, ReactElement } from 'react';
import { Chip } from 'react-native-paper';
import { StyleSheet, ViewStyle } from 'react-native';

interface Styles {
	interestChip: ViewStyle;
}

interface Props {
	text: string;
	selected?: boolean;
	onPress?(): void;
	onClose?(): void;
}

const styles = StyleSheet.create<Styles>({
	interestChip: {
		margin: 4
	}
});

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
