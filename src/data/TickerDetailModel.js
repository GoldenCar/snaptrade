// @flow

export type TickerDetailModel = {
  close: string,
  close_formatted: string,
  address_country: string,
  date: string,
  event_category: string,
  event_link: string,
  event_name: string,
  high: number,
  low: number,
  open: number,
  price_pct_increase_over_last_day: number,
  volume: number,
  volume_formatted: string,
  volume_pct_increase_over_avg: number,
};
