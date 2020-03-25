import React, { Component } from 'react';
import { View } from 'react-native'

export default function withChart(props) {
	return function(Child) {
		return class extends Component {
			constructor(props) {
				super(props);
			}
			render() {
				return (
					<View>
						<Child />
					</View>
				);
			}
		};
	};
}
