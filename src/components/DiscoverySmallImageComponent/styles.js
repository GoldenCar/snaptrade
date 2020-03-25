import { StyleSheet } from 'react-native';
import { dimensions, colors, fontWeights, fonts } from '../../styles/base';

const imageWidth = dimensions.fullWidth / 3;
const DiscoverySmallComponentStyles = StyleSheet.create({
	wrapper: {
		display: 'flex',
		flexDirection: 'row',
		marginBottom: 15
	},
	image: {
		width: imageWidth + 10,
		height: imageWidth * 0.8
	},
	title: {
		color: colors.dark,
		fontWeight: fontWeights.bold,
		fontSize: 12
	},
	smallText: {
		fontSize: 10
	},
	ticker: {
		color: colors.blue,
		fontWeight: fontWeights.bold
	},
	price: {
		marginHorizontal: 3.5
	},
	time: {
		color: colors.gray,
		textTransform: 'uppercase'
	},
	leftImageWrapper: {
		marginRight: 20
	},
	rightImageWrapper: {
		marginLeft: 20
	}
});

export default DiscoverySmallComponentStyles;
