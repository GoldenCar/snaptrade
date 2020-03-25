import { StyleSheet } from 'react-native'
import { padding, colors, fonts, fontFamily } from '../../styles/base';

export default StyleSheet.create({
    wrapper: {
        padding: 0,
        marginVertical: padding.medium
    },
    message: {
        color: colors.red,
        fontSize: fonts.xsmall_title,
    }
})