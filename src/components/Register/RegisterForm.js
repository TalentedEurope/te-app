import React from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import { CheckBox } from 'react-native-elements';
import I18n from '../../i18n/i18n';
import AuthenticationApi from '../../api/AuthenticationApi';
import COMMON_STYLES from '../../styles/common';
import { sortInstitutions, submit } from './utils';
import { UserTypeSelector } from './UserTypeSelector';
import { TextInputForm } from './TextInputForm';
import InstitutionSelector from './InstitutionSelector';

export default class RegisterForm extends React.Component {
  state = {
    errorMessage: '',
    warningTranslationKey: '',

    loading: false,
    selectionIndex: 'none',

    name: '',
    surname: '',
    email: '',
    password: '',
    passwordConfirm: '',

    institutions: [],
    institutionSelected: {},
    inviteInstitution: false,
    institutionName: '',
    institutioEmail: '',

    termsChecked: false,
  };

  componentWillMount() {
    this.authenticationApi = new AuthenticationApi();

    const { state } = this.props.navigation;
    if (state.params && state.params.requiredRegister) {
      this.setState({ warningTranslationKey: 'reg-profile.to_see_more_details' });
    }

    this.authenticationApi.getInstitutions().then((response) => {
      this.setState({
        institutions: sortInstitutions(response),
      });
    });
  }

  onSelectUserType(newType) {
    if (this.state.loading) {
      return;
    }
    this.setState({
      selectionIndex: newType,
    });
  }

  onSelectInstitution(institutionSelected) {
    this.setState({
      institutionSelected,
      inviteInstitution: false,
      institutionName: '',
      institutionEmail: '',
    });
  }

  onSaveInstitution(institutionName, institutionEmail) {
    this.setState({
      institutionSelected: {},
      inviteInstitution: true,
      institutionName,
      institutionEmail,
    });
  }

  onClickTerms() {
    if (this.state.loading) {
      return;
    }
    this.setState({
      termsChecked: !this.state.termsChecked,
    });
  }

  submit = submit.bind(this);

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.formBox}>
        {!!this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}

        {!!this.state.warningTranslationKey && (
          <Text style={styles.warning}>{I18n.t(this.state.warningTranslationKey)}</Text>
        )}

        <UserTypeSelector
          selectionIndex={this.state.selectionIndex}
          onSelect={this.onSelectUserType.bind(this)}
        />

        {['validator', 'institution'].includes(this.state.selectionIndex) && (
          <TextInputForm
            icon={this.state.selectionIndex === 'institution' ? 'university' : 'user-o'}
            value={this.state.name}
            placeholder={I18n.t('reg-profile.name')}
            onChangeText={name => this.setState({ name })}
            onSubmitEditing={() => {
              if (this.state.selectionIndex === 'validator') {
                this.surnameInput.focus();
              } else {
                this.emailInput.focus();
              }
            }}
            editable={!this.state.loading}
          />
        )}

        {this.state.selectionIndex === 'validator' && (
          <TextInputForm
            icon="user-o"
            value={this.state.surname}
            placeholder={I18n.t('reg-profile.surname')}
            onChangeText={surname => this.setState({ surname })}
            onSubmitEditing={() => this.emailInput.focus()}
            editable={!this.state.loading}
            refFn={(input) => {
              this.surnameInput = input;
            }}
          />
        )}

        <TextInputForm
          icon="user-o"
          value={this.state.email}
          placeholder={I18n.t('reg-profile.email')}
          onChangeText={email => this.setState({ email })}
          onSubmitEditing={() => this.passwordInput.focus()}
          keyboardType="email-address"
          editable={!this.state.loading}
          refFn={(input) => {
            this.emailInput = input;
          }}
        />

        <TextInputForm
          icon="lock"
          value={this.state.password}
          placeholder={I18n.t('reg-profile.password')}
          onChangeText={password => this.setState({ password })}
          onSubmitEditing={() => this.confirmPasswordInput.focus()}
          secureTextEntry={true}
          editable={!this.state.loading}
          refFn={(input) => {
            this.passwordInput = input;
          }}
        />

        <TextInputForm
          icon="lock"
          value={this.state.passwordConfirm}
          placeholder={I18n.t('reg-profile.confirm_password')}
          returnKeyType="go"
          onChangeText={passwordConfirm => this.setState({ passwordConfirm })}
          secureTextEntry={true}
          editable={!this.state.loading}
          refFn={(input) => {
            this.confirmPasswordInput = input;
          }}
        />

        {this.state.selectionIndex === 'validator' && (
          <InstitutionSelector
            institutions={this.state.institutions}
            institutionSelected={this.state.institutionSelected}
            inviteInstitution={this.state.inviteInstitution}
            institutionName={this.state.institutionName}
            institutionEmail={this.state.institutionEmail}
            loading={this.state.loading}
            onSelect={this.onSelectInstitution.bind(this)}
            onSave={this.onSaveInstitution.bind(this)}
          />
        )}

        <CheckBox
          title={I18n.t('reg-profile.terms_of_use')}
          style={styles.checkBox}
          textStyle={styles.checkBoxText}
          checked={this.state.termsChecked}
          checkedColor={COMMON_STYLES.YELLOW}
          onPress={() => this.onClickTerms()}
        />

        <TouchableOpacity
          activeOpacity={0.8}
          style={
            this.state.loading
              ? [styles.submitButtonContainer, styles.disabledButton]
              : styles.submitButtonContainer
          }
          onPress={() => this.submit()}
        >
          {this.state.loading === true && (
            <ActivityIndicator style={styles.buttonSpinner} color={COMMON_STYLES.BLACK} />
          )}

          <Text style={styles.submitButtonText}>{I18n.t('global.register_btn').toUpperCase()}</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  error: {
    backgroundColor: COMMON_STYLES.RED,
    color: COMMON_STYLES.WHITE,
    textAlign: 'center',
    padding: 10,
    fontSize: 14,
    marginBottom: 15,
  },

  warning: {
    backgroundColor: COMMON_STYLES.WARNING_BG,
    color: COMMON_STYLES.WARNING_TEXT,
    textAlign: 'center',
    padding: 10,
    fontSize: 14,
    marginBottom: 15,
  },

  formBox: {
    margin: 20,
    marginTop: 0,
    padding: 15,
    paddingTop: 5,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },

  checkBox: {
    flex: 1,
    padding: 10,
    backgroundColor: 'transparent',
    marginBottom: 10,
  },
  checkBoxText: {
    color: COMMON_STYLES.WHITE,
  },

  submitButtonContainer: {
    backgroundColor: COMMON_STYLES.YELLOW,
    paddingVertical: 12,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  submitButtonText: {
    textAlign: 'center',
    color: COMMON_STYLES.BROWN,
  },

  disabledButton: {
    backgroundColor: COMMON_STYLES.GRAY,
  },

  buttonSpinner: {
    paddingRight: 10,
  },
});
