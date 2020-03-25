import { StyleSheet } from 'react-native';
import {
	backgroundColor,
	borderColor,
	radius,
	colors,
	padding,
	spacingOrSizingScale
} from '../../styles/base';
export default StyleSheet.create({
	wrapper: {
		paddingHorizontal: padding.medium,
		backgroundColor: colors.white,
		elevation: 5,
		width: '100%'
	},
	inputContainerWrapper: {
		paddingHorizontal: 0,
		backgroundColor: colors.white,
		borderWidth: 0
	},
	inputWrapper: {
		marginVertical: padding.small,
		padding: 0,
		borderRadius: radius.input,
		backgroundColor: colors.white,
		elevation: 4
	},
	listWrapper: {},
	addButton: {
		width: spacingOrSizingScale._32,
		padding: padding.small,
		marginRight: padding.small,
		height: spacingOrSizingScale._32,
		borderRadius: radius.button,
		borderWidth: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
});
