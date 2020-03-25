import { StyleSheet } from 'react-native';
import {
	colors,
	radius,
	padding,
	dimensions,
	fontWeights,
	spacingOrSizingScale
} from '../../styles/base';

export const DiscoveryStoryDetail = StyleSheet.create({
	wrapper: {
		width: (dimensions.fullWidth - 20) / 2,
		flexGrow: 0.5,
		padding: padding.small,
		marginBottom: padding.small
		// flex: 1
	},
	image: {
		borderWidth: 1,
		borderRadius: radius.button,
		height: dimensions.fullWidth / 3,
		width: '100%'
	},
	category: {
		color: colors.red,
		fontSize: 13
	},
	label: {
		color: colors.dark,
		fontSize: 16
	},
	text: {
		color: colors.gray,
		fontSize: 12
	}
});

export const DiscoveryStyles = StyleSheet.create({
	wrapper: {
		marginBottom: padding.chubby
	},
	showMoreButton: {
		marginLeft: 'auto',
		padding: spacingOrSizingScale._8,
		width: spacingOrSizingScale._96,
		textAlign: 'right'
	},
	image: {
		width: '100%',
		flex: 1,
		borderWidth: 1,
		height: 'auto',
		borderRadius: radius.button,
		height: dimensions.fullHeight / 2
	},
	category: {
		color: colors.red,
		fontSize: 13
	},
	label: {
		color: colors.dark,
		fontSize: 18,
		fontWeight: fontWeights.bold
	},
	text: {
		fontSize: 12,
		marginBottom: padding.chubby,
		color: colors.gray
	},
	dangerText: {
		color: colors.red
	}
});
