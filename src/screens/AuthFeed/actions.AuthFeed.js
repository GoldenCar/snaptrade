import { createAction } from 'redux-actions';
import qs from 'qs';
import axios from 'axios';
import API from '../../api/api';
import { AsyncStorage } from 'react-native';
import { preFetchTicket } from '../../redux/actions/ticker';
import { Actions } from 'react-native-router-flux';

export const signupRequestPending = createAction(
	'auth/signupRequestPending',
	fields => ({ fields })
);

export const signupRequestSuccess = createAction(
	'auth/signupRequestSuccess',
	data => ({ data })
);

export const signupRequestFailed = createAction(
	'auth/signupRequestFailed',
	error => ({ error })
);

export const signupRequest = ({
	email,
	nickname,
	password,
	password_confirmation,
	referrer
}) => {
	return async (dispatch: Dispatch<any>) => {
		dispatch(signupRequestPending());
		if (password !== password_confirmation) {
			dispatch(
				signupRequestFailed(
					'The password confirmation and password must match'
				)
			);
			return;
		}
		try {
			const response = await API.post(
				`users/signup`,
				qs.stringify({
					email,
					nickname,
					password,
					referrer
				})
			);
			if (response.data.error) {
				dispatch(signupRequestFailed(response.data.error));
				return;
			}
			AsyncStorage.setItem('access_token', response.data.access_token);
			axios.defaults.headers.common[
				'Authorization'
			] = `Bearer ${response.data.access_token}`;
			Actions.Main();
			dispatch(signupRequestSuccess());
		} catch (error) {
			console.log('Error fetching signup request', error, error.response);
			if (error.response) {
				dispatch(signupRequestFailed(error.response.data.error));
			}
			dispatch(signupRequestFailed(error));
		}
	};
};

export const loginRequestPending = createAction(
	'auth/loginRequestPending',
	fields => ({ fields })
);

// TODO: change data format
export const loginRequestSuccess = createAction(
	'auth/loginRequestSuccess',
	data => ({ data })
);

export const loginRequestFailed = createAction(
	'auth/loginRequestFailed',
	error => ({ error })
);



const loginRequest = ({ username, password, ...props }) => {
	return async (dispatch: Dispatch<any>) => {
		dispatch(loginRequestPending());
		try {
			const response = await API.post(
				`login`,
				qs.stringify({ username, password })
			);
			if (response.data.error) {
				dispatch(loginRequestFailed(response.data.error));
				return;
			}
			AsyncStorage.setItem('access_token', response.data.access_token);
			axios.defaults.headers.common[
				'Authorization'
			] = `Bearer ${response.data.access_token}`;
			dispatch(loginRequestSuccess());
		} catch (error) {
			console.log('Error fetching signup request', error, error.response);
			if (error.response) {
				dispatch(loginRequestFailed(error.response.data.error));
			}
			dispatch(loginRequestFailed(error));
		}
	};
};

// export const logout = () => {
// 	return async (dispatch: Dispatch<any>, getState) => {
// 		try {
// 			dispatch(createAction('auth/logout'));
// 			let res = getState();
//
// 		} catch (error) {
// 			console.log({ error });
// 		}
// 	};
// };

export const logout = createAction('auth/logout');

export const login = createAction('auth/login');
export { loginRequest };

export const clearAuthState = createAction('auth/clearAuthState');
