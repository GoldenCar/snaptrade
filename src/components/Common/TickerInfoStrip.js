// @flow

import React from "react";
import { Text, View } from "react-native";

import Ticker from "../../redux/orm/models/Ticker";
import TickerChart from "../Common/TickerChart";
import TickerPriceChangeView from "./TickerPriceChangeView";
import ChartData, {
  chartDataID,
  CHART_KEY_1D
} from "../../redux/orm/models/ChartData";

import { padding, textStyles } from "../../styles/base.js";
import { getChartWidth, getChartWidthByDots } from "../../utils/chart";
import { ListItem } from "react-native-elements";
import StockChart from "../StockChart/TickerChart";

type Props = {
  ticker: Ticker
};

/**
 * Functional component to show a Ticker Strip.
 * Strip has the Ticker, Company Name, Mini chart, current price and price_pct_increase_over_last_day.
 **/
const TickerInfoStrip = ({ ticker, onPress }: Props) => {
  let textContainerStyle1 = {
    ...styles.textContainer,
    alignItems: "flex-start",
    flex: 2
  };
  return (
    <ListItem title={ticker.ticker} subtitle={ticker.companyName} rightElement={<React.Fragment>
      <View style={styles.textContainer}>
        <Text style={styles.priceText}>{ticker.closePrice.toFixed(2)}</Text>
        <TickerPriceChangeView
          margin={padding.small}
          views={[{
            value: ticker.priceIncreaseLastDay,
            symbol: '%'
          }, {
            value: ticker.closeFormatted,
            symbol: ''
          }, {
            value: ticker.marketCapFormatted,
            symbol: ''
          }]}
        />
      </View>
    </React.Fragment>} />
  );
};

export const renderChart = (ticker: Ticker): any => {
  if (!ticker.chartData.exists()) return null;

  const chartID = chartDataID(ticker.ticker, CHART_KEY_1D);
  const chartData = ticker.chartData
    .filter(cd => cd.chartID === chartID)
    .first();
  if (chartData == null || chartData == undefined) return null;
  const chartWidth = getChartWidthByDots(chartData.chartPoints.length)

  const color = ticker.priceIncreaseLastDay < 0 ? "red" : "green";
  return (
    <TickerChart
      chartData={chartData.chartPoints}
      priceIncreaseLastDay={ticker.priceIncreaseLastDay}
      height={40}
      width={85}
      chartWidth={chartWidth}
      color={color}
    />
  );
};


const styles = {
  containerStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%"
  },
  textContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-end"
  },
  titleText: {
    ...textStyles.title,
    padding: padding.small
  },
  subtitleText: {
    ...textStyles.subtitle,
    padding: padding.small
  },
  priceText: {
    ...textStyles.subtitle,

    padding: padding.small
  },
  priceChangeText: {
    ...textStyles.body,
    padding: padding.small
  }
};

export default TickerInfoStrip;
