import React, { Component, ReactElement } from 'react';
import { Text } from 'react-native-paper';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface Styles {
	acceptedLiftNoticeContainer: ViewStyle;
	center: ViewStyle;
}

interface Props {
	text: string;
	icon: string;
	backgroundColor: string;
	color: string;
}

const styles = StyleSheet.create<Styles>({
	acceptedLiftNoticeContainer: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		marginBottom: 20,
		borderRadius: 4
	},

	center: {
		alignSelf: 'center'
	}
});

export class NoticeBanner extends Component<Props> {

	public constructor(props: Props) {
		super(props);
	}

	public render(): ReactElement {
		const { backgroundColor, color, icon, text } = this.props;

		return (
			<View style={ [ styles.acceptedLiftNoticeContainer, { backgroundColor } ] }>
				<Text style={ styles.center }>
					{
						icon &&
							<Icon
								name={ icon }
								size={ 16 }
								color={ color }
							/>
					}
					{ ` ${text}` }
				</Text>
			</View>
		);
	}

}
