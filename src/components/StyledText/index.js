import React, { Component } from 'react';
import { Text } from 'react-native';
import StyledTextStyles from './styles';
import { fontFamily } from '../../styles/base';

type TStyledtext = {
    font: string,
    style?: object
}
export default class StyledText extends Component<TStyledtext> {
	static defaultProps = {
	};

	render() {
		return (
			<Text
				{...this.props}
				style={[
					StyledTextStyles.text,
					this.props.style,
					{ fontFamily: this.props.font }
				]}
			/>
		);
	}
}
