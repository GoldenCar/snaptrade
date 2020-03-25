import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { fonts, spacingOrSizingScale } from '../../../styles/base';

export default class ButtonComponent extends Component {
	static defaultProps = {
		title: ''
	};
	render() {
		const { titleStyle, containerStyle, buttonStyle,  ...props } = this.props;
		return (
			<Button
				title={this.props.title}
				{...props}
				containerStyle={StyleSheet.flatten([styles.container, containerStyle])}
				buttonStyle={StyleSheet.flatten([styles.button, buttonStyle])}
				titleStyle={StyleSheet.flatten([styles.title, titleStyle])}
			/>
		);
	}
}

const styles = StyleSheet.create({
	title: {
		// fontFamily: 'notoSansMedium',
		fontSize: fonts.subtitle
	},
	button: {
		borderRadius: 6,
		backgroundColor:  '#6979f8',
		paddingVertical: 12,
		marginBottom: 15,
		height: 48
	},
	container: {

	}
});
