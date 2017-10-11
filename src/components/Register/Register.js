import React from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CheckBox } from 'react-native-elements';
import I18n from '../../i18n/i18n';
import AuthenticationApi from '../../api/AuthenticationApi';
import COMMON_STYLES from '../../styles/common';

export default class Register extends React.Component {
  state = {
    selectionIndex: 'none',
    errorMessage: '',
    warningTranslationKey: '',
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    termsChecked: false,
    loading: false,
  };

  selectedTypeText = {
    none: I18n.t('register.i_am_a'),
    student: I18n.t('global.student_singular'),
    company: I18n.t('global.company_singular'),
    institution: I18n.t('global.institution_singular'),
  };

  componentWillMount() {
    this.authenticationApi = new AuthenticationApi();

    const { state } = this.props.navigation;
    if (state.params && state.params.requiredRegister) {
      this.setState({ warningTranslationKey: 'reg-profile.to_see_more_details' });
    }
  }

  setType(newType) {
    if (this.state.loading) {
      return;
    }
    this.setState({
      selectionIndex: newType,
    });
  }

  getTypeStyle(type) {
    if (this.state.selectionIndex === type) return styles.activeIconInput;
    return styles.iconInput;
  }

  onClickTerms() {
    if (this.state.loading) {
      return;
    }
    this.setState({
      termsChecked: !this.state.termsChecked,
    });
  }

