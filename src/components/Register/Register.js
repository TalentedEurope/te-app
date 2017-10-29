import React from 'react';
import { ImageBackground, Image, ScrollView, StyleSheet } from 'react-native';

import COMMON_STYLES from '../../styles/common';
import RegisterForm from './RegisterForm';

export default class Register extends React.Component {
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

          <RegisterForm navigation={this.props.navigation} />
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
});
