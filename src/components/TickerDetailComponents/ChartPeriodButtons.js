import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import {
	colors,
	textColors,
	backgroundColor,
	borderColor,
	padding
} from '../../styles/base.js';
import { Wrapper } from '../UIComponents/MainComponents';
import { TextBold } from '../UIComponents/TextComponents';

type Props = {
	period: '1y_a'
};

const ChartPeriodButtons = (props: Props) => {
	let textContainerStyle1 = {
		...styles.textContainer,
		alignItems: 'flex-start',
		flex: 3
	};
	props.tabStyle = '1Y';

	return (
		<Wrapper style={styles.containerStyleRowT}>
			<TouchableOpacity
				onPress={() => {
					props.action('1d', props.tickerData.ticker);
				}}
				style={
					props.timePeriod == '1d'
						? styles.cellTabHighlighted
						: styles.cellTab
				}>
				<View style={textContainerStyle1}>
					<TextBold
						style={
							props.timePeriod == '1d' && { color: colors.purple }
						}>
						1D
					</TextBold>
				</View>
			</TouchableOpacity>

			<TouchableOpacity
				onPress={() => {
					props.action('7d', props.tickerData.ticker);
				}}
				style={
					props.timePeriod == '7d'
						? styles.cellTabHighlighted
						: styles.cellTab
				}>
				<View style={textContainerStyle1}>
					<TextBold
						style={
							props.timePeriod == '7d' && { color: colors.purple }
						}>
						7D
					</TextBold>
				</View>
			</TouchableOpacity>

			<TouchableOpacity
				onPress={() => {
					props.action('30d', props.tickerData.ticker);
				}}
				style={
					props.timePeriod == '30d'
						? styles.cellTabHighlighted
						: styles.cellTab
				}>
				<View style={textContainerStyle1}>
					<TextBold
						style={
							props.timePeriod == '30d' && {
								color: colors.purple
							}
						}>
						30D
					</TextBold>
				</View>
			</TouchableOpacity>

			<TouchableOpacity
				onPress={() => {
					props.action('1y_a', props.tickerData.ticker);
				}}
				style={
					props.timePeriod == '1y_a'
						? styles.cellTabHighlighted
						: styles.cellTab
				}>
				<View style={textContainerStyle1}>
					<TextBold
						style={
							props.timePeriod == '1y_a' && {
								color: colors.purple
							}
						}>
						1Y
					</TextBold>
				</View>
			</TouchableOpacity>

			<TouchableOpacity
				onPress={() => {
					props.action('5y_a', props.tickerData.ticker);
				}}
				style={
					props.timePeriod == '5y_a'
						? styles.cellTabHighlighted
						: styles.cellTab
				}>
				<View style={textContainerStyle1}>
					<TextBold
						style={
							props.timePeriod == '5y_a' && {
								color: colors.purple
							}
						}>
						5Y
					</TextBold>
				</View>
			</TouchableOpacity>
		</Wrapper>
	);
};

const styles = {
	containerStyleRowT: {
		// height: 35,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'stretch',
		borderBottomWidth: 1,
		borderBottomStyle: 'solid',
		borderBottomColor: colors.dark_gray,
		marginHorizontal: padding.xlarge
	},
	textContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-end'
	},
	cellTab: {
		padding: padding.chubby
	},
	cellTabHighlighted: {
		padding: padding.chubby,
		borderBottomWidth: 2,
		borderBottomStyle: 'solid',
		borderBottomColor: colors.purple
	}
};

export default ChartPeriodButtons;
