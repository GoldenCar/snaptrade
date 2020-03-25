import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { saveToken } from '../utils';
import { DOMAIN } from '../constants';
import store from '../configureStore';

(async () => {
	const access_token = await AsyncStorage.getItem('access_token');
	console.log({ access_token });
	if (access_token) {
		store.dispatch({
			type: 'auth/login',
			payload: true
		});
		await saveToken(access_token);
	}
})();

export default axios.create({
	baseURL: DOMAIN,
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	}
});

export const newsURL = 'https://s3.amazonaws.com/img-snaptrade-us';
