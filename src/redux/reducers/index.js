import { createreducer } from 'redux-orm';

import type { State, Action } from '../types';
// import homeFeedReducer from '../../screens/WacthListFeed/reducer.HomeFeed';
import authFeedReducer from '../../screens/AuthFeed/reducer.AuthFeed';
import userReducer from './user';
import tickerReducer from './ticker';
import notificationsReducer from './notifications';
import discoveryReducer from './discovery';
import watchlistReducer from './watchlist';
import chartsReducer from './charts';
import settingReducer from './setting';
import orm, { ormReducer } from '../orm';
import { combineReducers } from 'redux';


// export default combineReducers({
// 	discovery: discoveryReducer,
// 	orm: ormReducer,
// 	auth: authFeedReducer,
// 	user: userReducer,
// 	notifications: notificationsReducer,
// 	ticker: tickerReducer,
// 	watchlist: watchlistReducer,
// 	charts: chartsReducer,
// 	setting: settingReducer
// });

const allReducers = {
	discovery: discoveryReducer,
	orm: ormReducer,
	auth: authFeedReducer,
	user: userReducer,
	notifications: notificationsReducer,
	ticker: tickerReducer,
	watchlist: watchlistReducer,
	charts: chartsReducer,
	setting: settingReducer
};

export default allReducers;
