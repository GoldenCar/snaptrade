import React from 'react';
import { G, Rect, Text } from 'react-native-svg';
import moment from 'moment';
import {
	colors,
	backgroundColor,
	textColors,
	fontWeights
} from '../../styles/base';
// import { Text } from '../UIComponents/TextComponents';

const Tooltip = ({ tooltipX, tooltipY, value, mode }) => {
	return (
		<G x={tooltipX} y={tooltipY}>
			<Text fill={mode ? '#fff' : '#000'} x={-20} y={14}>
				{value}
			</Text>
		</G>
	);
};

export { Tooltip };
