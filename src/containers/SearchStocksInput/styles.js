import { StyleSheet } from 'react-native';
import {
	backgroundColor,
	borderColor,
	radius,
	colors,
	padding,
	spacingOrSizingScale,
	icons,
	dimensions
} from '../../styles/base';
export default StyleSheet.create({
	wrapper: {
		width: '100%',
		alignItems: 'center',
		flexDirection: 'row',
		position: 'relative'
	},
	inputWrapper: {
		width: 0,
		height: icons.large,
		borderWidth: 1,
		borderColor: 'blue',
		opacity: 0,
		borderRadius: radius.input,
		paddingLeft: 5
	},
	inputWrapperActive: {
		width: dimensions.fullWidth - icons.large - padding.xlarge,
		opacity: 1
	},
	input: {
	},
	inputActive: {
		opacity: 1
	},
	icon: {
		width: icons.large,
		height: icons.large,
	}
});
