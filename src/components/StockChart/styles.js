import { StyleSheet } from 'react-native'
import { textColors, padding, colors } from '../../styles/base';

export const TickerChartStyled = StyleSheet.create({
	wrapper: {
        height: 45,
        width: 85
    },
    yAxis: {
        height: '100%',
        alignItems: 'flex-start',
        color: textColors.primary,
        paddingLeft: padding.small
    },
    xAxis: {
        width: '100%',
        borderTopWidth: 0.5,
        borderColor: colors.gray
    },
    loader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
