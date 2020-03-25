import { StyleSheet } from 'react-native';
import { dimensions, padding } from '../../styles/base';
const DiscoveryBigComponentStyles = StyleSheet.create({
	wrapper: {
        
    },
    imageWrapper: {
        marginTop: padding.small,
	    marginBottom: 15
    },
	image: {
		width: '100%',
		height: dimensions.fullWidth * 0.6
	}
});
export default DiscoveryBigComponentStyles;
