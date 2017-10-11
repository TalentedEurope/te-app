import React from 'react';
import { Image, FlatList, Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import I18n from '../../../i18n/i18n';
import SearchApi from '../../../api/SearchApi';
import Filters from '../common/components/Filters';
import { SkillsTags, LanguagesTags } from '../common/components/Tags';
import { SearchBox } from '../common/components/SearchBox';
import { ResultsInfo } from '../common/components/ResultsInfo';
import { NoResults } from '../../common/NoResults';
import { renderHeader, renderFooter, handleLoadMore } from '../../common/listUtils';
import { showResultsInfo, getResultsInfo } from '../common/utils';
import userService from '../../../shared/userService';
import { searchStyles } from '../common/styles';

export default class SearchStudents extends React.Component {
  collective = 'students';
  state = {
    data: [],
    total: 0,
    page: 1,
    lastPage: false,
    searchText: '',
    selectedFilters: [],
    initialLoading: true,
    loadingMore: false,
  };

  componentDidMount() {
    this.noResultsText = getResultsInfo(this.collective, 0, 'A');

    this.searchApi = new SearchApi();
    this.loadData();

    EventRegister.addEventListener('SearchStudents', (searchText) => {
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

  onApplyFilters(selectedFilters) {
    this.setState({ selectedFilters, page: 1 }, () => {
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
      .getResults(
        this.collective,
        this.state.page,
        this.state.searchText,
        this.state.selectedFilters,
      )
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

  goToProfile(item) {
    if (userService.isLogged) {
      this.props.navigation.navigate('Profile', { id: item.id, goBack: true });
    } else {
      this.props.navigation.navigate('Register', { requiredRegister: true, goBack: true });
    }
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
          <Filters collective={this.collective} onApplyFilters={this.onApplyFilters.bind(this)} />
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
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.itemBox}
                onPress={() => this.goToProfile(item)}
              >
                <View style={styles.nameRow}>
                  <Image style={styles.photo} resizeMode={'contain'} source={{ uri: item.photo }} />
                  <View style={styles.titleColumn}>
                    <Text style={styles.title}>{item.full_name}</Text>
                    <Text style={styles.subtitle}>{item.studied}</Text>
                  </View>
                </View>

                <Text>
                  {I18n.t('reg-profile.lives_in')}: {item.lives_in}
                </Text>

                {item.skills.length > 0 && (
                  <View>
                    <Text style={styles.tagTitle}>{I18n.t('reg-profile.skills')}:</Text>
                    {SkillsTags({ skills: item.skills })}
                  </View>
                )}

                {item.languages.length > 0 && (
                  <View>
                    <Text style={styles.tagTitle}>{I18n.t('reg-profile.student_languages')}:</Text>
                    {LanguagesTags({ languages: item.languages })}
                  </View>
                )}
              </TouchableOpacity>
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

  photo: {
    ...searchStyles.photo,
    borderRadius: 25,
  },

  tagTitle: {
    marginTop: 5,
    marginBottom: 5,
  },
});
