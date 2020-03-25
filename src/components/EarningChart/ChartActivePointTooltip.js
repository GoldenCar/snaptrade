import React, { Component } from 'react';
import { colors, shadowColor } from '../../styles/base';
import { Circle, Rect, G, Text } from 'react-native-svg';
import ShadowComponent from '../ShadowComponent/ShadowComponent';

const width = 110;
export default class ChartActivePointTooltip extends Component {
	render() {
		let { x, y, touchedValue, touchedIndex } = this.props;

		if (typeof touchedIndex === 'undefined') return null;
		return (
			<G
				x={x(touchedIndex) - 55}
				y={y(touchedValue) - 60}
				style={{ zIndex: 10 }}>
				<Rect
					width={touchedIndex ? 125 : 0}
					height={touchedIndex ? 50 : 0}
					fill={colors.gray}
					opacity={0.05}
					rx={12}
				/>
				<Rect
					fill={colors.white}
					rx={6}
					y={7.5}
					x={7.5}
					width={110}
					height={35}
					style={{
						shadowColor: shadowColor.primary,
						shadowOffset: { width: 10, height: 10 },
						shadowOpacity: 0.1,
						elevation: 10
					}}
				/>
				<Text
					y={25}
					x={55}
					textAnchor="middle"
					fontWeight="bold"
					fill={colors.text}>
					Est. ${touchedValue}
				</Text>

				{/* </ShadowComponent> */}
			</G>
		);
	}
}
