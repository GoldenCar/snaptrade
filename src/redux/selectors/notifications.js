import { State } from '../actions/types';
import { createSelector } from 'reselect';

const getRootPath = (state: State = {}) => {
	return state.notifications;
};

export const getShowAllNotifications = createSelector(
	getRootPath,
	notifications => notifications.show_all_notifications
);

export const getNotificationsList = createSelector(
	getRootPath,
	notifications => notifications.list
);

export const getNotificationsListFiltred = createSelector(
	getNotificationsList,
	getShowAllNotifications,
	(list, show_all_notifications) => {
		if (list.length < 4 || show_all_notifications) return list;
		return list.slice(0, 4);
	}
);

export const getNotificationsUnreadCount = createSelector(
	getRootPath,
	notifications => notifications.unread_count
);
export const getNotificationsPending = createSelector(
	getRootPath,
	notifications => notifications.pending
);

export const getNotificationLates = createSelector(
	getRootPath,
	notifications => notifications.last
);
