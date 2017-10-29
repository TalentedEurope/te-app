import React from 'react';
import { FlatList, Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import I18n from '../../i18n/i18n';
import AlertsApi from '../../api/AlertsApi';
import { renderHeader, renderFooter, handleLoadMore } from '../common/listUtils';
import { NoResults } from '../common/NoResults';
import COMMON_STYLES from '../../styles/common';

export default class Alerts extends React.Component {
  state = {
    data: [],
    total: 0,
    page: 1,
    lastPage: false,
    initialLoading: true,
    loadingMore: false,
  };

  componentDidMount() {
    this.alertsApi = new AlertsApi();
    this.loadData();
  }

  loadData() {
    if (this.state.page > 1) {
      this.setState({ loadingMore: true });
    }

    this.alertsApi.getAlerts(this.state.page).then((response) => {
      this.setData(response);
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
    this.props.navigation.navigate('Profile', { id: item.user_id, goBack: true });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.total === 0 &&
          !this.state.initialLoading && <NoResults text={I18n.t('validators.no_alerts_found')} />}

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
                <Text style={styles.title}>{item.student}</Text>

                <Text>
                  {I18n.t('reg-profile.country')}: {item.country}
                </Text>

                <Text>
                  {I18n.t('validators.study_level')}: {item.study_level}
                </Text>

                <Text>
                  {I18n.t('validators.when_it_was_sent')}: {item.when_alert_relative}
                </Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COMMON_STYLES.LIGHT_GRAY,
  },
  itemBox: {
    margin: 5,
    padding: 15,
    backgroundColor: COMMON_STYLES.WHITE,
    borderColor: COMMON_STYLES.GRAY,
    borderWidth: StyleSheet.hairlineWidth,
    shadowRadius: 2,
    elevation: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
