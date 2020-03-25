//@flow

import React from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getActivePriceType } from '../../redux/selectors/watchlist.js';
import { nextActivePriceType } from '../../redux/actions/watchlist';
import DiffComponent from '../../components/DiffComponent/DiffComponent.js';

type Props = {
	views: array
};

class TickerTypedContainer extends React.Component {
	nextView = () => {
		this.props.nextActivePriceType();
	};

	render() {
		const { views = [] }: Props = this.props;
		const firstView = views[0];
		const show = views[this.props.activePriceType || 0];

		return (
			<TouchableOpacity onPress={this.nextView}>
				<DiffComponent
					trigger={firstView.value}
					format={false}
					value={`${show.value}${show.symbol}`}
				/>
			</TouchableOpacity>
		);
	}
}
const mapStateToProps = state => ({
	activePriceType: getActivePriceType(state)
});

const mapDispatchToProps = {
	nextActivePriceType: nextActivePriceType
};
const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
);

export default compose(withConnect)(TickerTypedContainer);
