import React from 'react';
import { Image, FlatList, Text, StyleSheet, View } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import I18n from '../../../i18n/i18n';
import SearchApi from '../../../api/SearchApi';
import { SearchBox } from '../common/components/SearchBox';
import { ResultsInfo } from '../common/components/ResultsInfo';
import { NoResults } from '../../common/NoResults';
import { renderHeader, renderFooter, handleLoadMore } from '../../common/listUtils';
import { showResultsInfo, getResultsInfo } from '../common/utils';
import { searchStyles } from '../common/styles';

export default class SearchInstitutions extends React.Component {
  collective = 'institutions';
  state = {
    data: [],
    total: 0,
    page: 1,
    lastPage: false,
    searchText: '',
    initialLoading: true,
    loadingMore: false,
  };

  componentDidMount() {
    this.noResultsText = getResultsInfo(this.collective, 0, 'A');

    this.searchApi = new SearchApi();
    this.loadData();

    EventRegister.addEventListener('SearchInstitutions', (searchText) => {
      this.setState({ searchText }, () => {
        this.onSearch();
      });
    });
  }

  onSearch() {
    this.setState({ page: 1 }, () => {
      this.loadData();
    });
  }

  loadData() {
    this.toast.close();

    if (this.state.page === 1) {
      this.setState({ data: [], initialLoading: true });
    } else {
      this.setState({ loadingMore: true });
    }

    this.searchApi
      .getResults(this.collective, this.state.page, this.state.searchText)
      .then((response) => {
        this.setData(response);
        if (this.state.page === 1) {
          showResultsInfo(this.toast, this.collective, response.total, this.state.searchText);
        }
      });
  }

  setData(response) {
    this.setState({
      data: [...this.state.data, ...response.data],
      total: response.total,
      initialLoading: false,
      loadingMore: false,
      lastPage: !response.next_page_url,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topbar}>
          <SearchBox
            value={this.state.searchText}
            onChange={searchText => this.setState({ searchText })}
            onSubmit={() => this.onSearch()}
          />
        </View>

        {this.state.total === 0 &&
          !this.state.initialLoading && <NoResults text={this.noResultsText} />}

        {(this.state.total > 0 || this.state.initialLoading) && (
          <FlatList
            data={this.state.data}
            ListHeaderComponent={renderHeader.bind(this)}
            ListFooterComponent={renderFooter.bind(this)}
            onEndReached={handleLoadMore.bind(this)}
            onEndReachedThreshold={0.5}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.itemBox}>
                <View style={styles.nameRow}>
                  <Image style={styles.photo} resizeMode={'contain'} source={{ uri: item.photo }} />
                  <View style={styles.titleColumn}>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={styles.subtitle}>{item.type}</Text>
                  </View>
                </View>
                <Text>
                  {I18n.t('reg-profile.we_are_in')}: {item.we_are_in}
                </Text>
              </View>
            )}
          />
        )}

        <ResultsInfo
          refFn={(component) => {
            this.toast = component;
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ...searchStyles,
});
