import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import {
	fonts,
	textColors,
	backgroundColor,
	borderColor,
	padding,
	fontWeights,
	textStyles
} from '../../styles/base.js';
import { newsURL } from '../../api/api.js';
import StyledText from '../StyledText/index.js';

const styles = {
	wrapper: {
		padding: padding.chubby,
		flex: 1
	},
	containerStyleRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		flex: 1,
		backgroundColor: backgroundColor.primary,
		borderColor: borderColor.primary,
		color: textColors.primary
	},
	containerStyleRow2: {
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'stretch',
		width: '100%',
		backgroundColor: backgroundColor.primary,
		borderColor: borderColor.primary,
		color: textColors.primary
	},
	textContainer: {
		flexDirection: 'column',
		textAlign: 'left',
		backgroundColor: backgroundColor.primary,
		borderColor: borderColor.primary,
		color: textColors.primary
	},
	imageContainer: {
		marginLeft: padding.small,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-end',
		backgroundColor: backgroundColor.primary,
		borderColor: borderColor.primary,
		color: textColors.primary
	},
	cell: {
		padding: padding.xsmall,
		backgroundColor: backgroundColor.primary,
		borderColor: borderColor.primary,
		color: textColors.secondary
	},
	newsTitleText: {
		fontSize: fonts.medium_title,
		backgroundColor: backgroundColor.primary,
		borderColor: borderColor.primary,
		color: textColors.primary
	},
	cellTitle: {
		fontSize: fonts.title,
		backgroundColor: backgroundColor.primary,
		borderColor: borderColor.primary,
		color: textColors.primary
	},
	thumbnail: {
		width: 100,
		height: 100
	},
	image: {
		width: '100%',
		height: 250
	}
};
let textContainerStyle = {
	...styles.textContainer,
	alignItems: 'flex-start'
};
let imageContainerStyle = {
	...styles.imageContainer,
	alignItems: 'flex-start'
};
export default class TickerArticle extends Component {
	state = {
		open: false
	};

	toggleDescriptionView = () =>
		this.setState(state => ({ open: !state.open }));

	render() {
		const { item, index } = this.props;
		return (
			<View style={styles.wrapper}>
				<View
					style={
						(index + 1) % 6 == 0
							? styles.containerStyleRow2
							: [styles.containerStyleRow, {paddingRight: 100}]
					}>
					<View style={[textContainerStyle]}>
						<Text style={styles.cell}>Source: {item.source}</Text>
						<Text style={styles.cellTitle}>{item.title}</Text>
						<Text style={styles.cell}>
							{item.pub_time_days_ago_mod}
						</Text>
					</View>
					<View
						style={
							(index + 1) % 6 == 0
								? imageContainerStyle
								: textContainerStyle
						}>
						<Image
							style={
								(index + 1) % 6 == 0
									? styles.image
									: styles.thumbnail
							}
							source={{ uri: newsURL + item.image_file_link }}
						/>
					</View>
				</View>
				<Text style={[textStyles.body]}>
					{this.state.open
						? item.news_clip
						: item.news_clip_very_short}
				</Text>

				<TouchableOpacity onPress={this.toggleDescriptionView}>
					<StyledText
						style={[
							textStyles.body,
							{ color: textColors.primary }
						]}>
						{this.state.open ? 'Less' : 'Show more'}
					</StyledText>
				</TouchableOpacity>
			</View>
		);
	}
}
