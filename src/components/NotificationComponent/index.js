import React from 'react';
import { View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { textColors, colors } from '../../styles/base';
import { TextLight } from '../UIComponents/TextComponents';
import styled, { withTheme } from 'styled-components';

type TNotificationComponent = {
	image_file_link: string,
	notification_text: string,
	notification_text_detail: string,
	onNotificationPress: () => void
};

export class NotificationComponent extends React.PureComponent<TNotificationComponent> {
	onNotificationPress = () => {
		const { onNotificationPress, ...props } = this.props;
		this.props.onNotificationPress(props);
	};

	renderBottomContent = () => (
		<View>
			<Text style={{ color: this.props.theme.colors.text }}>
				{this.props.notification_text_detail}
			</Text>
			<TextLight style={{ textAlign: 'right', color: colors.gray }}>
				{this.props.days_ago}
			</TextLight>
		</View>
	);
	render() {
		const {
			image_file_link,
			notification_text,
			notification_text_detail
		} = this.props;
		return (
			<ListItem
				containerStyle={{
					backgroundColor: this.props.theme.colors.blockBackground,
					color: this.props.theme.colors.text
				}}
				leftAvatar={{
					rounded: true,
					source: {
						uri: image_file_link
					},
					imageProps: {
						resizeMode: 'cover'
					},
					size: 60
				}}
				onPress={this.onNotificationPress}
				title={notification_text}
				titleStyle={{
					fontWeight: '800',
					color: this.props.theme.colors.text
				}}
				subtitle={this.renderBottomContent}
			/>
		);
	}
}

export default withTheme(NotificationComponent);
