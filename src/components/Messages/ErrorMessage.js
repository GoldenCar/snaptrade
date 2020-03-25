import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

type MessageProps = {
	message: string
};
class ErrorMessage extends Component<MessageProps> {
	render() {
		return (
			<View style={styles.wrapper}>
				<Text style={styles.message}>{this.props.message} </Text>
			</View>
		);
	}
}

export default ErrorMessage;
