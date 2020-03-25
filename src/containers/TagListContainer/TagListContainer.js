import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import TagListContainerStyles from './styles';
import TagComponent, { TTag } from '../../components/TagComponent/TagComponent';
import {
	fetchTickerTagsRequest,
	clearTickerState
} from '../../redux/actions/ticker';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { gitTickerTagsList } from '../../redux/selectors/ticker';
import { Wrapper } from '../../components/UIComponents/MainComponents';

type TTagListContainer = {
	ticker: string,
	list: array
};

class TagListContainer extends Component<TTagListContainer> {
	static defaultProps = {
		max: null
	};
	componentDidMount = () => {
		this.props.fetchTickerTagsRequest(this.props.ticker);
	};

	componentWillUnmount = () => {
		this.props.clearTickerState();
	};

	renderTag = (tag: TTag, index) => {
		if (this.props.max && index < this.props.max) {
			return (
				<TagComponent
					scanner_link={tag.scanner_link}
					key={tag.tag}
					tag={tag.tag}
					tag_category={tag.tag_category}
					tag_display={tag.tag_display}
				/>
			);
		}
		return null;
	};

	render() {
		return (
			<ScrollView horizontal={true} style={TagListContainerStyles.wrapper}>
				{this.props.list.map(this.renderTag)}
			</ScrollView>
		);
	}
}

const mapStateToProps = state => ({ list: gitTickerTagsList(state) });
const mapDispatchToProps = {
	fetchTickerTagsRequest,
	clearTickerState
};
const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
);
export default compose(withConnect)(TagListContainer);
