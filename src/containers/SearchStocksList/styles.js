import { StyleSheet } from 'react-native';
import { colors, dimensions, spacingOrSizingScale, padding, radius } from '../../styles/base';

export default StyleSheet.create({
	wrapper: {
		height: dimensions.fullHeight / 2,
		overflow: 'hidden',
		position: 'absolute',
		top: 0,
		left: 0,
		width: dimensions.fullWidth
	},
	scrollWrapper: {
		borderBottomWidth: 1,
		borderBottomColor: colors.dark,
		backgroundColor: colors.white
	},
	wrapperActive: {
		height: dimensions.fullHeight / 2
	},
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
