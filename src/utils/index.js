import { AsyncStorage } from 'react-native';
import Axios from 'axios';
import { colors } from '../styles/base';

export const saveToken = async (token: string = '') => {
	console.log(`Bearer ${token}`);
	await AsyncStorage.setItem('access_token', token);
	Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};
export const clearToken = async (token: string = '') => {
	await AsyncStorage.removeItem('access_token');
	Axios.defaults.headers.common['Authorization'] = '';
};

export const formatPrice = (
	price: number,
	length: number = 2,
	withSymbol = false
) => {
	if (price && typeof price === 'string') {
		if (!price.includes('-') && !price.includes('+')) {
			return `+${price}`;
		}
		return price;
	}
	if (!price || typeof price !== 'number' || isNaN(price)) {
		return withSymbol ? '+0.00' : '0.00';
	}
	if (price < 0 || !withSymbol) return price.toFixed(length);
	return `+${price.toFixed(length)}`;
};

export const getColorFromValue = num =>
	num > 0 ? colors.green : num < 0 ? colors.red : colors.gray;

export const getColorFromFormattedValue = (string: string = '') =>
	string.includes('+')
		? colors.green
		: string.includes('-')
		? colors.red
		: colors.gray;

export const getPSTHours = () => new Date().getUTCHours() - 8;
