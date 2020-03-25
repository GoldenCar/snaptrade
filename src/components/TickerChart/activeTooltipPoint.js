import React, { Component } from 'react';
import { colors } from '../../styles/base';
import { Circle, Rect, G, Text } from 'react-native-svg';

export default class ChartActivePointTooltip extends Component {
	render() {
		let { x, y, touchedValue, touchedIndex, touchedLabel } = this.props;

		// if (typeof touchedIndex === 'undefined') return null;
		// return (
		// 	<Rect
		// 		width={touchedIndex ? 115 : 0}
		// 		height={touchedIndex ? 40 : 0}
		// 		fill={colors.gray}
		// 		opacity={0.05}
		// 		rx={6}
		// 		x={x(touchedIndex)}
		// 		y={y(touchedValue)}
		// 	/>
		// );
		if (typeof touchedLabel !== 'string') touchedLabel = '';
		const parsed = touchedLabel.split('');
		const [firstLine, secondLine] = [
			parsed.slice(0, 16).join(''),
			parsed.slice(16, 32).join('')
		];

		console.log({ firstLine, secondLine },parsed,  typeof parsed[17] === 'string', parsed[17], typeof parsed[17]);

		const twoLines = typeof parsed[17] === 'string';
		const height = twoLines ? 55 : 45

		return (
			<G
				x={x(touchedIndex) - 55}
				y={y(touchedValue) + 15}
				style={{ zIndex: 10, overflow: 'hidden' }}>
				<Rect
					width={touchedIndex ? 115 : 0}
					height={touchedIndex ? height : 0}
					fill={colors.gray}
					opacity={0.05}
					rx={6}
				/>
				<Rect
					fill={colors.white}
					rx={6}
					y={2.5}
					x={2.5}
					width={110}
					height={height - 5}
				/>
				<Text
					y={25}
					x={55}
					width={touchedIndex ? 110 : 0}
					height={touchedIndex ? 40 : 0}
					numberOfLines={2}
					textAnchor="middle"
					fontWeight="bold"
					// fontStyle={{ overflow: 'hidden' }}
					fill={colors.text}>
					{firstLine}
				</Text>
				<Text
					y={25 + height / 4}
					x={55}
					width={touchedIndex ? 70 : 0}
					height={touchedIndex ? 40 : 0}
					numberOfLines={2}
					textAnchor="middle"
					fontWeight="bold"
					// fontStyle={{ overflow: 'hidden' }}
					fill={colors.text}>
					{secondLine}
				</Text>
			</G>
		);
	}
}
