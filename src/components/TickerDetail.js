import React from 'react';
import { Text, View, RefreshControl } from 'react-native';
import { withNavigation } from 'react-navigation';
import type { TickerDetailModel } from '../data/TickerDetailModel';

import DetailChart from './TickerDetailComponents/DetailChart';
import DetailHeader from './TickerDetailComponents/DetailHeader';
import Details from './TickerDetailComponents/Details';
import ChartPeriodButtons from './TickerDetailComponents/ChartPeriodButtons';

import TickerNews from './Common/TickerNews';
import { colors, backgroundColor, padding } from '../styles/base';
import TagListContainer from '../containers/TagListContainer/TagListContainer';
import { ScrollView } from 'react-native-gesture-handler';
import { groupChartsLine } from './Common/TickerChart';
import TickerChart from './TickerChart/TickerChart';
import SummaryBox from './TickerDetailComponents/SummaryBox';
import AnalystRating from './AnalystRating/AnalystRating';
import EarningChartComponent from './EarningChart/EarningChartComponent';
import PriceAlert from './TickerDetailComponents/PriceAlert';
import styled from 'styled-components';

type Props = {
	tickerDetails: TickerDetailModel
};

/**
 * Functional component to show a Ticker Card in Feed.
 * Go to details page on tap
 **/

class TickerDetail extends React.Component<{}, State> {
	state = {
		scrollEnabled: true
	};

	changeScroll = () => {
		this.setState(
			state => {
				return { scrollEnabled: !state.scrollEnabled };
			},
			() => console.log(this.state)
		);
	};

	render() {
		const { props } = this;
		return (
			<ScrollView
				scrollEnabled={this.state.scrollEnabled}
				keyboardDismissMode={'interactive'}
				refreshControl={
					<RefreshControl
						refreshing={false}
						onRefresh={props._onRefresh}
					/>
				}
				contentContainerStyle={{ paddingBottom: 75, paddingTop: 5 }}>
				<DetailHeader
					tickerData={props.tickerData}
					tickerDetails={props.tickerDetails}
				/>
				<Chart>
					<TickerChart
						changeScroll={this.changeScroll}
						xAxis={false}
						yAxis={false}
						period={props.timePeriod}
						withPoints={true}
						fetchOnMount={true}
						ticker={props.tickerData.ticker}
					/>
				</Chart>
				<ChartPeriodButtons
					timePeriod={props.timePeriod}
					action={props.action}
					tickerData={props.tickerData}
					tickerDetails={props.tickerDetails}
				/>
				<SummaryBox ticker={props.tickerData.ticker} />
				<Details tickerDetails={props.tickerDetails} />
				<TagListContainer max={4} ticker={props.tickerData.ticker} />
				<PriceAlert ticker={props.tickerData.ticker} />
				<TickerNews tickerNews={props.tickerNews} />
				<AnalystRating ticker={props.tickerData.ticker} />
				<EarningChartComponent ticker={props.tickerData.ticker} />
			</ScrollView>
		);
	}
}

export const renderChart = (
	chartData: ?string,
	priceIncrease: number,
	height = 240,
	isSmall
): any => {
	if (!chartData) return null;

	// let data = groupChartsLine(chartData);
	let data = chartData;
	if (!data) return null;
	let color = priceIncrease < 0 ? colors.red : colors.green;
	return (
		<DetailChart
			isSmall={isSmall}
			chartData={data}
			height={height}
			height={height}
			width={'100%'}
			color={color}
			detail="true"
		/>
	);
};

const Chart = styled.View`
	height: 240px;
	width: 100%;
	background-color: ${props => props.theme.colors.background};
	flex-direction: row;
	justify-content: space-between;
	align-items: stretch
`;

const styles = {
	containerStyleRow: {
		height: 240,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'stretch'
	},
	containerStyleCol: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'stretch',
		backgroundColor: backgroundColor.primary
	},
	textContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-end',
		backgroundColor: backgroundColor.primary
	}
};

export default TickerDetail;
