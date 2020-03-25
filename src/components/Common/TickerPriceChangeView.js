//@flow

import React from 'react';
import { Text, View } from 'react-native';

import { padding, textStyles, colors } from '../../styles/base.js';
import TouchableScale from 'react-native-touchable-scale';

type Props = {
	views: array,
	margin: number
};

export class TickerPriceChangeView extends React.Component {
	state = {
		active: 0
	};

	nextView = () => {
		this.setState(state => ({
			active:
				state.active + 1 >= this.props.views.length
					? 0
					: state.active + 1
		}));
	};
	render() {
		const { margin, views = [] }: Props = this.props;
		const show = views[this.state.active];

		const containerStyle = getContainerStyle(views[0].value);
		const conatinerValue = getContainerValue(show.value);
		return (
			<TouchableScale onPress={this.nextView}>
				<View style={{ ...containerStyle, margin: margin }}>
					<Text style={styles.priceChangeText}>
						{conatinerValue}
						{show.symbol}
					</Text>
				</View>
			</TouchableScale>
		);
	}
}

const getContainerStyle = (price: number | string) => {
	let number = Number(price);
	if (number > 0) {
		return styles.containerStyleGreen;
	} else if (number < 0) {
		return styles.containerStyleRed;
	} else {
		styles.containerStyleNoChange;
	}
};

const getContainerValue = (price: number | string) => {
	let number = Number(price);
	if (typeof number !== 'number' || isNaN(number)) {
		return  price;
	}
	const paddedFloat = number.toFixed(2);
	if (number > 0) {
		return '+' + paddedFloat;
	} else if (number < 0) {
		return paddedFloat;
	}
};

const containerStyleCommon = {
	padding: padding.small,
	borderRadius: padding.small,
	padding: padding.small
};

const styles = {
	containerStyleNoChange: {
		...containerStyleCommon,
		backgroundColor: colors.gray
	},
	containerStyleGreen: {
		...containerStyleCommon,
		backgroundColor: colors.green
	},
	containerStyleRed: {
		...containerStyleCommon,
		backgroundColor: colors.red
	},
	priceChangeText: {
		...textStyles.body,
		color: colors.white
	}
};

export default TickerPriceChangeView;
