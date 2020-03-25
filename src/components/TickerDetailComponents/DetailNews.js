import React from 'react';
import { Text, View } from 'react-native';
import { fonts, padding, fontWeights } from '../../styles/base.js';

const DetailNews = (props: Props) => {
    let textContainerStyle1 = { ...styles.textContainer, alignItems: 'flex-start', flex: 3 };
    
    return (
        <View style={styles.containerStyleRow}>
            <View style={textContainerStyle1}>
                <Text style={styles.cell}>Source: {props.tickerNews.source}</Text>
                <Text style={styles.newsTitleText}>{props.tickerNews.title}</Text>
                <Text style={styles.cell}>{props.tickerNews.pub_time_days_ago_mod}</Text>
            </View>
        </View>
    );
};

const styles = {
    containerStyleRow: {
        height: 150,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        padding: padding.chubby,
        width: '150%'
    },
    cell: {
        padding: padding.xsmall
    },
    newsTitleText: {
        fontSize: fonts.medium_title,
        fontWeight: fontWeights.bold,
    }
};


export default DetailNews;