  submit() {
    if (this.state.loading || !this.validateFields()) {
      return;
    }

    this.setState({ loading: true, errorMessage: '' });

    const data = {
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.passwordConfirm,
      terms: this.state.termsChecked,
      type: this.state.selectionIndex,
    };

    if (this.state.selectionIndex === 'institution') {
      data.name = this.state.name;
    }

    this.authenticationApi
      .register(data)
      .then(() => {
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Login', params: { afterRegister: true } }),
          ],
        });
        this.props.navigation.dispatch(resetAction);
      })
      .catch((error) => {
        let errorMessage = '';
        if (error.name) {
          errorMessage = `${error.name[0][0].toUpperCase()}${error.name[0].substring(1)}`;
        } else if (error.email) {
          errorMessage = `${error.email[0][0].toUpperCase()}${error.email[0].substring(1)}`;
        } else if (error.password) {
          errorMessage = `${error.password[0][0].toUpperCase()}${error.password[0].substring(1)}`;
        } else if (error.terms) {
          errorMessage = `${error.terms[0][0].toUpperCase()}${error.terms[0].substring(1)}`;
        } else if (error.type) {
          errorMessage = `${error.type[0][0].toUpperCase()}${error.type[0].substring(1)}`;
        } else {
          errorMessage = I18n.t('error-page.an_error_happened');
        }

        this.setState({
          loading: false,
          warningTranslationKey: '',
          errorMessage,
        });
      });
  }

  validateFields() {
    let isValid = true;
    if (this.state.selectionIndex === 'none') {
      this.setState({
        errorMessage: I18n.t('reg-profile.user_type_required'),
        warningTranslationKey: '',
      });
      isValid = false;
    } else if (this.state.password !== this.state.passwordConfirm) {
      this.setState({
        errorMessage: I18n.t('reg-profile.passwords_dont_match'),
        warningTranslationKey: '',
      });
      isValid = false;
    } else if (!this.state.termsChecked) {
      this.setState({
        errorMessage: I18n.t('reg-profile.terms_required'),
        warningTranslationKey: '',
      });
      isValid = false;
    }
    return isValid;
  }

  render() {
    return (
      <ImageBackground
        source={require('../../images/register-background.png')}
        style={styles.imageContainer}
      >
        <ScrollView bounces={false} contentContainerStyle={styles.scrollContainer}>
          <Image
            style={styles.logo}
            resizeMode={'contain'}
            source={require('../../images/logo-white.png')}
          />

          <KeyboardAvoidingView style={styles.formBox}>
            {!!this.state.errorMessage && (
              <Text style={styles.error}>{this.state.errorMessage}</Text>
            )}

            {!!this.state.warningTranslationKey && (
              <Text style={styles.warning}>{I18n.t(this.state.warningTranslationKey)}</Text>
            )}

            <Text style={styles.selectedTypeText}>
              {this.selectedTypeText[this.state.selectionIndex]}
            </Text>

            <View style={styles.typeIconContainer}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={this.getTypeStyle('student')}
                onPress={() => this.setType('student')}
              >
                <Icon name="user-o" size={18} style={styles.icon} />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                style={this.getTypeStyle('company')}
                onPress={() => this.setType('company')}
              >
                <Icon name="building" size={18} style={styles.icon} />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                style={this.getTypeStyle('institution')}
                onPress={() => this.setType('institution')}
              >
                <Icon name="university" size={18} style={styles.icon} />
              </TouchableOpacity>
            </View>

            {this.state.selectionIndex === 'institution' && (
              <View style={styles.inputContainer}>
                <Icon name="university" size={30} style={styles.textIconInput} />
                <TextInput
                  value={this.state.name}
                  placeholder={I18n.t('reg-profile.name')}
                  placeholderTextColor="rgba(255, 255, 255, 0.7)"
                  returnKeyType="next"
                  onChangeText={name => this.setState({ name })}
                  onSubmitEditing={() => this.emailInput.focus()}
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.input}
                  editable={!this.state.loading}
                />
              </View>
            )}

            <View style={styles.inputContainer}>
              <Icon name="user-o" size={30} style={styles.textIconInput} />
              <TextInput
                value={this.state.email}
                placeholder={I18n.t('reg-profile.email')}
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                returnKeyType="next"
                onChangeText={email => this.setState({ email })}
                onSubmitEditing={() => this.passwordInput.focus()}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
                editable={!this.state.loading}
                ref={(input) => {
                  this.emailInput = input;
                }}
              />
            </View>

            <View style={styles.inputContainer}>
              <Icon name="lock" size={30} style={styles.textIconInput} />
              <TextInput
                value={this.state.password}
                placeholder={I18n.t('reg-profile.password')}
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                returnKeyType="next"
                onChangeText={password => this.setState({ password })}
                onSubmitEditing={() => this.confirmPasswordInput.focus()}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
                editable={!this.state.loading}
                ref={(input) => {
                  this.passwordInput = input;
                }}
              />
            </View>

            <View style={styles.inputContainer}>
              <Icon name="lock" size={30} style={styles.textIconInput} />
              <TextInput
                value={this.state.passwordConfirm}
                placeholder={I18n.t('reg-profile.confirm_password')}
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                returnKeyType="go"
                onChangeText={passwordConfirm => this.setState({ passwordConfirm })}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
                editable={!this.state.loading}
                ref={(input) => {
                  this.confirmPasswordInput = input;
                }}
              />
            </View>

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

              <Text style={styles.submitButtonText}>
                {I18n.t('global.register_btn').toUpperCase()}
              </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    backgroundColor: COMMON_STYLES.DARK_BLUE,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    height: 96,
    marginBottom: 20,
    marginTop: 30,
  },

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

  typeIconContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },

  inputContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 20,
  },
  textIconInput: {
    color: 'rgba(0, 0, 0, 0.5)',
    width: 32,
    paddingRight: 4,
    fontSize: 15,
    alignSelf: 'center',
    textAlign: 'right',
  },
  input: {
    height: 40,
    color: 'white',
    paddingHorizontal: 10,
    flex: 1,
  },

  iconInput: {
    backgroundColor: COMMON_STYLES.BLUE,
    borderRadius: 100,
    margin: 10,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },

  activeIconInput: {
    backgroundColor: COMMON_STYLES.YELLOW,
    borderRadius: 100,
    margin: 10,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    color: COMMON_STYLES.WHITE,
    backgroundColor: 'transparent',
  },

  selectedTypeText: {
    backgroundColor: 'transparent',
    fontWeight: 'bold',
    color: COMMON_STYLES.WHITE,
    marginTop: 10,
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
