import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { ThemeProvider } from 'styled-components';
import { persistor } from '../../src/configureStore';
import RootNavigationContainer from '../../src/navigation/root.navigation';
import { lightTheme, DarkTheme } from '../../src/styles/themes';
import { StatusBar } from 'react-native';

const ThemeContext = React.createContext('light');

class Wrapper extends Component {
	render() {
		return (
			<ThemeProvider
				theme={
					this.props.theme && this.props.theme.darkMode
						? DarkTheme
						: lightTheme
				}>
				<ThemeContext.Provider value="light">
					<PersistGate loading={null} persistor={persistor}>
						<RootNavigationContainer />
					</PersistGate>
				</ThemeContext.Provider>
			</ThemeProvider>
		);
	}
}

const mapStateToProps = state => ({
	theme: state.setting
});

export default connect(mapStateToProps)(Wrapper);
