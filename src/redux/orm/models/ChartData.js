// @flow

import type { Dispatch } from 'redux';
import { Model, many, fk, attr } from 'redux-orm';

import type { Action } from './actions.ChartData';
import { updateChart } from './actions.ChartData';
import { CREATE_CHART, UPDATE_CHART } from '../../actions/actionTypes';
import type { TickerSymbol } from '../../../data/TickerModel';
import API from '../../../api/api';
import Ticker from './Ticker';

type ChartKey = {|
  key: string,
  params: {| period: string |},
|};
// Chart data keys
export const CHART_KEY_1D: ChartKey = {
  key: 'CHART_KEY_1D',
  params: { period: '1d' },
};
export const CHART_KEY_7D: ChartKey = {
  key: 'CHART_KEY_7D',
  params: { period: '7d' },
};
export const CHART_KEY_30D: ChartKey = {
  key: 'CHART_KEY_30D',
  params: { period: '30d' },
};
export const CHART_KEY_1Y: ChartKey = {
  key: 'CHART_KEY_1Y',
  params: { period: '1y_a' },
};
export const CHART_KEY_5Y: ChartKey = {
  key: 'CHART_KEY_5Y',
  params: { period: '5y' },
};

const AllChartKeys = [CHART_KEY_1D, CHART_KEY_7D, CHART_KEY_30D, CHART_KEY_1Y, CHART_KEY_5Y];
// Create ChartData.id from Ticker and Chart key
const CHART_ID_SEPARATOR = '-';
export const chartDataID = (ticker: string, chartKey: ChartKey): string => {
  return ticker + CHART_ID_SEPARATOR + chartKey.key;
};

// Given a Chart ID, get Ticker and chart key
export const chartKeyAndTicker = (chartID: string): { ticker: string, chartKey: ChartKey } => {
  const data = chartID.split(CHART_ID_SEPARATOR, 1);
  const ticker = data[0];
  const chartKey = AllChartKeys.find(cKey => cKey.key === data[1]);
  if (chartKey === undefined) {
    console.error('Invalid chartkey for chartID: ' + chartID);
    return { ticker, chartKey: CHART_KEY_1D };
  } else {
    return { ticker, chartKey };
  }
};

// Maintaining ChartData in ORM
export default class ChartData extends Model {
  static reducer(action: Action, ChartData: Class<ChartData>, session: any) {
    switch (action.type) {
      case CREATE_CHART:
      case UPDATE_CHART: {
        const { chartID, chartData, tickerSymbol } = action.payload;
        const props = { chartID, chartPoints: chartData.points, ticker: tickerSymbol };
        ChartData.upsert(props);
        break;
      }
    }
    // Return value is ignored.
    return undefined;
  }

  toString(): string {
    return this.chartID;
  }
}

ChartData.fields = {
  chartID: attr(),
  chartPoints: attr(),
  ticker: fk('Ticker', 'chartData'),
};

ChartData.modelName = 'ChartData';
ChartData.backend = {
  idAttribute: 'chartID',
};

export const fetchChartData1D = (tickerSymbol: TickerSymbol) => {
  const chartKey = CHART_KEY_1D;
  const chartID = chartDataID(tickerSymbol, chartKey);

  return (dispatch: Dispatch<any>) => {
    return API.get('chart/tickers/' + tickerSymbol, { params: { ...chartKey.params } })
      .then(response => {
        const chartData = { points: response.data };
        dispatch(updateChart(chartID, chartData, tickerSymbol));
      })
      .catch(error => {
        console.error('Error fetching chart data for ticker:', tickerSymbol);
      });
  };
};
