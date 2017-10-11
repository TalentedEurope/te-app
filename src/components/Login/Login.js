import React from 'react';
import { ImageBackground, Image, KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import LoginForm from './LoginForm';
import Authentication from '../../shared/authentication';
import COMMON_STYLES from '../../styles/common';

export default class Login extends React.Component {
  componentWillMount() {
    const { state } = this.props.navigation;
    if (state.params && state.params.logout) {
      const authentication = new Authentication();
      authentication.logout();
    }
  }

  render() {
    return (
      <ImageBackground source={require('../../images/background.png')} style={styles.container}>
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              resizeMode={'contain'}
              source={require('../../images/logo-white.png')}
            />
          </View>

          <LoginForm navigation={this.props.navigation} />
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COMMON_STYLES.DARK_BLUE,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    padding: 20,
    marginBottom: 40,
  },
  logo: {
    height: 96,
  },
});
