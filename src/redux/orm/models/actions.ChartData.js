// @flow

import type { Dispatch } from 'redux';

import { CREATE_CHART, UPDATE_CHART } from '../../actions/actionTypes';
import type { ChartDataModel } from '../../../data/ChartDataModel';
import type { TickerSymbol } from '../../../data/TickerModel';

// CreateChart

export type CreateChart = {
  type: typeof CREATE_CHART,
  payload: {
    chartID: string,
    chartData: ChartDataModel,
    tickerSymbol: TickerSymbol,
  },
};

export const createChart = (
  chartID: string,
  chartData: ChartDataModel,
  tickerSymbol: TickerSymbol,
): CreateChart => ({
  type: CREATE_CHART,
  payload: { chartID: chartID, chartData: chartData, tickerSymbol: tickerSymbol },
});

// UpdateChart

export type UpdateChart = {
  type: typeof UPDATE_CHART,
  payload: {
    chartID: string,
    chartData: ChartDataModel,
    tickerSymbol: TickerSymbol,
  },
};

export const updateChart = (
  chartID: string,
  chartData: ChartDataModel,
  tickerSymbol: TickerSymbol,
): UpdateChart => ({
  type: UPDATE_CHART,
  payload: { chartID: chartID, chartData: chartData, tickerSymbol: tickerSymbol },
});

export type Action = CreateChart | UpdateChart;
