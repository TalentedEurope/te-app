import React from 'react';
import {
  AsyncStorage,
  KeyboardAvoidingView,
  ImageBackground,
  Image,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Communications from 'react-native-communications';
import I18n from '../../i18n/i18n';
import COMMON_STYLES from '../../styles/common';

export default class About extends React.Component {
  render() {
    return (
      <ImageBackground source={require('../../images/background.png')} style={styles.container}>
        <ScrollView style={styles.innerContainer}>
          <Text style={styles.title}>{I18n.t('landing.what_is_title')}</Text>
          <View style={styles.card}>
            <Text>{I18n.t('landing.what_is_text_1_txt')}</Text>
            <View style={styles.separator} />
            <Text>{I18n.t('landing.what_is_text_2_txt')}</Text>
          </View>

          <Text style={styles.title}>{I18n.t('global.footer_partners')}</Text>

          <View style={[styles.card, styles.logoCards, styles.darkCard]}>
            <Image
              resizeMode={'contain'}
              source={require('../../images/logo-footer-erasmus.png')}
              style={styles.logo}
            />
            <Image
              resizeMode={'contain'}
              source={require('../../images/logo-footer-cofunded-ue.png')}
              style={styles.logo}
            />
          </View>

          <View style={[styles.card, styles.logoCards]}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                Communications.web('http://cifpcesarmanrique.es/');
              }}
            >
              <Image
                resizeMode={'contain'}
                source={require('../../images/logo-cifpcesar.png')}
                style={styles.logo}
              />
            </TouchableOpacity>
            <View style={styles.separator} />

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                Communications.web('http://erasmusplus.iespuertodelacruz.es/');
              }}
            >
              <Image
                resizeMode={'contain'}
                source={require('../../images/logo-iespto.png')}
                style={styles.logo}
              />
            </TouchableOpacity>
            <View style={styles.separator} />

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                Communications.web('http://europeanprojects.org/');
              }}
            >
              <Image
                resizeMode={'contain'}
                source={require('../../images/logo-epa.png')}
                style={styles.logo}
              />
            </TouchableOpacity>
            <View style={styles.separator} />

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                Communications.web('http://web.tuke.sk/kj/english_version.htm');
              }}
            >
              <Image
                resizeMode={'contain'}
                source={require('../../images/logo-tuke.png')}
                style={styles.logo}
              />
            </TouchableOpacity>
            <View style={styles.separator} />

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                Communications.web('http://outofthebox-international.org/');
              }}
            >
              <Image
                resizeMode={'contain'}
                source={require('../../images/logo-oob.png')}
                style={styles.logo}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COMMON_STYLES.LIGHT_GRAY,
    justifyContent: 'center',
  },
  innerContainer: {
    paddingHorizontal: 20,
  },

  title: {
    textAlign: 'center',
    backgroundColor: 'transparent',
    fontSize: 24,
    fontWeight: '100',
    paddingVertical: 15,
  },

  logo: {
    width: '90%',
    height: 150,
  },

  separator: {
    height: 1,
    backgroundColor: COMMON_STYLES.LIGHT_GRAY,
    marginVertical: 20,
  },

  card: {
    backgroundColor: COMMON_STYLES.WHITE,
    borderColor: COMMON_STYLES.GRAY,
    borderWidth: StyleSheet.hairlineWidth,
    marginVertical: 10,
    padding: 10,
  },

  darkCard: {
    backgroundColor: COMMON_STYLES.DARK_BLUE,
  },

  logoCards: {
    paddingHorizontal: 25,
  },
});
