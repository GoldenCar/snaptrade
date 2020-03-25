// @flow

// Feed loading actions
export const FEED_FETCH_BEGIN: 'FEED_FETCH_BEGIN' = 'FEED_FETCH_BEGIN';
export const FEED_FETCH_COMPLETE: 'FEED_FETCH_COMPLETE' = 'FEED_FETCH_COMPLETE';
export const FEED_FETCH_MORE_COMPLETE: 'FEED_FETCH_MORE_COMPLETE' =
	'FEED_FETCH_MORE_COMPLETE';
export const FEED_FETCH_ERROR: 'FEED_FETCH_ERROR' = 'FEED_FETCH_ERROR';

// Maintaining Tickers in the ORM
export const CREATE_OR_UPDATE_TICKER: 'CREATE_OR_UPDATE_TICKER' =
	'CREATE_OR_UPDATE_TICKER';
export const ADD_CHART_TICKER: 'ADD_CHART_TICKER' = 'ADD_CHART_TICKER';
export const DELETE_TICKER: 'DELETE_TICKER' = 'DELETE_TICKER';

// Maintaining Charts in the ORM
export const CREATE_CHART: 'CREATE_CHART' = 'CREATE_CHART';
export const UPDATE_CHART: 'UPDATE_CHART' = 'UPDATE_CHART';

export const FETCH_SEARCH_COMPANY_PENDING: 'FETCH_SEARCH_COMPANY_PENDING' =
	'FETCH_SEARCH_COMPANY_PENDING';
export const FETCH_SEARCH_COMPANY_SUCCESS: 'FETCH_SEARCH_COMPANY_SUCCESS' =
	'FETCH_SEARCH_COMPANY_SUCCESS';
export const FETCH_SEARCH_COMPANY_FAILED: 'FETCH_SEARCH_COMPANY_FAILED' =
	'FETCH_SEARCH_COMPANY_FAILED';
