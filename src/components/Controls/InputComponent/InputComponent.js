import React, { Component } from 'react';
import { Input } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import { fonts, backgroundColor, colors } from '../../../styles/base';

export default class InputComponent extends Component {
	render() {
		const { inputStyle, labelStyle, inputContainerStyle, ...props } = this.props;
		return (
			<Input
				inputContainerStyle={StyleSheet.flatten([
					styles.inputContainer,
					inputContainerStyle
        ])}
        containerStyle={styles.inputContainer}
        style={styles.inputContainer}
        
				inputStyle={StyleSheet.flatten([styles.input, inputStyle])}
				labelStyle={StyleSheet.flatten([styles.label, labelStyle])}
				placeholderTextColor={'#bcb9bc'}
				{...props}
			/>
		);
	}
}

const styles = StyleSheet.create({
	label: {
		// fontFamily: 'notoSansMedium',
		fontSize: fonts.body,
		lineHeight: 1.33
	},
	input: {
		borderRadius: 6,
		backgroundColor: colors.white,
		paddingVertical: 14,
		paddingHorizontal: 12,
    height: 48,
    marginHorizontal: 0
	},
	container: {},
	inputContainer: {
		paddingHorizontal: 0,
    marginHorizontal: 0,
    borderBottomWidth: 0
	}
});
