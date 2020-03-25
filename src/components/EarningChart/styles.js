import { StyleSheet } from 'react-native'
import { textColors, padding, colors, backgroundColor } from '../../styles/base';

export const EarningChartStyled = StyleSheet.create({
	wrapper: {
        height: 210,
        width: '100%'
    },
    chart: {
        paddingLeft: 25,
        paddingBottom: 10
    },
    yAxis: {
        height: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    xAxis: {
        width: '100%',
        flexDirection: 'row',
        height: 15,
        justifyContent: 'space-between'

    },
    xAxisLabel: {
        transform: [{ rotate: 45 }]
    },
    loader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    earningItemWrapper: {
        marginRight: padding.xlarge,
        alignItems: "flex-start"
    },
    earningDot: {
        width: 16,
        height: 16,
        borderRadius: 8
    },
    smallOffset: {
        marginRight: padding.small
    }
});
