import React, { Component } from 'react';
import { View, Image, StyleSheet, ActivityIndicator } from 'react-native';
import loader from '../../../assets/images/loader_gif.gif';
import styles from './styles';

export default class Loader extends Component {
	render() {
		return (
			<View style={styles.wrapper}>
				<Image source={loader} style={styles.loader} />
			</View>
		);
	}
}

export class SmallLoader extends React.PureComponent {
	render() {
		if (!this.props.loading) return null;
		return (
			<View
				style={[
					StyleSheet.absoluteFill,
					{
						alignItems: 'center',
						justifyContent: 'center',
					}
				]}>
				<ActivityIndicator />
			</View>
		);
	}
}
