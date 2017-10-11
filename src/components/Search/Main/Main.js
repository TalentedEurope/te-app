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
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationActions } from 'react-navigation';
import { EventRegister } from 'react-native-event-listeners';
import I18n from '../../../i18n/i18n';
import COMMON_STYLES from '../../../styles/common';

export default class Main extends React.Component {
  state = {
    searchText: '',
    selectionIndex: 'students',
    selectedTypeText: {
      students: I18n.t('global.student_plural'),
      companies: I18n.t('global.company_plural'),
      institutions: I18n.t('global.institution_plural'),
    },
  };

  setType(newType) {
    this.setState({
      selectionIndex: newType,
    });
  }

  getTypeStyle(type) {
    if (this.state.selectionIndex === type) return styles.activeIconInput;
    return styles.iconInput;
  }

  changeLanguage(language) {
    I18n.locale = language;
    AsyncStorage.setItem('locale', language);

    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Search' })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  search() {
    const { selectionIndex } = this.state;
    const routeName = `Search${selectionIndex[0].toUpperCase()}${selectionIndex.substring(1)}`;

    EventRegister.emit(routeName, this.state.searchText);
    this.props.navigation.navigate(routeName);

    this.setState({ searchText: '' });
  }

  render() {
    return (
      <ImageBackground source={require('../../../images/background.png')} style={styles.container}>
        <Image
          style={styles.logo}
          resizeMode={'contain'}
          source={require('../../../images/logo-white.png')}
        />

        <View style={styles.languageBox}>
          <Text onPress={() => this.changeLanguage('en')} style={styles.languageButton}>
            EN
          </Text>
          <Text onPress={() => this.changeLanguage('es')} style={styles.languageButton}>
            ES
          </Text>
          <Text onPress={() => this.changeLanguage('it')} style={styles.languageButton}>
            IT
          </Text>
          <Text onPress={() => this.changeLanguage('de')} style={styles.languageButton}>
            DE
          </Text>
          <Text onPress={() => this.changeLanguage('fr')} style={styles.languageButton}>
            FR
          </Text>
          <Text onPress={() => this.changeLanguage('sk')} style={styles.languageButton}>
            SK
          </Text>
        </View>

        <KeyboardAvoidingView style={styles.searchBox}>
          <View style={styles.inputContainer}>
            <TextInput
              value={this.state.searchText}
              placeholder={I18n.t('landing.search_placeholder')}
              placeholderTextColor={COMMON_STYLES.GRAY}
              returnKeyType="go"
              onChangeText={searchText => this.setState({ searchText })}
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
            />
          </View>

          <Text style={styles.selectedTypeText}>
            {this.state.selectedTypeText[this.state.selectionIndex]}
          </Text>

          <View style={styles.typeIconContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={this.getTypeStyle('students')}
              onPress={() => this.setType('students')}
            >
              <Icon name="user-o" size={18} style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={this.getTypeStyle('companies')}
              onPress={() => this.setType('companies')}
            >
              <Icon name="building" size={18} style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={this.getTypeStyle('institutions')}
              onPress={() => this.setType('institutions')}
            >
              <Icon name="university" size={18} style={styles.icon} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.searchButtonContainer}
            onPress={() => this.search()}
          >
            <Text style={styles.searchButtonText}>
              {I18n.t('landing.search_btn').toUpperCase()}
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    height: 96,
    marginBottom: 10,
  },

  languageBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 10,
  },

  languageButton: {
    padding: 20,
    backgroundColor: 'transparent',
    color: COMMON_STYLES.WHITE,
  },

  searchBox: {
    margin: 20,
    marginTop: 0,
    padding: 15,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: COMMON_STYLES.WHITE,
  },

  inputContainer: {
    flexDirection: 'row',
    backgroundColor: COMMON_STYLES.LIGHT_GRAY,
  },

  input: {
    height: 40,
    color: COMMON_STYLES.BLACK,
    paddingHorizontal: 10,
    flex: 1,
  },

  typeIconContainer: {
    flexDirection: 'row',
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
    fontWeight: 'bold',
    marginTop: 10,
  },

  searchButtonContainer: {
    backgroundColor: COMMON_STYLES.YELLOW,
    paddingVertical: 12,
    width: '100%',
  },

  searchButtonText: {
    textAlign: 'center',
    color: COMMON_STYLES.BROWN,
  },

  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COMMON_STYLES.DARK_BLUE,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});
