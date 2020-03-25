import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input, Icon, ListItem } from 'react-native-elements';
import styles from './styles';
import { withNavigation, SafeAreaView } from 'react-navigation';
import {
  fetchSearchCompany,
  addStockToWatchList,
  clearSearchBox,
  fetchWatchList,
} from '../../redux/actions/watchlist';
import { compose } from 'redux';
import TouchableScale from 'react-native-touchable-scale';
import Ticker from '../../redux/orm/models/Ticker';
import { SearchBar } from 'react-native-elements';
import { dimensions, colors, spacingOrSizingScale } from '../../styles/base';
import { ScrollView } from 'react-native-gesture-handler';
import { getUserLoggin } from '../../redux/selectors/user';
import { Actions } from 'react-native-router-flux';

type SearchBoxCompanyProps = {
  ticker: string,
  company: string,
  rank: string,
  onCompanyPress: (ticker: Ticker) => void,
  onAddCompanyToWatchList: (ticker: Ticker) => void,
};

type SearchBoxProps = {
  searchCompany: Ticker[],
  pendingCompany: boolean,
  searchCompanyError: string,
};

class SearchBoxCompany extends React.PureComponent<SearchBoxCompanyProps> {
  onAddCompanyToWatchList = () => {
    this.props.onAddCompanyToWatchList({
      ticker: this.props.ticker,
      company: this.props.company,
      rank: this.props.rank,
    });
  };

  onCompanyPress = () => {
    this.props.onCompanyPress({
      ticker: this.props.ticker,
      company: this.props.company,
      rank: this.props.rank,
    });
  };
  render() {
    return (
      <ListItem
        onPress={this.onCompanyPress}
        key={this.props.ticker}
        title={this.props.ticker}
        subtitle={this.props.company}
        bottomDivider={true}
        rightIcon={
          this.props.canAddToWatchlist ? (
            <TouchableScale style={styles.addButton} onPress={this.onAddCompanyToWatchList}>
              <Icon
                type={'font-awesome'}
                color={colors.dark}
                name={'plus'}
                size={spacingOrSizingScale._24}
              />
            </TouchableScale>
          ) : null
        }
      />
    );
  }
}

class SearchBox extends Component<SearchBoxProps> {
  static propTypes = {
    searchCompany: PropTypes.array,
    pendingCompany: PropTypes.bool,
    searchCompanyError: PropTypes.string,
  };

  static defaultProps = {
    searchCompany: [],
    pendingCompany: false,
    searchCompanyError: '',
  };

  state = {
    focused: false,
    keyword: '',
  };
  timer = null;

  onChange = (keyword: string) => {
    this.setState({ keyword });
    if (this.timer) clearTimeout(this.timer);
    if (keyword) {
      this.timer = setTimeout(() => this.props.fetchSearchCompany(keyword), 700);
    }
  };

  hide = () => {
    this.setState({ focused: false });
  };

  show = () => {
    this.setState({ focused: true });
  };

  onCompanyPress = (company: Ticker) => {
    Actions.DetailFeed({
      tickerData: company,
    })
  };

  onClear = () => {
    this.props.clearSearchBox();
  };

  onAddedTickerToWatchlist = () => {
    Actions.Watchlist()
    this.onClear();
    this.props.fetchData();
  };

  onAddCompanyToWatchList = (company: Ticker) => {
    this.props.addStockToWatchList(company.ticker, this.onAddedTickerToWatchlist);
  };

  _keyExtractor = (item, index) => `${item.ticker}`;

  renderCompany = item => {
    return (
      <SearchBoxCompany
        key={item.ticker}
        lightTheme={true}
        onCompanyPress={this.onCompanyPress}
        onAddCompanyToWatchList={this.onAddCompanyToWatchList}
        company={item.company}
        rank={item.rank}
        ticker={item.ticker}
        canAddToWatchlist={this.props.isLogin}
      />
    );
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <SearchBar
          style={{
            borderBottomWidth: 0,
            backgroundColor: colors.white,
          }}
          placeholder="Search"
          containerStyle={styles.inputContainerWrapper}
          inputContainerStyle={styles.inputWrapper}
          platform={'default'}
          lightTheme={true}
          onClear={this.onClear}
          onChangeText={this.onChange}
          clearIcon={{
            name: 'clear',
            size: spacingOrSizingScale._32,
          }}
          value={this.state.keyword}
          showLoading={this.props.pendingCompany}
        />

        <ScrollView
          keyboardDismissMode={'interactive'}
          style={[
            {
              width: dimensions.fullWidth,
              maxHeight: dimensions.fullHeight / 2,
            },
          ]}
        >
          {this.props.searchCompany.map(this.renderCompany)}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    searchCompany: state.watchlist.searchCompany,
    pendingCompany: state.watchlist.pendingCompany,
    searchCompanyError: state.watchlist.searchCompanyError,
    isLogin: getUserLoggin(state),
  };
};
const mapDispatchToProps = {
  fetchSearchCompany,
  addStockToWatchList,
  clearSearchBox,
  fetchData: fetchWatchList,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
)(SearchBox);
