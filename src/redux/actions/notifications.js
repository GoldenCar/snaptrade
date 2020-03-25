import { createAction } from 'redux-actions';
import api from '../../api/api';
import { FETCH_NOTIFICATION_UNREAD_INTERVAL } from '../../constants';

export const clearNotificationsState = createAction('notifications/clear');

export const notificationsRequestPending = createAction(
	'notifications/notificationsRequestPending'
);
export const notificationsRequestSuccess = createAction(
	'notifications/notificationsRequestSuccess',
	list => ({ list })
);
export const notificationsRequestFailed = createAction(
	'notifications/notificationsRequestFailed',
	error => ({ error })
);

export const notificationsRequest = () => {
	return async (dispatch: Dispatch<any>) => {
		dispatch(notificationsRequestPending());
		try {
			const response = await api.get(`/notifications`);
			if (response.data.error) {
				dispatch(notificationsRequestFailed(response.data.error));
				return;
			}
			dispatch(notificationsRequestSuccess(response.data));
		} catch (error) {
			console.log(
				'Error fetching notifications list  request',
				error,
				error.response
			);
			if (error.response) {
				dispatch(notificationsRequestFailed(error.response.data.error));
			}
			dispatch(notificationsRequestFailed(error));
		}
	};
};

export const showAllNotifications = createAction(
	'notifications/showAllNotifications'
);

export const notificationsFetchUnreadCountPending = createAction(
	'notifications/notificationsFetchUnreadCountPending'
);
export const notificationsFetchUnreadCountSuccess = createAction(
	'notifications/notificationsFetchUnreadCountSuccess',
	(count: number = 1) => ({ count })
);
export const notificationsFetchUnreadCountFailed = createAction(
	'notifications/notificationsFetchUnreadCountFailed'
);

export const notificationsFetchUnreadCount = () => {
	return async (dispatch: Dispatch<any>) => {
		dispatch(notificationsFetchUnreadCountPending());
		try {
			const response = await api.get(`/notifications/count`);
			if (response.data.error) {
				dispatch(
					notificationsFetchUnreadCountFailed(response.data.error)
				);
				return;
			}

			dispatch(notificationsFetchUnreadCountSuccess(response.data.unseen_count));
		} catch (error) {
			console.log(
				'Error fetching notifications unread count  request',
				error,
				error.response
			);
			if (error.response) {
				dispatch(
					notificationsFetchUnreadCountFailed(
						error.response.data.error
					)
				);
			}
			dispatch(notificationsFetchUnreadCountFailed(error));
		}
	};
};

export const notificationsFetchSeens = () => {
	return async (dispatch: Dispatch<any>) => {
		try {
			const response = await api.post(`/notifications/seen`);
			console.log('Success fetch seens', response.data);
		} catch (error) {
			console.log(
				'Error fetching notifications unread count  request',
				error,
				error.response
			);
		}
	};
};

export const notificationsFetchClick = id => {
	return async (dispatch: Dispatch<any>) => {
		try {
			console.log('fetch click by - ', id);
			const response = await api.post(`/notifications/click/${id}`);
			console.log(
				'success fetch click by notification',
				{ id },
				response.data
			);
		} catch (error) {
			console.log(
				'Error fetching notifications unread count  request',
				error,
				error.response
			);
		}
	};
};



export const notificationsFetchLastPending = createAction(
	'notifications/notificationsFetchLastPending'
);
export const notificationsFetchLastSuccess = createAction(
	'notifications/notificationsFetchLastSuccess',
	(notifications) => ({ notifications })
);
export const notificationsFetchLastFailed = createAction(
	'notifications/notificationsFetchLastFailed'
);

export const notificationsFetchLates = () => {
	return async (dispatch: Dispatch<any>) => {
		try {
			dispatch(notificationsFetchLastPending());
			const response = await api.get(`/notifications?limit=4`);
			dispatch(notificationsFetchLastSuccess(response.data))
		} catch (error) {
			dispatch(notificationsFetchLastFailed())
			console.log(
				'Error fetching notifications unread count  request',
				error,
				error.response
			);
		}
	};
};
