import { StyleSheet } from 'react-native';
import {
	colors,
	backgroundColor,
	radius,
	padding,
	spacingOrSizingScale,
	textColors
} from '../../styles/base';

const TagComponentStyles = StyleSheet.create({
	wrapper: {
		paddingVertical: padding.xsmall,
        paddingHorizontal: padding.chubby,
        marginRight: padding.chubby,
        marginBottom: padding.chubby,
		borderRadius: radius.button,
		backgroundColor: backgroundColor.tag
	},
	text: {
		color: colors.purple,
	}
});

export default TagComponentStyles;
