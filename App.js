import React, { Component } from 'react';
import { Linking, StatusBar, View } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/configureStore';
import { SplashScreen } from 'expo';

import Wrapper from './src/screens/wrapper';

// import { Root } from 'native-base';
console.disableYellowBox = true;
console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];

export default class App extends Component {
	async componentDidMount() {
		try {
			const can = await Linking.canOpenURL(
				'twitter://user?screen_name=SnapTrade_US'
			);
		} catch (error) {
			console.log(error);
		}
		SplashScreen.preventAutoHide();
		setTimeout(() => {
			SplashScreen.hide();
		}, 2000);
	}

	render() {
		return (
			<Provider store={store}>
				<Wrapper />
			</Provider>
		);
	}
}
