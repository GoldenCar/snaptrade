import { handleActions, combineActions } from 'redux-actions';

import { clearUserState } from '../actions/user';
import {
	signupRequestSuccess,
	loginRequestSuccess,
	logout,
	login
} from '../../screens/AuthFeed/actions.AuthFeed';
import {
	notificationsRequestSuccess,
	clearNotificationsState,
	notificationsRequestFailed,
	notificationsRequestPending,
	showAllNotifications,
	notificationsFetchUnreadCountSuccess,
	notificationsFetchUnreadCountFailed,
	notificationsFetchLastPending,
	notificationsFetchLastSuccess,
	notificationsFetchLastFailed
} from '../actions/notifications';

export type TNotificationsState = {|
	list: Array,
	unread_count: number
|};

const initialState: TNotificationsState = {
	list: [],
	unread_count: 0,
	last: [],
	error: '',
	pending: false,
	show_all_notifications: false
};

const reducer = handleActions(
	{
		[notificationsFetchLastPending]: (state, action) => ({
			...state,
			pending: true
		}),
		[notificationsFetchLastSuccess]: (state, action) => {
			return {
				...state,
				pending: false,
				last: action.payload.notifications
			};
		},
		[notificationsFetchLastFailed]: (state, action) => ({
			...state,
			pending: false
		}),

		//
		[notificationsRequestPending]: (state, action) => ({
			...state,
			unread_count: 0,
			pending: true
		}),
		[notificationsRequestFailed]: (state, action) => ({
			...state,
			error: action.payload.error,
			pending: false
		}),
		[notificationsRequestSuccess]: (state, action) => ({
			...state,
			list: action.payload.list,
			unread_count: 0,
			pending: false
		}),
		[notificationsRequestFailed]: (state, action) => ({
			...state,
			error: action.payload.error
		}),
		[showAllNotifications]: state => ({
			...state,
			show_all_notifications: true
		}),
		[notificationsFetchUnreadCountSuccess]: (state, action) => ({
			...state,
			unread_count: action.payload.count
		}),
		[combineActions(logout, clearNotificationsState)]: () => ({
			...initialState
		})
	},
	initialState
);

export default reducer;
