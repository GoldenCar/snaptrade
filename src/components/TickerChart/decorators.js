import React from 'react';
import { Tooltip } from './tooltip';
import Chart from './Chart';

export const TooltipDecorator = ({ x, y, width, min, max, index, value,mode }) => {
	if (!value) return null;
	const tooltipX = index ? x(index) : -100;
	const tooltipY = y(max);
	return (
		<Tooltip
			mode={mode}
			tooltipX={tooltipX}
			tooltipY={tooltipY}
			value={value}
		/>
	);
};
