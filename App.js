import React from 'react';
import { AppRegistry, AsyncStorage, StatusBar, StyleSheet, View } from 'react-native';
import OneSignal from 'react-native-onesignal';
import { setCustomText, setCustomTextInput } from 'react-native-global-props';
import { Drawer } from './src/config/routes';
import userService from './src/shared/userService';
import I18n from './src/i18n/i18n';
import COMMON_STYLES from './src/styles/common';

class App extends React.Component {
  state = {
    loadingLocale: false,
  };

  componentWillMount() {
    AsyncStorage.getItem('locale', (error, result) => {
      I18n.locale = result || I18n.locale;
      this.setState({ loadingLocale: true });
    });

    userService.onStartApp();

    OneSignal.addEventListener('ids', this.onIds);
  }

  render() {
    if (!this.state.loadingLocale) return <View style={styles.darkContainer} />;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Drawer />
      </View>
    );
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onIds(device) {
    userService.setPushId(device.userId);
  }
}

const styles = StyleSheet.create({
  darkContainer: {
    flex: 1,
    backgroundColor: COMMON_STYLES.DARK_BLUE,
  },
  container: {
    flex: 1,
  },
});

// Get rid of ugly android lines
setCustomTextInput({
  underlineColorAndroid: 'rgba(0,0,0,0)',
});
setCustomText({
  style: {
    fontFamily: 'Titillium Web',
  },
});

AppRegistry.registerComponent('teApp', () => App);
