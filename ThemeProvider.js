import React, { PureComponent } from 'react';
import { ThemeProvider as SCThemeProvider } from 'styled-components';

export default class ThemeProvider extends PureComponent {
	render() {
		return (
			<SCThemeProvider theme={{}}>{this.props.children}</SCThemeProvider>
		);
	}
}
