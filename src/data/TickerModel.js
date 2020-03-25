// @flow

export type TickerSymbol = string;

export type TickerModel = {
  ticker: TickerSymbol,
  company_name: ?string,
  price_pct_increase_over_last_day: number,
  close_formatted: string,
  close: number,
};
