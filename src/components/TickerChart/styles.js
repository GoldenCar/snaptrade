import { StyleSheet } from 'react-native'
import { textColors, padding, colors, backgroundColor, textStyles } from '../../styles/base';

export const TickerChartStyled = StyleSheet.create({
	wrapper: {
        height: 210,
        width: '100%'
    },
    chart: {
        // paddingLeft: 25,
        // left: 25,
        paddingBottom: 10
    },
    yAxis: {
        height: '100%',
        alignItems: 'flex-start',
        color: textColors.primary
    },
    xAxis: {
        width: '100%',
        marginLeft: 30,
        flexDirection: 'row',
        borderColor: colors.gray,
        alignItems: 'flex-end',
        justifyContent: 'space-between'
    },
    loader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    chartTopLabels: {
        ...textStyles.body,
        width: '100%',
        textAlign: 'center'
    }
});
