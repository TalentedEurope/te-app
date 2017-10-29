import React from 'react';
import { FlatList, Modal, StyleSheet, TextInput, Text, TouchableOpacity, View } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import I18n from '../../i18n/i18n';
import COMMON_STYLES from '../../styles/common';
import { normalizeText } from './utils';
import { ModalHeader } from '../common/ModalHeader';
import { TextInputForm } from './TextInputForm';

export default class InstitutionSelector extends React.Component {
  state = {
    modalVisible: false,

    institutionSearch: '',

    institutionName: '',
    institutionEmail: '',
  };

  getInstitutions() {
    return this.props.institutions.filter((institution) => {
      const normalizedInstitutionName = normalizeText(institution.name);
      const normalizedInstitutionSearch = normalizeText(this.state.institutionSearch);
      return normalizedInstitutionName.includes(normalizedInstitutionSearch);
    });
  }

  openModal() {
    this.setState({
      modalVisible: true,
      institutionSearch: '',
      institutionName: '',
      institutionEmail: '',
    });
  }

  closeModal() {
    this.setState({ modalVisible: false });
  }

  onChangeSearch(institutionSearch) {
    this.setState({ institutionSearch, institutionName: institutionSearch });
  }

  selectInstitution(institution) {
    this.props.onSelect(institution);
    this.closeModal();
  }

  saveInstitution() {
    this.props.onSave(this.state.institutionName, this.state.institutionEmail);
    this.closeModal();
  }

  onChangeInstitutionName(institutionName) {
    this.setState({ institutionName }, () => {
      this.props.onSave(this.state.institutionName, this.state.institutionEmail);
    });
  }

  onChangeInstitutionEmail(institutionEmail) {
    this.setState({ institutionEmail }, () => {
      this.props.onSave(this.state.institutionName, this.state.institutionEmail);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.openInstitutionsButton}
          onPress={() => this.openModal()}
        >
          <Text style={styles.openInstitutionsButtonText}>
            {I18n.t('reg-profile.select_institution')}
          </Text>
        </TouchableOpacity>

        {!!this.props.institutionSelected.id && (
          <TextInputForm
            value={this.props.institutionSelected.name}
            placeholder="%%Institución Academica"
            returnKeyType="go"
            editable={false}
          />
        )}

        {this.props.inviteInstitution && (
          <View>
            <TextInputForm
              value={this.props.institutionName}
              placeholder={I18n.t('reg-profile.institution_name')}
              onChangeText={text => this.onChangeInstitutionName(text)}
              onSubmitEditing={() => this.institutionEmailInput.focus()}
              autoCapitalize="sentences"
              editable={!this.props.loading}
            />
            <TextInputForm
              value={this.props.institutionEmail}
              placeholder={I18n.t('reg-profile.institution_email')}
              returnKeyType="go"
              onChangeText={text => this.onChangeInstitutionEmail(text)}
              keyboardType="email-address"
              editable={!this.props.loading}
              refFn={(input) => {
                this.institutionEmailInput = input;
              }}
            />
          </View>
        )}

        <Modal
          animationType="slide"
          visible={this.state.modalVisible}
          onRequestClose={() => this.closeModal()}
        >
          <View style={styles.modalContainer}>
            <ModalHeader
              title={I18n.t('global.institution').split('|')[1]}
              onClose={() => this.closeModal()}
            />

            <View style={styles.searchBox}>
              <Icon name="search" style={styles.searchBoxIcon} />
              <TextInput
                value={this.state.institutionSearch}
                onChangeText={text => this.onChangeSearch(text)}
                placeholder={I18n.t('reg-profile.search_institutions')}
                placeholderTextColor="rgba(0, 0, 0, 0.5)"
                autoCorrect={false}
                style={styles.searchBoxInput}
              />
            </View>

            {this.getInstitutions().length > 0 && (
              <View style={styles.institutionsListContainer}>
                <FlatList
                  style={styles.institutionsList}
                  data={this.getInstitutions()}
                  keyExtractor={item => item.id}
                  ItemSeparatorComponent={() => <View style={styles.institutionsListSeparator} />}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => this.selectInstitution(item)}
                      style={styles.institutionsListItem}
                    >
                      <Text>{item.name}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}

            {this.state.institutionSearch !== '' &&
              this.getInstitutions().length === 0 && (
                <View style={styles.inviteInstitutionContainer}>
                  <Text style={styles.inviteInstitutionText}>
                    ¿No puedes encontrar tu institución? Invítala a Talented Europe
                  </Text>

                  <TextInput
                    value={this.state.institutionName}
                    placeholder={I18n.t('reg-profile.institution_name')}
                    placeholderTextColor="rgba(0, 0, 0, 0.5)"
                    onChangeText={institutionName => this.setState({ institutionName })}
                    autoCorrect={false}
                    style={styles.modalInput}
                  />

                  <TextInput
                    value={this.state.institutionEmail}
                    placeholder={I18n.t('reg-profile.institution_email')}
                    placeholderTextColor="rgba(0, 0, 0, 0.5)"
                    onChangeText={institutionEmail => this.setState({ institutionEmail })}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.modalInput}
                  />

                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.saveInstitutionButton}
                    onPress={() => this.saveInstitution()}
                  >
                    <Text style={styles.saveInstitutionButtonText}>
                      {I18n.t('reg-profile.save_institution')}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
  },

  openInstitutionsButton: {
    backgroundColor: COMMON_STYLES.BLUE,
    padding: 8,
    marginBottom: 20,
  },
  openInstitutionsButtonText: {
    color: 'white',
    textAlign: 'center',
  },

  modalContainer: {
    flex: 1,
  },

  searchBox: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomColor: COMMON_STYLES.GRAY,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  searchBoxIcon: {
    paddingLeft: 10,
    paddingBottom: 2,
    alignSelf: 'center',
    color: 'rgba(0, 0, 0, 0.5)',
  },
  searchBoxInput: {
    color: 'rgba(0, 0, 0, 0.7)',
    height: 36,
    fontSize: 16,
    paddingHorizontal: 10,
    flex: 1,
  },

  institutionsListContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: COMMON_STYLES.LIGHT_GRAY,
  },
  institutionsList: {
    flex: 1,
    borderColor: COMMON_STYLES.GRAY,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: 'white',
  },
  institutionsListItem: {
    paddingVertical: 7,
    paddingHorizontal: 10,
  },
  institutionsListSeparator: {
    borderBottomColor: COMMON_STYLES.GRAY,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  inviteInstitutionContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: COMMON_STYLES.LIGHT_GRAY,
  },
  inviteInstitutionText: {
    paddingHorizontal: 5,
    paddingBottom: 15,
    textAlign: 'center',
    backgroundColor: 'transparent',
  },

  modalInput: {
    height: 40,
    fontSize: 15,
    color: 'rgba(0, 0, 0, 0.7)',
    backgroundColor: 'white',
    marginBottom: 20,
    paddingHorizontal: 10,
  },

  saveInstitutionButton: {
    backgroundColor: COMMON_STYLES.YELLOW,
    padding: 8,
  },
  saveInstitutionButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});
