import { colors, colorsDark } from './base';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const dimension = { width, height };
export const lightTheme = {
	colors: {
		...colors,
		text: colors.text,
		line: colors.light_gray,
		background: colors.white,
		ProgressLine: 'rgb(247, 245, 249)',
		blockBackground: '#ffffff'
	},
	dimension
};

export const DarkTheme = {
	colors: {
		...colorsDark,
		line: colorsDark.light_gray,
		text: colorsDark.white,
		background: colorsDark.dark,
		ProgressLine: 'rgba(247, 245, 249, 0.1)',
		blockBackground: 'rgba(255, 255, 255, 0.06)'
	},
	dimension
};
