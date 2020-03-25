import { StyleSheet } from 'react-native';
import { fonts, colors, icons } from '../../styles/base';

export default StyleSheet.create({
	wrapper: {
		width: '100%',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	loader: {
		width: icons.medium,
		height: icons.medium
	}
});
