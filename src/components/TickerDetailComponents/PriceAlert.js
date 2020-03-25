import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { TitleBold, Text, TextBold } from '../UIComponents/TextComponents';
import { Wrapper, Row } from '../UIComponents/MainComponents';
import { padding, backgroundColor, colors } from '../../styles/base';
import InputComponent from '../Controls/InputComponent/InputComponent';

import { connect } from 'react-redux';
import { createPriceAlert } from '../../redux/actions/ticker';
class PriceAlert extends Component {
	static defaultProps = {
		ticker: ''
	};

	state = {
		buy_price: 0,
		sell_price: 0
	};

	changeLowPrice = text => {
		try {
			const num = Number(text);
			if (isNaN(num)) return;
			this.setState({ buy_price: num });
		} catch (error) {
			console.log(error);
			return;
		}
	};

	changeHightPrice = text => {
		try {
			const num = Number(text);
			if (isNaN(num)) return;
			this.setState({ sell_price: num });
		} catch (error) {
			console.log(error);
			return;
		}
	};

	submit = () => {
		const { ticker } = this.props;
		const { buy_price, sell_price } = this.state;
		this.props.createPriceAlert({ ticker, buy_price, sell_price });
	};

	render() {
		return (
			<Wrapper style={styles.wrapper}>
				<TitleBold style={styles.title}>Price Alert</TitleBold>
				<Row>
					<TextInput
						keyboardType={'number-pad'}
						onChangeText={this.changeLowPrice}
						style={styles.button}
						placeholder={'$  Low'}
					/>
					<TextInput
						keyboardType={'number-pad'}
						onChangeText={this.changeHightPrice}
						style={styles.button}
						placeholder={'$  High'}
					/>
					<TouchableOpacity
						onPress={this.submit}
						style={[styles.button, styles.purple]}>
						<Text style={[styles.text, styles.purpleText]}>
							SAVE
						</Text>
					</TouchableOpacity>
				</Row>
			</Wrapper>
		);
	}
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
	createPriceAlert: createPriceAlert
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PriceAlert);

const styles = StyleSheet.create({
	wrapper: {
		width: '100%',
		paddingHorizontal: padding.screen,
		marginBottom: padding.xlarge
	},
	title: {
		marginVertical: padding.xlarge
	},
	row: {
		flexDirection: 'row'
	},
	button: {
		height: 48,
		width: 'auto',
		flexGrow: 1,
		justifyContent: 'center',
		alignItems: 'flex-start',
		marginHorizontal: 5,
		borderRadius: 6,
		paddingHorizontal: 10,
		backgroundColor: backgroundColor.light
	},
	text: {
		color: colors.gray,
		marginLeft: 10
	},
	purple: {
		backgroundColor: colors.purple,
		alignItems: 'center'
	},
	purpleText: {
		color: colors.white,
		marginLeft: 0
	},
	symbol: {
		color: colors.dark
	}
});
