// @flow

import { ORM, createReducer } from 'redux-orm';
import Ticker from './models/Ticker';
import ChartData from './models/ChartData';

const orm = new ORM();
orm.register(Ticker, ChartData);

export const ormReducer = createReducer(orm);
export const dbStateSelector = (state: any) => state.orm;
export default orm;
