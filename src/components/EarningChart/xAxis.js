import React from 'react';
import { View } from 'react-native';
import { XAxis as RNSCXAxis } from 'react-native-svg-charts';
import { colors } from '../../styles/base';
import { EarningChartStyled } from './styles';

class XAxis extends React.Component {
	constructor(props) {
		super(props);
	}
	static defaultProps = {
		data: []
	};

	shouldComponentUpdate = props =>
		JSON.stringify(props.data) !== JSON.stringify(this.props.data);

	formatLabel = value => {
		if (typeof value === 'undefined') return '';
		const item = this.props.data[value];
		if (typeof item === 'undefined') return '';
		const [year, Q] = item.split('Q');
		return `Q${Q}`;
	};

	formatSecondLabel = value => {
		if (typeof value === 'undefined') return '';
		const item = this.props.data[value];
		if (typeof item === 'undefined') return '';
		const [year, Q] = item.split('Q');
		return `${year}`;
	};

	render() {
		return (
			<View style={{ width: '100%' }}>
				<RNSCXAxis
					data={this.props.data}
					contentInset={{ left: 30, right: 10 }}
					formatLabel={this.formatLabel}
					numberOfTicks={5}
					svg={{
						y: 3,
						fill: colors.gray,
						fontSize: 9
					}}
					style={[EarningChartStyled.xAxis]}
				/>
				<RNSCXAxis
					data={this.props.data}
					contentInset={{ left: 30, right: 10 }}
					formatLabel={this.formatSecondLabel}
					numberOfTicks={5}
					svg={{
						y: 3,
						fill: colors.gray,
						fontSize: 9
					}}
					style={[EarningChartStyled.xAxis]}
				/>
			</View>
		);
	}
}

export default XAxis;
