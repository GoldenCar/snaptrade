import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
	colors,
	textColors,
	fonts,
	padding,
	fontWeights
} from '../../styles/base.js';
import { formatPrice } from '../../utils/index';
import { connect } from 'react-redux';
import { mainStyles } from '../../styles/controls.js';
import { getUserLoggin } from '../../redux/selectors/user';
import {
	PriceBigText,
	TextTickerExtraBig,
	Text,
	TextTickerBig
} from '../UIComponents/TextComponents';
import { Row, ContentOffset } from '../UIComponents/MainComponents.js';

const styles = StyleSheet.create({
	wrapper: {
		paddingHorizontal: padding.screen
	},
	row: {
		flexDirection: 'row',
		alignItems: 'flex-end',
		justifyContent: 'flex-start',
		marginBottom: padding.small
	},
	offset: {
		marginRight: padding.xlarge
	},
	title: {
		fontSize: fonts.large_title,
		color: textColors.primary,
		fontWeight: fontWeights.bold
	},
	subtitle: {
		fontSize: fonts.subtitle,
		color: textColors.primary,
		fontWeight: fontWeights.bold,
		marginRight: padding.medium
	},
	light: {
		fontSize: fonts.small_text,
		color: textColors.tertiary
	},
	success: {
		color: colors.green
	},
	danger: {
		color: colors.red
	}
});

const getDiffPrice = number => (number < 0 ? styles.danger : styles.success);

class DetailHeader extends React.Component {
	render() {
		const { isLogin, ...props } = this.props;
		const isZero = props.tickerDetails.is_market_hours == 0;
		return (
			<View style={styles.wrapper}>
				<View style={[mainStyles.row, { alignItems: 'flex-start' }]}>
					<View>
						<Row style={{ marginVertical: padding.chubby }}>
							<TextTickerExtraBig color={colors.purple}>
								{props.tickerData.ticker}{' '}
							</TextTickerExtraBig>
							<TextTickerExtraBig
								numberOfLines={1}>
								{props.tickerDetails.company_name}
							</TextTickerExtraBig>
						</Row>
						<View style={styles.row}>
							<View style={styles.offset}>
								<View style={[styles.row, { alignItems: 'center' }]}>
									<PriceBigText style={{ fontSize: 24, lineHeight: 26 }}>
										{formatPrice(
											props.tickerDetails.close,
											2
										)}
									</PriceBigText>
									<Text
										style={[
											styles.light,

											getDiffPrice(
												props.tickerDetails
													.price_increase_over_last_day
											),
											{
												fontSize: 16,
												lineHeight: 18,
												marginTop: 5
											}
										]}>
										{formatPrice(
											props.tickerDetails
												.price_increase_over_last_day,
											2,
											true
										)}
									</Text>
								</View>
								<Text style={styles.light}>
									{isZero ? 'At Close' : ''}
								</Text>
							</View>
							{isZero ? (
								<View>
									<View style={[styles.row, { alignItems: 'center' }]}>
										<PriceBigText  style={{ fontSize: 24, lineHeight: 26 }}>
											{formatPrice(
												props.tickerDetails
													.off_market_price
											)}
										</PriceBigText>
										<Text
											style={[
												styles.light,
												getDiffPrice(
													props.tickerDetails
														.off_market_price_change
												),
												{
													fontSize: 16,
													lineHeight: 18,
													marginTop: 5
												}
											]}>
											{formatPrice(
												props.tickerDetails
													.off_market_price_change,
												2,
												true
											)}
										</Text>
									</View>
									<Text style={styles.light}>
										{isZero ? 'After Hours' : ''}
									</Text>
								</View>
							) : null}
						</View>
					</View>
				</View>
			</View>
		);
	}
}

const mapStateToProps = state => ({
	isLogin: getUserLoggin(state)
});

const mapDispatchToProps = {};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DetailHeader);
