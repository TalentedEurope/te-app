import React from 'react';
import {
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CheckBox from 'react-native-icon-checkbox';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';
import SearchApi from '../../../../api/SearchApi';
import I18n from '../../../../i18n/i18n';
import COMMON_STYLES from '../../../../styles/common';

export default class Filters extends React.Component {
  state = {
    modalVisible: false,
    filters: [],
    selectedFilters: {},
  };

  componentDidMount() {
    this.searchApi = new SearchApi();
    this.searchApi.getFilters(this.props.collective).then((response) => {
      this.setState({ filters: response });
    });
  }

  openModal() {
    this.setState({ modalVisible: true });
  }

  closeModal() {
    this.setState({ modalVisible: false });
  }

  isChecked(filterGroup, filter) {
    return (
      Object.prototype.hasOwnProperty.call(this.state.selectedFilters, filterGroup.id) &&
      this.state.selectedFilters[filterGroup.id].indexOf(filter.id) > -1
    );
  }

  toggleFilter(filterGroup, filter) {
    const { selectedFilters } = this.state;

    if (!Object.prototype.hasOwnProperty.call(this.state.selectedFilters, filterGroup.id)) {
      selectedFilters[filterGroup.id] = [];
    }

    const selectedfilterIndex = selectedFilters[filterGroup.id].indexOf(filter.id);
    if (selectedfilterIndex > -1) {
      selectedFilters[filterGroup.id].splice(selectedfilterIndex, 1);
    } else {
      selectedFilters[filterGroup.id].push(filter.id);
    }

    this.setState({ selectedFilters });
  }

  applyFilters() {
    this.props.onApplyFilters(this.state.selectedFilters);
    this.closeModal();
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.openFiltersButton} onPress={() => this.openModal()}>
          <Icon name="filter" style={styles.openFiltersIcon} />
        </TouchableOpacity>

        <Modal
          animationType="slide"
          visible={this.state.modalVisible}
          onRequestClose={() => this.closeModal()}
        >
          <StatusBar barStyle="dark-content" />

          <View style={styles.modalContainer}>
            <View style={styles.header}>
              <Text style={styles.balanceTitle} />
              <Text style={styles.title}>{I18n.t('search.filters')}</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.closeButton}
                onPress={() => this.closeModal()}
              >
                <Ionicon name="md-close" style={styles.closeIcon} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.filtersScroll}>
              <View style={styles.filterSchoolOuter}>
                {this.state.filters.map((filterGroup, key) => (
                  <View key={key} style={styles.filterGroupCard}>
                    <Text style={styles.filterGroupTitle}>{filterGroup.title}</Text>
                    {filterGroup.items.map((filter, _key) => (
                      <View key={_key}>
                        <CheckBox
                          iconStyle={styles.iconFilterCheckbox}
                          labelStyle={styles.labelFilterCheckbox}
                          label={filter.name}
                          size={24}
                          checked={this.isChecked(filterGroup, filter)}
                          onPress={() => this.toggleFilter(filterGroup, filter)}
                        />
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            </ScrollView>

            <View style={styles.bottomContainer}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.applyFiltersButton}
                onPress={() => this.applyFilters()}
              >
                <Text style={styles.applyFiltersButtonText}>{I18n.t('search.apply')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  openFiltersButton: {
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderLeftColor: COMMON_STYLES.GRAY,
    borderLeftWidth: StyleSheet.hairlineWidth,
  },
  openFiltersIcon: {
    color: COMMON_STYLES.DARK_BLUE,
    fontSize: 15,
  },

  modalContainer: {
    flex: 1,
  },

  header: {
    paddingTop: Platform.OS === 'ios' ? 30 : 10,
    backgroundColor: 'white',
    borderBottomColor: COMMON_STYLES.GRAY,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
  },
  title: {
    paddingBottom: 10,
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
    color: COMMON_STYLES.DARK_BLUE,
    flex: 1,
  },
  balanceTitle: {
    width: 50,
  },
  closeButton: {
    width: 50,
    height: 32,
    paddingBottom: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    fontSize: 22,
    color: COMMON_STYLES.GRAY,
  },

  filtersScroll: {
    backgroundColor: COMMON_STYLES.LIGHT_GRAY,
    flex: 1,
  },
  filterSchoolOuter: {
    paddingTop: 10,
  },

  filterGroupCard: {
    margin: 10,
    marginTop: 0,
    paddingBottom: 10,
    backgroundColor: COMMON_STYLES.WHITE,
    borderColor: COMMON_STYLES.GRAY,
    borderWidth: StyleSheet.hairlineWidth,
  },

  filterGroupTitle: {
    textAlign: 'center',
    fontWeight: '600',
    padding: 6,
    paddingTop: 10,
  },
  iconFilterCheckbox: {
    paddingLeft: 14,
  },
  labelFilterCheckbox: {
    fontSize: 15,
    paddingRight: 14,
    flex: 1,
  },

  bottomContainer: {
    padding: 10,
    borderTopColor: COMMON_STYLES.GRAY,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  applyFiltersButton: {
    padding: 10,
    backgroundColor: COMMON_STYLES.DARK_BLUE,
  },
  applyFiltersButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});
