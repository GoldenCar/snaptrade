import { StyleSheet } from 'react-native';
import { fonts, colors, padding, spacingOrSizingScale } from '../../styles/base';

export default StyleSheet.create({
	wrapper: {
		flex: 1,
	},
	wrapperContent: {
		paddingHorizontal: spacingOrSizingScale._48
	},
	titleWrapper: {
		marginVertical: padding.chubby
	},
	inputWrapper: {
		marginVertical: padding.xlarge,
		alignItems: 'center'
	},
	title: {
		fontSize: fonts.large_title,
		marginVertical: padding.xlarge,
		color: colors.gray
	}
});
