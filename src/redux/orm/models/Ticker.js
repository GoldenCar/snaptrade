// @flow
import { Model, many, fk, attr } from 'redux-orm';
import type { Action } from './actions.Ticker';
import {
	CREATE_OR_UPDATE_TICKER,
	ADD_CHART_TICKER,
	DELETE_TICKER
} from '../../actions/actionTypes';

// Maintaining Tickers in the ORM
export default class Ticker extends Model {
	static reducer(action: Action, Ticker: Class<Ticker>, session: any) {
		switch (action.type) {
			case CREATE_OR_UPDATE_TICKER:
				{
					const { tickerName, tickerData } = action.payload;
					const props = {
						ticker: tickerName,
						companyName: tickerData.company_name,
						closePrice: tickerData.close,
						priceIncreaseOverLastDay: tickerData.price_increase_over_last_day,
						pricePctIncreaseOverLastDay: tickerData.price_pct_increase_over_last_day,
						closeFormatted: tickerData.close_formatted,
						marketCapFormatted: tickerData.market_cap_formatted
					};
					Ticker.upsert(props);
				}
				break;
			// case ADD_CHART_TICKER:
			//   {
			//     const { tickerName, chartID } = action.payload;
			//     if (Ticker.idExists(tickerName)) {
			//       Ticker.withId(tickerName).chartData.add(chartID);
			//     } else {
			//       console.error('Ticker not fetched, but fetching chart: ' + action);
			//     }
			//   }
			//   break;
			case DELETE_TICKER:
				const { tickerName } = action.payload;
				Ticker.withId(tickerName).delete();
				break;
		}
		// Return value is ignored.
		return undefined;
	}

	toString(): string {
		return this.ticker;
	}
}

Ticker.fields = {
	ticker: attr(),
	companyName: attr(),
	closePrice: attr(),
	priceIncreaseLastDay: attr()
};

Ticker.modelName = 'Ticker';
Ticker.backend = {
	idAttribute: 'ticker'
};
