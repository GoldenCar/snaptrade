import { StyleSheet } from 'react-native';
import {
	dimensions,
	colors,
	fontWeights,
	fonts,
	padding,
	spacingOrSizingScale
} from '../../styles/base';

// const imageWidth = dimensions.fullWidth / 3;
const DiscoverySmallComponentStyles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 15
	},
	wrapper: {
		// height: dimensions.fullHeight / 2.5,
		width: dimensions.fullWidth / 2 - 15,
		padding: padding.small,
		elevation: 1,
		shadowOffset: { width: 3, height: 3 },
		shadowColor: 'black',
		shadowOpacity: 0.2,
		borderRadius: spacingOrSizingScale._4
	},
	company: {
		fontSize: fonts.body,
		fontWeight: '900'
	},
	ticker: {
		marginLeft: spacingOrSizingScale._4,
		fontSize: fonts.small_text,
		color: colors.blue,
		fontWeight: fontWeights.bold
	},
	price: {
		fontSize: fonts.body
	},
	diff: {
		marginHorizontal: 5,
		fontSize: fonts.small_text,
		color: colors.red
	},
	chartWrapper: {
		width: '100%',
		// height: 100,
		marginVertical: padding.xsmall,
		backgroundColor: 'rgba(0,0,0,0.4)'
	},
	title: {
		fontWeight: fontWeights.bold,
		fontSize: fonts.subtitle,
		marginRight: spacingOrSizingScale._4
	},
	subtitle: {
		fontSize: fonts.xsmall_title,
		fontWeight: fontWeights.normal
	},
	discovery: {
		fontWeight: fontWeights.bold,
		fontSize: 13
	},
	time: {
		color: colors.gray,
		textTransform: 'uppercase'
	},
	label: {
		fontSize: fonts.xsmall_text,
		fontWeight: fontWeights.bold
	},
	text: {
		fontSize: 9,
		color: colors.dark
	},
	ml: {
		marginLeft: spacingOrSizingScale._4
	}
});

export default DiscoverySmallComponentStyles;
