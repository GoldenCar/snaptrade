// @flow

import type { Dispatch } from 'redux';

import type { TickerModel, TickerSymbol } from '../../../data/TickerModel';
import {
  CREATE_OR_UPDATE_TICKER,
  ADD_CHART_TICKER,
  DELETE_TICKER,
} from '../../actions/actionTypes';

// Create or Update Ticker

export type CreateOrUpdateTicker = {
  type: typeof CREATE_OR_UPDATE_TICKER,
  payload: {
    tickerName: TickerSymbol,
    tickerData: TickerModel,
  },
};

export const createOrUpdateTicker = (
  tickerName: TickerSymbol,
  tickerData: TickerModel,
): CreateOrUpdateTicker => ({
  type: CREATE_OR_UPDATE_TICKER,
  payload: { tickerName: tickerName, tickerData: tickerData },
});

// addChartToTicker

export type AddChartToTicker = {
  type: typeof ADD_CHART_TICKER,
  payload: {
    tickerName: TickerSymbol,
    chartID: string,
  },
};

export const addChartToTicker = (tickerName: TickerSymbol, chartID: string): AddChartToTicker => ({
  type: ADD_CHART_TICKER,
  payload: { tickerName: tickerName, chartID: chartID },
});

// DeleteTicker

export type DeleteTicker = {
  type: typeof DELETE_TICKER,
  payload: {
    tickerName: TickerSymbol,
  },
};

export const deleteTicker = (tickerName: TickerSymbol): DeleteTicker => ({
  type: DELETE_TICKER,
  payload: { tickerName: tickerName },
});

export type Action = CreateOrUpdateTicker | DeleteTicker | AddChartToTicker;
