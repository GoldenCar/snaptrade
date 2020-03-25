import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { BoxShadow } from 'react-native-shadow';
import { colors } from '../../styles/base';

export default class ShadowComponent extends Component {
	static defaultProps = {
		color: colors.gray,
		border: 2,
		radius: 3,
		opacity: 0.2,
		x: 0,
		y: 3,
		style: {  }
	};
	render() {
        const { children, style, ...props } = this.props
		return (
			<View style={style}>
				<BoxShadow setting={props}>{children}</BoxShadow>
			</View>
		);
	}
}
