import styled from 'styled-components';
import { TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import addIcon from '../../../assets/icons/add.png';
import addedIcon from '../../../assets/icons/added.png';
import { withNavigation } from 'react-navigation';
import { addStockToWatchList } from '../../redux/actions/watchlist';
import { padding } from '../../styles/base';
import { IconBig } from '../UIComponents/IconsComponents';
import { getUserLoggin } from '../../redux/selectors/user';

type TSignComponent = {
	size: string,
	value?: object
};

class SignComponent extends Component<TSignComponent> {
	static defaultProps = {
		size: 28,
		ticker: '',
		signed: false
	};

	state = {
		signed: false
	};

	onPress = () => {
		if (!this.props.signed && !this.state.signed) {
			this.props.addStockToWatchList(this.props.ticker, this.sign);
		}
	};

	sign = () => {
		this.setState({ signed: true });
	};

	render() {
		if (!this.props.isLogin) return null;
		return (
			<TouchableOpacity onPress={this.onPress}>
				<Wrapper>
					{this.state.signed || this.props.signed ? (
						<IconBig size={this.props.size} source={addedIcon} />
					) : (
						<IconBig size={this.props.size} source={addIcon} />
					)}
				</Wrapper>
			</TouchableOpacity>
		);
	}
}

const Wrapper = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: center;
`;

const mapDispatchToProps = {
	addStockToWatchList
};

const mapStateToProps = state => ({
	isLogin: getUserLoggin(state)
});
const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
);

export default compose(
	withConnect
)(SignComponent);
