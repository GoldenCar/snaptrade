import React from 'react';
import { StyleSheet } from 'react-native';
import { XAxis as RNSCXAxis } from 'react-native-svg-charts';
import moment from 'moment';
import { textColors, colors } from '../../styles/base';
import { TickerChartStyled } from './styles';

const labelFormatters = {
	'1d': {
		// 2019-04-25 06:54:02,
		input: 'YYYY-MM-DD hh:mm:ss',
		export: 'HH:MM'
	},
	'7d': {
		// 2019-04-25 06:54:02
		input: 'YYYY-MM-DD hh:mm:ss',
		export: 'HH:MM'
	},
	'30d': null,
	'1y_a': {
		// 2018-05-11
		input: 'YYYY-MM-DD',
		export: 'YY-MM-DD'
	},
	'5y_a': {
		// 2013-06-24
		input: 'YYYY-MM-DD',
		export: 'YY-MMM'
	}
};

export default class XAxis extends React.Component {
	static defaultProps = {
		data: []
	};

	shouldComponentUpdate = props =>
		JSON.stringify(props.data) !== JSON.stringify(this.props.data);

	formatLabel = (value, index) => {
		if (labelFormatters[this.props.period]) {
			return moment(
				this.props.data[value],
				labelFormatters[this.props.period].input
			).format(labelFormatters[this.props.period].export);
		}
		return this.props.data[value];
	};

	render() {
		return (
			<RNSCXAxis
				data={this.props.data}
				numberOfTicks={5}
				// xAccessor={this.xAccessor}
				formatLabel={this.formatLabel}
				svg={{
					fill: colors.purple
				}}
				style={[StyleSheet.absoluteFill, TickerChartStyled.xAxis]}
			/>
		);
	}
}
