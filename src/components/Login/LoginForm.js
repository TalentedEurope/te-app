import React from 'react';
import {
  ActivityIndicator,
  Linking,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import backendService from '../../shared/backendService';
import Authentication from '../../shared/authentication';
import COMMON_STYLES from '../../styles/common';
import I18n from '../../i18n/i18n';

export default class LoginForm extends React.Component {
  state = {
    email: '',
    password: '',
    loading: false,
    errorTranslationKey: '',
    warningTranslationKey: '',
    infoTranslationKey: '',
  };

  constructor(props) {
    super(props);

    this.authentication = new Authentication();
  }

  componentWillMount() {
    const { state } = this.props.navigation;
    if (state.params && state.params.afterRegister) {
      this.setState({
        warningTranslationKey: 'register.you_will_receive_an_email',
        infoTranslationKey: 'register.confirmation_email_may_take_few_minutes',
      });
    }
  }

  openForgotPasswordUrl() {
    Linking.openURL(`${backendService.webUrl}password/reset?lang=${I18n.currentLocale()}`);
  }

  login() {
    if (this.state.loading) {
      return;
    }

    this.setState({ errorTranslationKey: '', loading: true });

    this.authentication
      .login(this.state.email, this.state.password)
      .then(() => {
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Search' })],
        });
        this.props.navigation.dispatch(resetAction);
      })
      .catch((error) => {
        this.setState({ loading: false });

        if (error.error === 'invalid_credentials') {
          this.setState({ errorTranslationKey: 'reg-profile.invalid_credentials' });
        } else {
          this.setState({ errorTranslationKey: 'error-page.an_error_happened' });
        }
      });
  }

  render() {
    return (
      <View style={styles.container}>
        {!!this.state.warningTranslationKey && (
          <Text style={styles.warning}>{I18n.t(this.state.warningTranslationKey)}</Text>
        )}

        {!!this.state.infoTranslationKey && (
          <Text style={styles.info}>{I18n.t(this.state.infoTranslationKey)}</Text>
        )}

        {!!this.state.errorTranslationKey && (
          <Text style={styles.error}>{I18n.t(this.state.errorTranslationKey)}</Text>
        )}

        <View style={styles.inputContainer}>
          <Icon name="user-o" size={30} style={styles.iconInput} />
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
            editable={!this.state.loading}
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="unlock-alt" size={30} style={styles.iconInput} />
          <TextInput
            value={this.state.password}
            placeholder={I18n.t('reg-profile.password')}
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
            returnKeyType="go"
            secureTextEntry
            onChangeText={password => this.setState({ password })}
            editable={!this.state.loading}
            style={styles.input}
            ref={(input) => {
              this.passwordInput = input;
            }}
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={
            this.state.loading
              ? [styles.loginButtonContainer, styles.disabledButton]
              : styles.loginButtonContainer
          }
          onPress={() => this.login()}
        >
          {this.state.loading === true && (
            <ActivityIndicator style={styles.buttonSpinner} color={COMMON_STYLES.BLACK} />
          )}

          <Text style={styles.loginButtonText}>{I18n.t('login.login_btn').toUpperCase()}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.forgotButtonContainer}
          onPress={this.openForgotPasswordUrl}
        >
          <Text style={styles.forgotButtonText}>{I18n.t('reg-profile.forgot_password')}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },

  error: {
    backgroundColor: COMMON_STYLES.RED,
    color: 'white',
    textAlign: 'center',
    padding: 10,
    fontSize: 14,
    marginBottom: 20,
  },
  warning: {
    backgroundColor: COMMON_STYLES.WARNING_BG,
    color: COMMON_STYLES.WARNING_TEXT,
    textAlign: 'center',
    padding: 10,
    fontSize: 14,
    marginBottom: 20,
  },
  info: {
    backgroundColor: 'transparent',
    color: 'white',
    textAlign: 'center',
    fontStyle: 'italic',
    padding: 3,
    paddingHorizontal: 10,
    fontSize: 14,
    marginBottom: 20,
  },

  inputContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 20,
  },
  iconInput: {
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

  loginButtonContainer: {
    backgroundColor: COMMON_STYLES.YELLOW,
    paddingVertical: 12,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    textAlign: 'center',
    color: COMMON_STYLES.BROWN,
  },
  forgotButtonContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    paddingVertical: 10,
    marginBottom: 20,
  },
  forgotButtonText: {
    textAlign: 'center',
    color: 'white',
  },
  disabledButton: {
    backgroundColor: COMMON_STYLES.GRAY,
  },

  buttonSpinner: {
    paddingRight: 10,
  },
});
