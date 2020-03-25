import { StyleSheet, Dimensions } from 'react-native';

// Use values from here for spacing (padding/margin) or sizing components.
export const spacingOrSizingScale = {
	_2: 2,
	_4: 4,
	_8: 8,
	_10: 10,
	_12: 12,
	_16: 16,
	_20: 20,
	_24: 24,
	_32: 32,
	_48: 48,
	_64: 64,
	_96: 96,
	_128: 128,
	_192: 192,
	_256: 256,
	_384: 384,
	_512: 512,
	_640: 640,
	_768: 768
};

// Use only these values for font sizes.
const fontScale = {
	_10: 10,
	_12: 12,
	_14: 14,
	_16: 16,
	_18: 18,
	_20: 20,
	_24: 24,
	_30: 30,
	_36: 36,
	_48: 48,
	_60: 60,
	_72: 72
};

// Colors to be used throughout the app
export const colors = {
	green: '#00c48c',
	red: '#ff647c',
	gray: '#8c818e',
	dark_gray: '#bcb9bc',
	light_gray: '#f2f2f2',
	light: '#d7e9fd',
	white: '#ffffff',
	purple: '#6979f8',
	dark: '#000000',
	blue: '#0a6d91',
	violet: '#6979f8',
	violet_light: '#e5e7fa',
	background: '#1a1c20',
	text: '#1a051d'
};

export const colorsDark = {
	green: '#00c48c',
	red: '#ff647c',
	gray: '#8c818e',
	dark_gray: '#bcb9bc',
	light_gray: 'rgba(255, 255, 255, 0.1)',
	light: '#d7e9fd',
	white: '#ffffff',
	purple: '#6979f8',
	dark: '#181818',
	blue: '#0a6d91',
	violet: '#6979f8',
	violet_light: '#e5e7fa',
	background: '#1a1c20',
	text: '#1a051d'
};

export const dimensions = {
	fullHeight: Dimensions.get('window').height,
	fullWidth: Dimensions.get('window').width
};

export const textColors = {
	primary: '#f1f1f1',
	secondary: '#888',
	tertiary: '#444'
};

export const backgroundColor = {
	primary: '#131313',
	secondary: '#131313',
	primary_rev: '#ffffff',
	light: '#f7f5f9',
	tag: '#e5e7fa'
};

export const borderColor = {
	primary: '#333',
	secondary: '#555'
};

export const shadowColor = {
	primary: '#000',
	secondary: '#fff'
};

export const padding = {
	xsmall: spacingOrSizingScale._2,
	small: spacingOrSizingScale._4,
	medium: spacingOrSizingScale._8,
	chubby: spacingOrSizingScale._10,
	large: spacingOrSizingScale._12,
	xlarge: spacingOrSizingScale._16,
	screen: spacingOrSizingScale._20
};

export const fonts = {
	large_title: fontScale._24,
	medium_title: fontScale._20,
	title: fontScale._18,
	subtitle: fontScale._16,
	body: fontScale._14,
	xsmall_title: fontScale._12,
	small_text: fontScale._12,
	xsmall_text: fontScale._10,
	primary: 'Cochin'
};

export const radius = {
	input: spacingOrSizingScale._2,
	button: spacingOrSizingScale._12
};

export const icons = {
	small: spacingOrSizingScale._12,
	medium: spacingOrSizingScale._24,
	large: spacingOrSizingScale._32,
	xlarge: spacingOrSizingScale._48
};
export const iconsTypes = {
	fontAwesome: 'font-awesome'
};

export const fontWeights = {
	bold: '800',
	semi_bold: '600',
	normal: '400',
	thin: '200'
};

// Check screens/SwicthScreen to load new font
export const fontFamily = {};
export const textStyles = StyleSheet.create({
	title: {
		fontSize: fonts.title,
		fontWeight: fontWeights.semi_bold,
		color: textColors.tertiary
	},
	subtitle: {
		fontSize: fonts.subtitle,
		fontWeight: fontWeights.normal,
		color: textColors.secondary
	},
	body: {
		fontSize: fonts.body,
		fontWeight: fontWeights.normal,
		color: textColors.secondary
	}
});

export const newsWrapperShadow = {
	shadowColor: colors.gray,
	shadowOffset: { width: 0, height: 20 },
	shadowOpacity: 0.1,
	shadowRadius: 6,
	elevation: 8
};
