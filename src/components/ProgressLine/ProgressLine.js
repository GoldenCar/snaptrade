import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import {
	backgroundColor,
	padding,
	colors,
	textStyles,
	textColors,
	fonts
} from '../../styles/base';
import { TextBold } from '../UIComponents/TextComponents';
import styled from 'styled-components';

const styles = StyleSheet.create({
	wrapper: {
		marginRight: padding.medium,
		flex: 1,
		height: 6,
		borderRadius: 3,
		backgroundColor: 'rgba(247, 245, 249, 0.1)'
	},
	line: {
		height: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 3,
		justifyContent: 'flex-end',
		// backgroundColor:
	},
	text: {
		position: 'absolute',
		left: '100%',
		opacity: 1,
		top: -4,
		paddingLeft: 10
	}
});

const Wrapper = styled.View`
	margin-right: ${padding.medium};
	flex: 1;
	height: 6px;
	border-radius: 3px;
	background-color: ${props => props.theme.colors.ProgressLine};
`;

export default class ProgressLine extends Component {
	static defaultProps = {
		total: 30,
		color: colors.gray
	};

	render() {
		return (
			<Wrapper>
				<View
					style={[
						styles.line,
						{
							width: `${Math.ceil(this.props.total)}%`,
							backgroundColor: this.props.color
						}
					]}>
					<TextBold style={styles.text}>{this.props.total}%</TextBold>
				</View>
			</Wrapper>
		);
	}
}
