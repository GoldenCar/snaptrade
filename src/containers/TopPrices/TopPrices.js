import React, { Component } from 'react';
import { fetchTopPrices } from '../../redux/actions/discovery';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { ScrollView } from 'react-native';
import { withNavigation } from 'react-navigation';
import { getTopPricesList } from '../../redux/selectors/discovery';
import TopPricesComponent from '../../components/TopPriceComponent/TopPriceComponent';
import { Row } from '../../components/UIComponents/MainComponents';
import { padding } from '../../styles/base';

class TopPrices extends Component {
  componentDidMount = () => {
    this.props.fetchTopPrices();
  };

  renderPrice = price => {
    return (
      <TopPricesComponent
        key={price.ticker}
        ticker={price.company_name}
        close_formatted={price.close_formatted}
        price_increase_over_last_day={price.price_increase_over_last_day}
        price_pct_increase_over_last_day={price.price_pct_increase_over_last_day}
      />
    );
  };

  render() {
    const { prices } = this.props;
    return (
      <ScrollView horizontal keyboardDismissMode={'interactive'}>
        <Wrapper>{prices.map(this.renderPrice)}</Wrapper>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  prices: getTopPricesList(state),
});

const mapDispatchToProps = {
  fetchTopPrices,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
)(TopPrices);

const Wrapper = styled(Row)`
  padding: ${padding.large}px;
`;
