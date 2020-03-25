// @flow

export type ChartDataPoint = {
  close_formatted: string,
  close: number,
  date: string,
  date_unixtime: number,
};

export type ChartDataModel = {
  points: [ChartDataPoint],
};
