import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import StyledText from '../StyledText';
import { Actions } from 'react-native-router-flux';


type TNavigateTo = {
	screen: string,
	text: string,
	textStyle: object,
	wrapperStyle: object
};


@withNavigation
export default class NavigateTo extends Component<TNavigateTo> {
	static defaultProps = {
		screen: 'Home',
		text: 'Navigate To',
		textStyle: {},
		wrapperStyle: {}
	};

	navigateTo = () => {
		Actions[this.props.screen]()
	};

	render() {
		return (
			<View style={this.props.wrapperStyle}>
				<TouchableOpacity onPress={this.navigateTo}>
					<StyledText style={this.props.textStyle}>
						{this.props.text}
					</StyledText>
				</TouchableOpacity>
			</View>
		);
	}
}
