import { StyleSheet } from 'react-native';
import {
	borderColor,
	radius,
	colors,
	padding,
	spacingOrSizingScale,
	backgroundColor
} from './base';

export const inputStyles = StyleSheet.create({
	main: {
		paddingHorizontal: 0,
		marginBottom: padding.xlarge
	},
	container: {
		borderRadius: radius.input,
		height: spacingOrSizingScale._48,
		elevation: spacingOrSizingScale._2,
		borderColor: borderColor.secondary,
		paddingHorizontal: padding.chubby,
		marginHorizontal: 0,
		backgroundColor: colors.white
	},
	iconContainer: {
		marginRight: padding.xlarge
	}
});

export const buttonStyles = StyleSheet.create({
	main: {
		paddingHorizontal: 0,
		marginBottom: padding.xlarge
	},
	conatiner: {
		borderRadius: radius.button,
		elevation: spacingOrSizingScale._2,
		height: spacingOrSizingScale._48
	}
});

export const mainStyles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		flexWrap: 'wrap'
	},
	rowEnd: {
		justifyContent: 'flex-end'
	},
	between: {
		justifyContent: 'space-between'
	}
});


export const controlsStyles = {
	input: {
		height: 48,
		width: 240,
		paddingHorizontal: 14,
		paddingVertical: 12,
	}
}