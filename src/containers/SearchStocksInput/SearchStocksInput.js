import React, { Component } from 'react';
import { View, Text, FlatList, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input, Icon, ListItem } from 'react-native-elements';
import {
	View as AView,
	createAnimatableComponent
} from 'react-native-animatable';
import styles from './styles';
import { withNavigation } from 'react-navigation';
import {
	fetchSearchCompany,
	clearSearchBox
} from '../../redux/actions/watchlist';
import { compose } from 'redux';
import Ticker from '../../redux/orm/models/Ticker';
import { icons } from '../../styles/base';
import { TouchableOpacity } from 'react-native-gesture-handler';

type SearchStocksInputProps = {
	searchCompany: Ticker[],
	pendingCompany: boolean,
	searchCompanyError: string
};

const AnimatableInput = createAnimatableComponent(TextInput);

class SearchStocksInput extends Component<SearchStocksInputProps> {
	static propTypes = {
		searchCompany: PropTypes.array,
		pendingCompany: PropTypes.bool,
		searchCompanyError: PropTypes.string
	};

	static defaultProps = {
		searchCompany: [],
		pendingCompany: false,
		searchCompanyError: ''
	};

	constructor(props) {
		super(props);
		this.searchInput = React.createRef();
	}

	state = {
		focused: false,
		keyword: ''
	};
	timer = null;

	onChange = (keyword: string) => {
		this.setState({ keyword });
		if (this.timer) clearTimeout(this.timer);
		if (keyword) {
			this.timer = setTimeout(
				() => this.props.fetchSearchCompany(keyword),
				700
			);
		}
	};

	toggle = () => {
		if (this.state.focused) {
			this.setState({ focused: false });
			this.props.clearSearchBox();
		} else {
			this.setState({ focused: true });
		}
	};

	render() {
		return (
			<View style={styles.wrapper}>
				<AnimatableInput
					// useNativeDriver
					transition={['width', 'opacity']}
					onChangeText={this.onChange}
					ref={this.searchInput}
					style={[
						styles.inputWrapper,
						this.state.focused && styles.inputWrapperActive,
						{
							backgroundColor: this.props.bg,
							color: this.props.text
						}
					]}
				/>
				<TouchableOpacity
					style={[styles.icon, { backgroundColor: this.props.bg }]}
					onPress={this.toggle}>
					<AView
						useNativeDriver
						animation={this.props.pendingCompany ? 'rotate' : ''}
						iterationCount="infinite"
						easing={'linear'}>
						<Icon
							color={this.props.text}
							name={
								this.state.focused
									? this.props.pendingCompany
										? 'sync'
										: 'clear'
									: 'search'
							}
							size={icons.large}
						/>
					</AView>
				</TouchableOpacity>
			</View>
		);
	}
}

const mapStateToProps = state => {
	return {
		pendingCompany: state.watchlist.pendingCompany
	};
};
const mapDispatchToProps = {
	fetchSearchCompany,
	clearSearchBox
};

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
);

export default compose(withConnect)(SearchStocksInput);
