import React from 'react';
import { EarningChartStyled } from './styles';
import { YAxis as RNSCYAxis } from 'react-native-svg-charts';
import { colors } from '../../styles/base';

class YAxis extends React.PureComponent {
	constructor(props) {
		super(props);
	}
	static defaultProps = {
		data: []
	};

	formatLabel = a => {
		const num = Number(a);
		return `$${num}`;
		// return `$${num.toFixed(1)}`;
	};

	render() {
		return (
			<RNSCYAxis
				data={this.props.data}
				numberOfTicks={4}
				contentInset={{ top: 10, bottom: 10 }}
				svg={{
					fill: colors.gray
				}}
				formatLabel={this.formatLabel}
				style={[
					EarningChartStyled.yAxis,
					{ flexDirection: 'column-reverse' }
				]}
			/>
		);
	}
}

export default YAxis;
