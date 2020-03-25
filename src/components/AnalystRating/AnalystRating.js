import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import {
	textStyles,
	colors,
	padding,
	fonts,
	fontWeights
} from '../../styles/base';
import api from '../../api/api';
import { SmallLoader } from '../Loader/Loader';
import ProgressLine from '../ProgressLine/ProgressLine';
import tagGreenIcon from '../../../assets/icons/tag-green.png';
import {
	Text,
	SmallText,
	TextTickerBig,
	TitleBold,
	TextBold
} from '../UIComponents/TextComponents';
import { Row } from '../UIComponents/MainComponents';
import { IconSmall, Icon } from '../UIComponents/IconsComponents';
import { formatPrice } from '../../utils';

const styles = StyleSheet.create({
	wrapper: {
		paddingHorizontal: padding.screen,
		marginBottom: padding.xlarge
	},
	title: {
		marginVertical: padding.xlarge
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center'
	},

	circle: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 100,
		height: 100,
		borderRadius: 50,
		marginRight: 20
	},
	circleFill: {
		position: 'absolute',
		...StyleSheet.absoluteFill,
		borderRadius: 50,
		backgroundColor: colors.green,
		opacity: 0.2
	},
	circleText: {
		// color: colors.green
	},
	lineWrapper: {
		marginLeft: padding.small,
		marginVertical: padding.medium
	},
	lineText: {
		fontSize: fonts.body,
		fontWeight: fontWeights.normal,
		width: 40
	},
	line: {
		backgroundColor: colors.green,
		opacity: 0.3
	},
	text: {
		width: 35,
		marginRight: padding.large
	}
});
export default class AnalystRating extends Component {
	static defaultProps = {
		ticker: ''
	};

	state = {
		pending: true,
		all_ratings: 0,
		analyst_rating_buys: 0,
		analyst_rating_holds: 0,
		analyst_rating_sells: 0,
		analyst_rating_strong_buys: 0,
		analyst_rating_strong_sells: 0,
		analyst_ratings_buy_pct: 0,
		analyst_ratings_hold_pct: 0,
		analyst_ratings_sell_pct: 0,
		average_price_target: 0,
		current_price: 0,
		high_price_target: 0,
		low_price_target: 0,
		pct_off_from_price_target: 0,
		underperform: 0,
		error: true
	};

	componentDidMount = () => {
		this.fetchData();
	};

	fetchData = async () => {
		try {
			this.setState(state => ({ pending: true }));
			const response = await api.get(
				`/tickers/analyst_ratings/${this.props.ticker}`
			);
			this.setState({ ...response.data, pending: false, error: false });
		} catch (error) {
			this.setState({ pending: false, error: true });
		}
	};

	render() {
		if (this.state.error) return null;
		if (!this.state.current_price || !this.state.analyst_ratings_buy_pct) return null;
		return (
			<View style={styles.wrapper}>
				<TitleBold style={styles.title}>Analyst Rating</TitleBold>
				<View style={[styles.row, { flex: 1 }]}>
					<View style={styles.circle}>
						<View style={styles.circleFill} />
						<Icon source={tagGreenIcon} />
						<TextTickerBig>
							{this.state.analyst_ratings_buy_pct}%
						</TextTickerBig>
						<SmallText style={styles.circleText}>
							of {this.state.all_ratings} ratings
						</SmallText>
					</View>
					<View style={{ flex: 1 }}>
						<View style={[styles.row, styles.lineWrapper]}>
							<TextBold style={styles.text}>Buy</TextBold>
							<ProgressLine
								color={colors.green}
								total={this.state.analyst_ratings_buy_pct}
							/>
						</View>
						<View style={[styles.row, styles.lineWrapper]}>
							<TextBold style={styles.text}>Hold</TextBold>
							<ProgressLine
								color={colors.gray}
								total={this.state.analyst_ratings_hold_pct}
							/>
						</View>
						<View style={[styles.row, styles.lineWrapper]}>
							<TextBold style={styles.text}>Sell</TextBold>
							<ProgressLine
								color={colors.violet}
								total={this.state.analyst_ratings_sell_pct}
							/>
						</View>
					</View>
				</View>
				<Row
					style={{
						marginTop: padding.small,
						justifyContent: 'space-between'
					}}>
					<TextBold>Price Target: </TextBold>
					<Text>
						High:{' '}
						{formatPrice(Number(this.state.high_price_target))}
					</Text>
					<Text>
						Current: {formatPrice(Number(this.state.current_price))}
					</Text>
					<Text>
						Low: {formatPrice(Number(this.state.low_price_target))}
					</Text>
				</Row>
				<SmallLoader loading={this.state.pending} />
			</View>
		);
	}
}
