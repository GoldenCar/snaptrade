import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { mainStyles } from '../../styles/controls';
import { getColorFromValue } from '../../utils';
import { Linking } from 'expo';
import { colors, fontWeights, fonts } from '../../styles/base';

const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 15
    },
    title: {
        color: colors.dark,
        fontWeight: fontWeights.bold,
        fontSize: 17
    },
    smallText: {
        fontSize: 10
    },
    ticker: {
        color: colors.blue,
        fontWeight: fontWeights.bold,
        fontSize: fonts.body
    },
    price: {
        marginHorizontal: 3.5
    },
    time: {
        color: colors.gray,
        textTransform: 'uppercase'
    }
});

export default class DiscoveryContent extends Component {

    state = {
        open: false
    }

    toggle = () => this.setState(state => ({ open: !state.open }))


    render() {
        const { discovery } = this.props
        return (
            <View>
                <View style={mainStyles.row}>
                    <Text
                        style={[
                            styles.smallText,
                            styles.ticker
                        ]}>
                        {discovery.ticker}
                    </Text>
                    <Text
                        style={[
                            styles.smallText,
                            styles.price,
                            {
                                color: getColorFromValue(
                                    discovery.price_pct_increase_over_last_day
                                )
                            }
                        ]}>
                        {discovery.price_pct_increase_over_last_day}%
				</Text>
                    <Text
                        style={[
                            styles.smallText,
                            styles.time
                        ]}>
                        | {discovery.pub_time_days_ago_mod}
                    </Text>
                </View>
                <TouchableOpacity onPress={this.toggle}>
                    <Text
                        numberOfLines={3}
                        style={styles.title}>
                        {discovery.title}
                    </Text>
                </TouchableOpacity>
                {this.state.open ? <View>
                    <Text
                        numberOfLines={4}
                        style={[styles.smallText]}>
                        {discovery.news_clip}
                    </Text>
                </View> : null}
            </View>
        )
    }
}
